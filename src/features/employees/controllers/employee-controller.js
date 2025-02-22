import employeeService from '../services/employee-service.js';
import { responseHandler } from '../../../core/utils/response/response-handler.js';
import { getSuccessMessage } from '../../../core/utils/response/api-response-templates.js';

/**
 * Controller for managing employees.
 * @class EmployeeController
 */
class EmployeeController {
  /**
   * Retrieves all employees.
   * @param {import("express").Request} req - Express request object.
   * @param {import("express").Response} res - Express response object.
   * @param {import("express").NextFunction} next - Express next middleware function.
   */
  async getAll(req, res, next) {
    employeeService
      .getAll(req.query)
      .then((employees) =>
        responseHandler.success(
          res,
          employees,
          getSuccessMessage('GET_ALL', 'Employees'),
        ),
      )
      .catch(next);
  }

  /**
   * Retrieves an employee by ID.
   * @param {import("express").Request} req - Express request object containing the employee ID.
   * @param {import("express").Response} res - Express response object.
   * @param {import("express").NextFunction} next - Express next middleware function.
   */
  async getById(req, res, next) {
    employeeService
      .getById(req.params.id)
      .then((employee) =>
        responseHandler.success(
          res,
          employee,
          getSuccessMessage('GET_ONE', 'Employee'),
        ),
      )
      .catch(next);
  }

  /**
   * Creates a new employee.
   * @param {import("express").Request} req - Express request object containing employee data in the body.
   * @param {import("express").Response} res - Express response object.
   * @param {import("express").NextFunction} next - Express next middleware function.
   */
  async create(req, res, next) {
    employeeService
      .create(req.body)
      .then((newEmployee) =>
        responseHandler.success(
          res,
          newEmployee,
          getSuccessMessage('CREATE', 'Employee'),
          201,
        ),
      )
      .catch(next);
  }

  /**
   * Updates an employee's data.
   * @param {import("express").Request} req - Express request object containing the employee ID and update data.
   * @param {import("express").Response} res - Express response object.
   * @param {import("express").NextFunction} next - Express next middleware function.
   */
  async update(req, res, next) {
    employeeService
      .update(req.params.id, req.body)
      .then((updatedEmployee) =>
        responseHandler.success(
          res,
          updatedEmployee,
          getSuccessMessage('UPDATE', 'Employee'),
        ),
      )
      .catch(next);
  }

  /**
   * Deletes an employee by ID.
   * @param {import("express").Request} req - Express request object containing the employee ID.
   * @param {import("express").Response} res - Express response object.
   * @param {import("express").NextFunction} next - Express next middleware function.
   */
  async delete(req, res, next) {
    employeeService
      .delete(req.params.id)
      .then(() =>
        responseHandler.success(
          res,
          {},
          getSuccessMessage('DELETE', 'Employee'),
        ),
      )
      .catch(next);
  }
}

export default new EmployeeController();
