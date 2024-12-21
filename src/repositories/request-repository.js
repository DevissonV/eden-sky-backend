import db from '../config/database.js';

class RequestRepository {
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

  async create(requestData) {
    return await db('requests').insert(requestData).returning('*');
  }

  async update(id, requestData) {
    return await db('requests').where({ id }).update(requestData).returning('*');
  }

  async delete(id) {
    return await db('requests').where({ id }).del();
  }
}

export default new RequestRepository();
