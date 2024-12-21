import employeeService from '../services/employee-service.js';
import { successResponse, errorResponse } from '../utils/response/response.js';

class EmployeeController {
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

  async create(req, res) {
    try {
      const newEmployee = await employeeService.createEmployee(req.body);
      return successResponse(res, newEmployee, 201);
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const updatedEmployee = await employeeService.updateEmployee(id, req.body);
      return successResponse(res, updatedEmployee);
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

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
