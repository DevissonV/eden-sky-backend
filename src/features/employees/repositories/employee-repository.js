import BaseRepository from '../../../core/base/base-repository.js';

/**
 * Repository for managing employee data.
 * @class EmployeeRepository
 * @extends BaseRepository
 */
class EmployeeRepository extends BaseRepository {
  constructor() {
    super('employees');
  }
}

export default new EmployeeRepository();
