import { DndWindow } from '@/api/domain/entities/DndWindow';
import { Preference } from '@/api/domain/entities/Preference';
import { UserTimezone } from '@/api/domain/entities/UserTimezone';
import { Id } from '@/shared/entities/Id';
import dayjs from '@/shared/utils/dayjs';

import { PreferenceNotFoundError } from '../errors/PreferenceNotFoundError';
import { EventType } from './EventType';

export class UserPreference {
  constructor(
    private dndWindows: Array<DndWindow>,
    private preferences: Record<string, Preference>,
    private timezone: UserTimezone,
    private userId: Id,
  ) {}

  getDndWindows() {
    return this.dndWindows;
  }

  getPreference(eventType: EventType) {
    const pref = this.preferences[eventType.toString()];

    if (!pref) {
      throw new PreferenceNotFoundError(eventType);
    }
    return pref;
  }

  getTimezone() {
    return this.timezone;
  }

  getUserId(): Id {
    return this.userId;
  }

  isDNDActive(date: string) {
    if (!this.dndWindows.length) return false;

    const parsedDate = dayjs.utc(date).tz(this.timezone.toString());
    const baseDate = parsedDate.format('YYYY-MM-DD');

    const dayOfWeek = parsedDate.day();

    const windows = this.dndWindows.filter(
      (window) => window.dayOfWeek === dayOfWeek,
    );

    if (!windows.length) {
      return false;
    }

    for (const window of windows) {
      const { endTime, startTime } = window;
      const start = dayjs.tz(
        `${baseDate} ${startTime}`,
        this.timezone.toString(),
      );
      let end = dayjs.tz(`${baseDate} ${endTime}`, this.timezone.toString());

      if (end.isBefore(start)) {
        end = end.add(1, 'day');
      }

      if (
        parsedDate.isAfter(start, 'minute') &&
        parsedDate.isBefore(end, 'minute')
      ) {
        return true;
      }
    }

    return false;
  }
}
