import knex from 'knex';
import knexConfig from '../../knexfile.js';
import { envs } from './envs.js';

const db = knex(knexConfig[envs.NODE_ENV || 'development']);

export default db;
