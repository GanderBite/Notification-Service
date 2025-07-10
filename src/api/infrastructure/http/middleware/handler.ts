import { NextFunction, Request, RequestHandler, Response } from 'express';

/**
 * Wraps an async Express route handler to catch errors
 * and pass them to the next error handling middleware.
 *
 * @param callback - Async route handler function (req, res, next) => Promise
 * @returns A new route handler that catches errors from fn and calls next(err)
 */
export function handler(callback: RequestHandler): RequestHandler {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await callback(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}
