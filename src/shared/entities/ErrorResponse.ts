import { Response } from 'express';

export interface ErrorResponse<TDetails> {
  code: string;
  details?: TDetails;
  message?: string;
  success: false;
}

export function sendError<TDetails>(
  res: Response,
  code = 'InternalError',
  status = 400,
  details?: TDetails,
  message?: string,
): Response<ErrorResponse<TDetails>> {
  return res.status(status).json({ code, details, message, success: false });
}
