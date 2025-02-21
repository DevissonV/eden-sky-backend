import db from '../../../core/config/database.js';

/**
 * Repository for managing employee data in the database.
 * @class EmployeeRepository
 */
class EmployeeRepository {
  /**
   * Retrieves all employees with optional filters.
   * @param {Object} options - Query options.
   * @param {number} [options.limit=10] - Number of records per page.
   * @param {number} [options.page=1] - Page number.
   * @param {Object} [options.filters={}] - Filters for querying employees.
   * @returns {Promise<Object>} Paginated list of employees.
   */
  async getAll({ limit = 10, page = 1, filters = {} }) {
    const offset = (page - 1) * limit;
    const query = db('employees').limit(limit).offset(offset);

    if (filters.name) {
      query.where('name', 'like', `%${filters.name}%`);
    }

    if (filters.minSalary) {
      query.where('salary', '>=', filters.minSalary);
    }

    if (filters.hireDate) {
      query.where('hire_date', '=', filters.hireDate);
    }

    const total = await db('employees').count('* as count').first();
    const data = await query;

    return {
      data,
      total: total.count,
      page,
      totalPages: Math.ceil(total.count / limit),
    };
  }

  /**
   * Retrieves an employee by ID.
   * @param {number} id - Employee ID.
   * @returns {Promise<Object|null>} Employee data or null if not found.
   */
  async getById(id) {
    return await db('employees').where({ id }).first();
  }

  /**
   * Creates a new employee.
   * @param {Object} employee - Employee data.
   * @returns {Promise<Object>} Created employee data.
   */
  async create(employee) {
    return await db('employees').insert(employee).returning('*');
  }

  /**
   * Updates an existing employee.
   * @param {number} id - Employee ID.
   * @param {Object} employee - Updated employee data.
   * @returns {Promise<Object>} Updated employee data.
   */
  async update(id, employee) {
    return await db('employees').where({ id }).update(employee).returning('*');
  }

  /**
   * Deletes an employee by ID.
   * @param {number} id - Employee ID.
   * @returns {Promise<number>} Number of deleted rows.
   */
  async delete(id) {
    return await db('employees').where({ id }).del();
  }
}

export default new EmployeeRepository();
