import dayjs from 'dayjs';

import { DenyNotificationDto } from '@/api/application/dtos/DenyNotificationDto';
import { NotifyUserDto } from '@/api/application/dtos/NotifyUserDto';
import { SendNotificationDto } from '@/api/application/dtos/SendNotificationDto';
import { notifyUserUseCase } from '@/api/application/use-cases/notifyUserUseCase';
import { DndWindow } from '@/api/domain/entities/DndWindow';
import { Event } from '@/api/domain/entities/Event';
import { EventType } from '@/api/domain/entities/EventType';
import { NotificationChannels } from '@/api/domain/entities/NotificationChannels';
import { NotificationDenyReasons } from '@/api/domain/entities/NotificationDenyReasons';
import { Preference } from '@/api/domain/entities/Preference';
import { UserPreference } from '@/api/domain/entities/UserPreference';
import { UserTimezone } from '@/api/domain/entities/UserTimezone';
import { Id } from '@/shared/entities/Id';

import { InMemoryEventsQuery } from '../../infrastructure/adapters/InMemoryEventsQuery';
import { InMemoryUserPreferencesQuery } from '../../infrastructure/adapters/InMemoryUserPreferencesQuery';

describe('notifyUserUseCase - Integration', () => {
  const userId = Id.generate();
  const eventId = Id.generate();
  const eventType = new EventType('items_shipped');
  const payload = { orderId: '12345' };
  const timestamp = dayjs().toISOString();
  const dto = new NotifyUserDto({ eventId: eventId.toString() });

  const makeEvent = () =>
    new Event(eventId, eventType, payload, timestamp, userId);

  const makeUserPreference = (
    overrides: Partial<Preference> = {},
    dnd = false,
  ) => {
    const pref: Preference = {
      channels: [NotificationChannels.EMAIL],
      enabled: true,
    };

    Object.assign(pref, overrides);

    const timezone = new UserTimezone('Europe/Warsaw');

    const dndWindow: DndWindow[] = [
      {
        dayOfWeek: 5,
        endTime: '08:00',
        startTime: '22:00',
      },
    ];

    const userPref = new UserPreference(
      dndWindow,
      { items_shipped: pref },
      timezone,
      userId,
    );

    jest.spyOn(userPref, 'isDNDActive').mockReturnValue(dnd);

    return userPref;
  };

  it('should send notification if everything is valid', async () => {
    const eventsQuery = new InMemoryEventsQuery([makeEvent()]);
    const userPrefs = new InMemoryUserPreferencesQuery([makeUserPreference()]);

    const result = await notifyUserUseCase(eventsQuery, userPrefs)(dto);

    expect(result).toBeInstanceOf(SendNotificationDto);
  });

  it('should deny if no channels', async () => {
    const userPref = makeUserPreference({ channels: [] });
    const eventsQuery = new InMemoryEventsQuery([makeEvent()]);
    const userPrefs = new InMemoryUserPreferencesQuery([userPref]);

    const result = await notifyUserUseCase(eventsQuery, userPrefs)(dto);

    expect(result).toBeInstanceOf(DenyNotificationDto);
    expect((result as unknown as DenyNotificationDto).getReason()).toBe(
      NotificationDenyReasons.NO_CHANNELS,
    );
  });

  it('should deny if disabled', async () => {
    const userPref = makeUserPreference({ enabled: false });
    const eventsQuery = new InMemoryEventsQuery([makeEvent()]);
    const userPrefs = new InMemoryUserPreferencesQuery([userPref]);

    const result = await notifyUserUseCase(eventsQuery, userPrefs)(dto);

    expect(result).toBeInstanceOf(DenyNotificationDto);
    expect((result as unknown as DenyNotificationDto).getReason()).toBe(
      NotificationDenyReasons.NOTIFICATION_DISABLED,
    );
  });

  it('should deny if DND is active', async () => {
    const userPref = makeUserPreference({}, true);
    const eventsQuery = new InMemoryEventsQuery([makeEvent()]);
    const userPrefs = new InMemoryUserPreferencesQuery([userPref]);

    const result = await notifyUserUseCase(eventsQuery, userPrefs)(dto);

    expect(result).toBeInstanceOf(DenyNotificationDto);
    expect((result as unknown as DenyNotificationDto).getReason()).toBe(
      NotificationDenyReasons.DND_ACTIVE,
    );
  });

  it('should deny if preference is missing for event type', async () => {
    const userPref = new UserPreference(
      [],
      {},
      new UserTimezone('Europe/Warsaw'),
      userId,
    );
    const eventsQuery = new InMemoryEventsQuery([makeEvent()]);
    const userPrefs = new InMemoryUserPreferencesQuery([userPref]);

    const result = await notifyUserUseCase(eventsQuery, userPrefs)(dto);

    expect(result).toBeInstanceOf(DenyNotificationDto);
    expect((result as unknown as DenyNotificationDto).getReason()).toBe(
      NotificationDenyReasons.NO_CHANNELS,
    );
  });
});
