import z from 'zod';

import { NotificationChannels } from './NotificationChannels';

export const preferenceSchema = z.object({
  channels: z.array(
    z.enum([
      NotificationChannels.EMAIL,
      NotificationChannels.IN_APP,
      NotificationChannels.PUSH,
    ]),
  ),
  enabled: z.boolean(),
});

export type Preference = z.infer<typeof preferenceSchema>;
