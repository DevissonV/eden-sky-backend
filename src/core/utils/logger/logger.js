import fs from 'fs';
import path from 'path';
import { format } from 'date-fns';
import pino from 'pino';

const logsDir = path.join(process.cwd(), 'logs');

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

let loggerInstance = null;

/**
 * Generates the log file path based on the current date and time.
 *
 * @returns {string} Full path of the log file.
 */
const generateLogFilePath = () => {
  const timestamp = format(new Date(), 'yyyy-MM-dd_HH-mm');
  return path.join(logsDir, `app-${timestamp}.log`);
};

/**
 * Creates a new logger instance using multiple transports:
 * - pino-pretty for console output
 * - pino/file for writing logs to a file
 * @returns {Object} Logger instance.
 */
 const createLogger = () => {
    const logFilePath = generateLogFilePath();
  
    return pino({
      level: 'info',
      transport: {
        targets: [
          {
            level: 'info',
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'yyyy-MM-dd HH:mm:ss',
              ignore: 'pid,hostname'
            }
          },
          {
            level: 'info',
            target: 'pino/file',
            options: {
              destination: logFilePath,
              mkdir: true
            }
          }
        ]
      }
    });
  };

/**
 * Returns the current logger instance.
 *
 * @returns {Object} Logger instance.
 */
export const getLogger = () => {
  if (!loggerInstance) {
    loggerInstance = createLogger();
  }
  return loggerInstance;
};

/**
 * Rotates the current log file by creating a new logger instance
 * with a fresh log file path.
 *
 * @returns {Object} New logger instance.
 */
export const rotateLogFile = () => {
  loggerInstance = createLogger();
  return loggerInstance;
};
