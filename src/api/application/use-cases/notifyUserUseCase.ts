import dayjs from 'dayjs';

import { NotificationDenyReasons } from '@/api/domain/entities/NotificationDenyReasons';
import { Preference } from '@/api/domain/entities/Preference';

import { DenyNotificationDto } from '../dtos/DenyNotificationDto';
import { NotifyUserDto } from '../dtos/NotifyUserDto';
import { SendNotificationDto } from '../dtos/SendNotificationDto';
import { IEventQuery } from '../ports/IEventQuery';
import { IUserPreferencesQuery } from '../ports/IUserPreferencesQuery';

export function notifyUserUseCase(
  eventsQuery: IEventQuery,
  userPreferencesQuery: IUserPreferencesQuery,
) {
  return async (
    dto: NotifyUserDto,
  ): Promise<DenyNotificationDto | SendNotificationDto> => {
    const event = await eventsQuery.findById(dto.getEventId());
    const userPreference = await userPreferencesQuery.findById(
      event.getUserId(),
    );

    let preference: Preference;

    try {
      preference = userPreference.getPreference(event.getEventType());
    } catch {
      return new DenyNotificationDto(
        NotificationDenyReasons.NO_CHANNELS,
        dto.getEventId(),
        event.getUserId(),
      );
    }

    if (!preference.channels.length) {
      return new DenyNotificationDto(
        NotificationDenyReasons.NO_CHANNELS,
        dto.getEventId(),
        event.getUserId(),
      );
    }

    if (!preference.enabled) {
      return new DenyNotificationDto(
        NotificationDenyReasons.NOTIFICATION_DISABLED,
        dto.getEventId(),
        event.getUserId(),
      );
    }

    if (userPreference.isDNDActive(dayjs().toISOString())) {
      return new DenyNotificationDto(
        NotificationDenyReasons.DND_ACTIVE,
        dto.getEventId(),
        event.getUserId(),
      );
    }

    return new SendNotificationDto(
      preference.channels,
      event.getEventId(),
      event.getUserId(),
    );
  };
}
