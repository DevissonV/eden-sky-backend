import employeeService from '../services/employee-service.js';
import { successResponse, errorResponse } from '../../../core/utils/response/response.js';

/**
 * Controller for managing employees.
 * @class EmployeeController
 */
class EmployeeController {
  /**
   * Retrieves all employees with optional filters.
   * @param {import("express").Request} req - Express request object.
   * @param {import("express").Response} res - Express response object.
   * @returns {Promise<void>} Response with the list of employees.
   */
  async getAll(req, res) {
    try {
      const { limit, page, name, minSalary, hireDate } = req.query;
      const filters = { name, minSalary, hireDate };
      const employees = await employeeService.getAllEmployees({
        limit: parseInt(limit, 10) || 10,
        page: parseInt(page, 10) || 1,
        filters,
      });
      return successResponse(res, employees, 200, true);
    } catch (error) {
      return errorResponse(res, error.message, 400);
    }
  }

  /**
   * Retrieves an employee by ID.
   * @param {import("express").Request} req - Express request object containing the employee ID.
   * @param {import("express").Response} res - Express response object.
   * @returns {Promise<void>} Response with employee data or an error if not found.
   */
  async getById(req, res) {
    try {
      const { id } = req.params;
      const employee = await employeeService.getEmployeeById(id);
      if (!employee) {
        return errorResponse(res, 'Employee not found', 404);
      }
      return successResponse(res, employee);
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  /**
   * Creates a new employee.
   * @param {import("express").Request} req - Express request object containing employee data in the body.
   * @param {import("express").Response} res - Express response object.
   * @returns {Promise<void>} Response with the created employee.
   */
  async create(req, res) {
    try {
      const newEmployee = await employeeService.createEmployee(req.body);
      return successResponse(res, newEmployee, 201);
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  /**
   * Updates an employee's data.
   * @param {import("express").Request} req - Express request object containing the employee ID and update data.
   * @param {import("express").Response} res - Express response object.
   * @returns {Promise<void>} Response with the updated employee data.
   */
  async update(req, res) {
    try {
      const { id } = req.params;
      const updatedEmployee = await employeeService.updateEmployee(id, req.body);
      return successResponse(res, updatedEmployee);
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  /**
   * Deletes an employee by ID.
   * @param {import("express").Request} req - Express request object containing the employee ID.
   * @param {import("express").Response} res - Express response object.
   * @returns {Promise<void>} Response indicating that the employee was successfully deleted.
   */
  async delete(req, res) {
    try {
      const { id } = req.params;
      await employeeService.deleteEmployee(id);
      return successResponse(res, { message: 'Employee deleted successfully' });
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }
}

export default new EmployeeController();
