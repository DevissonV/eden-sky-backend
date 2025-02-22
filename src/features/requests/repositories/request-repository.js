import db from '../../../core/config/database.js';

/**
 * Repository for managing request data in the database.
 * @class RequestRepository
 */
class RequestRepository {
  /** @private {string} */
  #tableName;

  constructor() {
    this.#tableName = 'requests';
  }

  /**
   * Retrieves all requests with filtering and pagination.
   * @param {GenericCriteria} criteria - Criteria object for query customization.
   * @returns {Promise<Object>} Paginated list of requests.
   */
  async getAll(criteria) {
    const baseQuery = db(this.#tableName).select('*');\

    criteria.applyFilters(baseQuery);

    const totalQuery = db(this.#tableName).clone();
    criteria.applyFilters(totalQuery);

    const totalResult = await totalQuery.count('* as count').first();
    const total = totalResult ? parseInt(totalResult.count, 10) : 0;

    criteria.applyPagination(baseQuery);

    const data = await baseQuery;

    return {
      data,
      total,
      page: criteria.getPagination().page,
      totalPages: Math.ceil(total / criteria.getPagination().limit),
    };
  }

  /**
   * Retrieves a request by ID.
   * @param {number} id - Request ID.
   * @returns {Promise<Object|null>} Request data or null if not found.
   */
  async getById(id) {
    return await db(this.#tableName).where({ id }).first();
  }

  /**
   * Creates a new request.
   * @param {Object} request - Request data.
   * @returns {Promise<Object>} Created request data.
   */
  async create(request) {
    return await db(this.#tableName).insert(request).returning('*');
  }

  /**
   * Updates an existing request.
   * @param {number} id - Request ID.
   * @param {Object} request - Updated request data.
   * @returns {Promise<Object>} Updated request data.
   */
  async update(id, request) {
    return await db(this.#tableName)
      .where({ id })
      .update(request)
      .returning('*');
  }

  /**
   * Deletes a request by ID.
   * @param {number} id - Request ID.
   * @returns {Promise<number>} Number of deleted rows.
   */
  async delete(id) {
    return await db(this.#tableName).where({ id }).del();
  }
}

export default new RequestRepository();
