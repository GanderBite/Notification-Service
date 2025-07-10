import { NextFunction, Request, Response } from 'express';

import { sendError } from '@/shared/entities/ErrorResponse';
import { ApiError } from '@/shared/errors/ApiError';

/**
 * Express error-handling middleware.
 * Catches all errors passed down the middleware chain.
 */
export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof ApiError) {
    sendError(res, err.name, err.statusCode, err.details ?? err.message);
  } else {
    sendError(res);
  }
}
