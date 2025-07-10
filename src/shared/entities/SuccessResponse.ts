import { Response } from 'express';

export interface SuccessResponse<T> {
  data: T;
  success: true;
}

export function sendSuccess<T>(
  res: Response,
  data: T,
  status = 200,
): Response<SuccessResponse<T>> {
  return res.status(status).json({ data, success: true });
}
