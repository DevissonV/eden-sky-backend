import db from '../config/database.js';

/**
 * Base repository class providing generic CRUD operations.
 * @class BaseRepository
 */
export default class BaseRepository {
  /**
   * @param {string} tableName - The name of the database table.
   */
  constructor(tableName) {
    /**
     * Database table name.
     * @type {string}
     * @private
     */
    this.#tableName = tableName;
  }

  /** @private */
  #tableName;

  /**
   * Retrieves all records with optional filtering and pagination.
   * @param {GenericCriteria} criteria - Criteria object for query customization.
   * @returns {Promise<Object>} Paginated list of records.
   */
  async getAll(criteria) {
    const query = db(this.#tableName);
    criteria.applyFilters(query);
    criteria.applyPagination(query);

    const countQuery = db(this.#tableName);
    criteria.applyFilters(countQuery);

    const totalResult = await countQuery.count('* as count').first();
    const total = totalResult ? parseInt(totalResult.count, 10) : 0;

    const data = await query;

    return {
      data,
      total,
      page: criteria.getPagination().page,
      totalPages: Math.ceil(total / criteria.getPagination().limit),
    };
  }

  /**
   * Retrieves a record by ID.
   * @param {number} id - Record ID.
   * @returns {Promise<Object|null>} Record data or null if not found.
   */
  async getById(id) {
    return await db(this.#tableName).where({ id }).first();
  }

  /**
   * Creates a new record.
   * @param {Object} data - Record data.
   * @returns {Promise<Object>} Created record.
   */
  async create(data) {
    return await db(this.#tableName).insert(data).returning('*');
  }

  /**
   * Updates an existing record by ID.
   * @param {number} id - Record ID.
   * @param {Object} data - Updated record data.
   * @returns {Promise<Object>} Updated record.
   */
  async update(id, data) {
    return await db(this.#tableName).where({ id }).update(data).returning('*');
  }

  /**
   * Deletes a record by ID.
   * @param {number} id - Record ID.
   * @returns {Promise<number>} Number of deleted rows.
   */
  async delete(id) {
    return await db(this.#tableName).where({ id }).del();
  }
}
