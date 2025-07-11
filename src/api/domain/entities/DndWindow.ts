import z from 'zod';

import { timeslotSchema } from '@/shared/schemas/timeslot';

export const dndWindowSchema = z
  .object({
    dayOfWeek: z.number().min(0).max(6),
    endTime: timeslotSchema,
    startTime: timeslotSchema,
  })
  .refine(({ endTime, startTime }) => startTime !== endTime, {
    message: 'startTime and endTime must be different',
    path: ['endTime'],
  });

export type DndWindow = z.infer<typeof dndWindowSchema>;
