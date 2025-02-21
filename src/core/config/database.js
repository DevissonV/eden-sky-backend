import knex from 'knex';
import knexConfig from '../../../knexfile.js';
import { envs } from './envs.js';

/**
 * Database connection instance using Knex.
 * @constant {import("knex")} db
 */
const db = knex(knexConfig[envs.NODE_ENV || 'development']);

export default db;
