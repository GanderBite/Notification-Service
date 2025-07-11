import { DndWindow } from '@/api/domain/entities/DndWindow';
import { EventType } from '@/api/domain/entities/EventType';
import { NotificationChannels } from '@/api/domain/entities/NotificationChannels';
import { Preference } from '@/api/domain/entities/Preference';
import { UserPreference } from '@/api/domain/entities/UserPreference';
import { UserTimezone } from '@/api/domain/entities/UserTimezone';
import { PreferenceNotFoundError } from '@/api/domain/errors/PreferenceNotFoundError';
import { Id } from '@/shared/entities/Id';

describe('UserPreference', () => {
  const userId = Id.generate();
  const timezone = new UserTimezone('Europe/Warsaw');

  const prefMap: Record<string, Preference> = {
    other_event: { channels: [NotificationChannels.EMAIL], enabled: true },
    some_event: { channels: [NotificationChannels.EMAIL], enabled: true },
  };

  const dndWindows: DndWindow[] = [
    { dayOfWeek: 4, endTime: '06:00', startTime: '22:00' },
    { dayOfWeek: 4, endTime: '12:00', startTime: '10:00' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getPreference', () => {
    it('returns existing preference', () => {
      const userPref = new UserPreference(
        dndWindows,
        prefMap,
        timezone,
        userId,
      );

      expect(userPref.getPreference(new EventType('some_event'))).toBe(
        prefMap['some_event'],
      );
    });

    it('throws PreferenceNotFoundError for missing preference', () => {
      const userPref = new UserPreference(
        dndWindows,
        prefMap,
        timezone,
        userId,
      );
      const eventType = new EventType('does_not_exist');
      expect(() => userPref.getPreference(eventType)).toThrow(
        PreferenceNotFoundError,
      );
    });
  });

  describe('isDNDActive', () => {
    it('returns false if no dndWindows', () => {
      const userPref = new UserPreference([], prefMap, timezone, userId);
      expect(userPref.isDNDActive('2025-07-10T22:15:00Z')).toBe(false);
    });

    it('returns false if no windows match day of week', () => {
      // The date is a Wednesday (day 3), but dndWindows only for day 4,5
      const userPref = new UserPreference(
        dndWindows,
        prefMap,
        timezone,
        userId,
      );
      // Choose date for Wednesday
      const date = '2025-07-09T23:00:00Z'; // Wednesday UTC
      expect(userPref.isDNDActive(date)).toBe(false);
    });

    it('returns true if parsedDate is within dnd window (overnight)', () => {
      // date corresponds to Thursday 23:00 Warsaw (UTC+2 = 21:00 UTC)
      const userPref = new UserPreference(
        dndWindows,
        prefMap,
        timezone,
        userId,
      );
      const date = '2025-07-10T21:30:00Z'; // Thursday 23:30 Warsaw time
      expect(userPref.isDNDActive(date)).toBe(true);
    });

    it('returns false if parsedDate is outside dnd window', () => {
      const userPref = new UserPreference(
        dndWindows,
        prefMap,
        timezone,
        userId,
      );
      // Friday at 09:00 Warsaw time, before 10:00 start
      const date = '2025-07-10T07:00:00Z'; // Friday 09:00 Warsaw (UTC+2)
      expect(userPref.isDNDActive(date)).toBe(false);
    });

    it('returns true if parsedDate is within daytime dnd window', () => {
      const userPref = new UserPreference(
        dndWindows,
        prefMap,
        timezone,
        userId,
      );
      const date = '2025-07-10T08:30:00Z';
      expect(userPref.isDNDActive(date)).toBe(true);
    });
  });
});
