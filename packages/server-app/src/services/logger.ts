import * as winston from 'winston';
import { join } from 'path';

export function createLogger(): winston.Logger {
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
      winston.format.errors({ stack: true }),
    ),
    defaultMeta: { service: 'report-server' },
    transports: [
      new winston.transports.File({
        filename: join('logs', 'error.log'),
        level: 'error',
      }),
      new winston.transports.File({
        filename: join('logs', 'combined.log'),
      }),
    ],
  });

  if (process.env.NODE_ENV !== 'production') {
    logger.add(
      new winston.transports.Console({
        format: winston.format.simple(),
      }),
    );
  }
  return logger;
}
