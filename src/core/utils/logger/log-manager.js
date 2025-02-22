import fs from 'fs';
import path from 'path';
import cron from 'node-cron';
import { envs } from '../../config/envs.js';
import { rotateLogFile, getLogger } from './logger.js';

/**
 * Deletes all log files except the most recent one.
 */
const deleteOldLogs = () => {
  const logsDir = path.join(process.cwd(), 'logs');
  if (!fs.existsSync(logsDir)) return;

  const files = fs.readdirSync(logsDir);
  const fileInfoArray = files.map(file => {
    const filePath = path.join(logsDir, file);
    const stats = fs.statSync(filePath);
    return { file, filePath, mtimeMs: stats.mtimeMs };
  });

  fileInfoArray.sort((a, b) => b.mtimeMs - a.mtimeMs);

  for (let i = 1; i < fileInfoArray.length; i++) {
    fs.unlinkSync(fileInfoArray[i].filePath);
    getLogger().info(`Deleted old log file: ${fileInfoArray[i].file}`);
  }
};

/**
 * Schedules log management (deletion of old logs and log rotation)
 * using a cron job. Defaults to every Sunday at midnight, unless
 * overridden by the LOG_CLEANUP_SCHEDULE environment variable.
 */
const scheduleLogManagement = () => {
  const cronSchedule = envs.LOG_CLEANUP_SCHEDULE || '0 0 * * 0';

  cron.schedule(cronSchedule, () => {
    try {
      getLogger().info('Running scheduled log management...');
      deleteOldLogs();
      rotateLogFile().info('INFO: rotation completed. New log file active.');
    } catch (error) {
      getLogger().error('Error in log management:', error);
    }
  });
};

export { deleteOldLogs, scheduleLogManagement };
