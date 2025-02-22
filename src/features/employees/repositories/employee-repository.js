import db from "../../../core/config/database.js";

/**
 * Repository for managing employee data in the database.
 * @class EmployeeRepository
 */
class EmployeeRepository {
  /** @private {string} */
  #tableName;

  constructor() {
    this.#tableName = "employees";
  }

  /**
   * Retrieves all employees with filtering and pagination.
   * @param {GenericCriteria} criteria - Criteria object for query customization.
   * @returns {Promise<Object>} Paginated list of employees.
   */
  async getAll(criteria) {
    const query = db(this.#tableName);
    
    criteria.applyFilters(query);
    criteria.applyPagination(query);

    const countQuery = db(this.#tableName);
    criteria.applyFilters(countQuery);
    
    const totalResult = await countQuery.count("* as count").first();
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
   * Retrieves an employee by ID.
   * @param {number} id - Employee ID.
   * @returns {Promise<Object|null>} Employee data or null if not found.
   */
  async getById(id) {
    return await db(this.#tableName).where({ id }).first();
  }

  /**
   * Creates a new employee.
   * @param {Object} employee - Employee data.
   * @returns {Promise<Object>} Created employee data.
   */
  async create(employee) {
    return await db(this.#tableName).insert(employee).returning("*");
  }

  /**
   * Updates an existing employee.
   * @param {number} id - Employee ID.
   * @param {Object} employee - Updated employee data.
   * @returns {Promise<Object>} Updated employee data.
   */
  async update(id, employee) {
    return await db(this.#tableName).where({ id }).update(employee).returning("*");
  }

  /**
   * Deletes an employee by ID.
   * @param {number} id - Employee ID.
   * @returns {Promise<number>} Number of deleted rows.
   */
  async delete(id) {
    return await db(this.#tableName).where({ id }).del();
  }
}

export default new EmployeeRepository();
