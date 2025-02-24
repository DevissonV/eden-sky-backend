/**
 * Transforms the validated employee data into a DTO for creation.
 * @param {Object} data - The validated employee data.
 * @returns {Object} The DTO for creating an employee.
 */
export const createEmployeeDto = (data) => ({
  name: data.name,
  hire_date: data.hire_date,
  salary: data.salary,
});

/**
 * Transforms the validated employee data into a DTO for updating.
 * @param {Object} data - The validated employee data.
 * @returns {Object} The DTO for updating an employee.
 */
export const updateEmployeeDto = (data) => ({
  name: data.name,
  hire_date: data.hire_date,
  salary: data.salary,
});

/**
 * Transforms the validated search criteria into a DTO for filtering employees.
 * @param {Object} params - The validated query parameters.
 * @returns {Object} The DTO with standardized search criteria.
 */
export const searchEmployeeDto = (params) => ({
  name: params.name,
  minSalary: params.minSalary,
  hireDate: params.hireDate,
  limit: params.limit,
  page: params.page,
});
