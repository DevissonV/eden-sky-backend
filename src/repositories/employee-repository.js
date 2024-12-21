import db from '../config/database.js';

class EmployeeRepository {
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

  async getById(id) {
    return await db('employees').where({ id }).first();
  }

  async create(employee) {
    return await db('employees').insert(employee).returning('*');
  }

  async update(id, employee) {
    return await db('employees').where({ id }).update(employee).returning('*');
  }

  async delete(id) {
    return await db('employees').where({ id }).del();
  }
}

export default new EmployeeRepository();
