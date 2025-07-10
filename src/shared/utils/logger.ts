import pino from 'pino';
import pinoHttp from 'pino-http';

export const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

export const httpLogger = pinoHttp({
  transport: {
    target: 'pino-pretty',
  },
});
