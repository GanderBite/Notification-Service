import z from 'zod';

import { timeslotSchema } from '@/shared/schemas/timeslot';

export const dndWindowSchema = z.object({
  dayOfWeek: z.number().min(0).max(6),
  endTime: timeslotSchema,
  startTime: timeslotSchema,
});

export type DndWindow = z.infer<typeof dndWindowSchema>;
