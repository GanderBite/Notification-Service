import z from 'zod';

export const timeslotRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const timeslotSchema = z.string().regex(timeslotRegex, {
  message: 'Time must be in in HH:mm format',
});
