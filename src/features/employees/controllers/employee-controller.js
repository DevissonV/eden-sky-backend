import BaseController from '#core/base/base-controller.js';
import employeeService from '../services/employee-service.js';

/**
 * Controller for managing employees.
 * @class EmployeeController
 * @extends BaseController
 */
class EmployeeController extends BaseController {
  constructor() {
    super(employeeService, 'Employee');
  }
}

export default new EmployeeController();
