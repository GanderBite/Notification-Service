import z from 'zod';

export const eventPayloadSchema = z.record(z.string(), z.unknown());

export type EventPayload = z.infer<typeof eventPayloadSchema>;
