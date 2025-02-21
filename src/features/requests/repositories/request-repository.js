import db from '../../../core/config/database.js';

/**
 * Repository for managing request data in the database.
 * @class RequestRepository
 */
class RequestRepository {
  /**
   * Retrieves all requests with optional filters and pagination.
   * @param {Object} options - Query options.
   * @param {number} options.limit - Number of records per page.
   * @param {number} options.offset - Offset for pagination.
   * @param {Object} options.filters - Filters for querying requests.
   * @returns {Promise<Object>} Paginated list of requests and total count.
   */
  async getAll({ limit, offset, filters }) {
    const query = db('requests').select(
      'requests.id',
      'requests.code',
      'requests.description',
      'requests.summary',
      'requests.employee_id',
      'requests.created_at',
      'requests.updated_at',
      'employees.name as employee_name'
    )
    .leftJoin('employees', 'requests.employee_id', 'employees.id');
  
    if (filters?.code) {
      query.where('requests.code', 'like', `%${filters.code}%`);
    }
  
    if (filters?.description) {
      query.where('requests.description', 'like', `%${filters.description}%`);
    }
  
    if (filters?.summary) {
      query.where('requests.summary', 'like', `%${filters.summary}%`);
    }
  
    if (filters?.employee_id) {
      query.where('requests.employee_id', filters.employee_id);
    }
  
    query.limit(limit).offset(offset);
  
    const data = await query;
  
    const totalQuery = db('requests').count('* as count');
    if (filters?.code) {
      totalQuery.where('requests.code', 'like', `%${filters.code}%`);
    }
    if (filters?.description) {
      totalQuery.where('requests.description', 'like', `%${filters.description}%`);
    }
    if (filters?.summary) {
      totalQuery.where('requests.summary', 'like', `%${filters.summary}%`);
    }
    if (filters?.employee_id) {
      totalQuery.where('requests.employee_id', filters.employee_id);
    }
  
    const totalResult = await totalQuery.first();
  
    return {
      data,
      total: parseInt(totalResult.count, 10),
    };
  }

  /**
   * Retrieves a request by ID.
   * @param {number} id - Request ID.
   * @returns {Promise<Object|null>} Request data or null if not found.
   */
  async getById(id) {
    return await db('requests')
      .select(
        'requests.id',
        'requests.code',
        'requests.description',
        'requests.summary',
        'requests.employee_id',
        'requests.created_at',
        'requests.updated_at',
        'employees.name as employee_name'
      )
      .leftJoin('employees', 'requests.employee_id', 'employees.id')
      .where('requests.id', id)
      .first();
  }

  /**
   * Creates a new request.
   * @param {Object} requestData - Request data to be inserted.
   * @returns {Promise<Object>} The created request data.
   */
  async create(requestData) {
    return await db('requests').insert(requestData).returning('*');
  }

  /**
   * Updates an existing request.
   * @param {number} id - Request ID.
   * @param {Object} requestData - Updated request data.
   * @returns {Promise<Object>} Updated request data.
   */
  async update(id, requestData) {
    return await db('requests').where({ id }).update(requestData).returning('*');
  }

  /**
   * Deletes a request by ID.
   * @param {number} id - Request ID.
   * @returns {Promise<number>} Number of deleted rows.
   */
  async delete(id) {
    return await db('requests').where({ id }).del();
  }
}

export default new RequestRepository();