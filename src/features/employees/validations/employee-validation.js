import Joi from 'joi';
import { AppError } from '#core/utils/response/error-handler.js';

/**
 * Schema definition for employee validation.
 * @constant {Joi.ObjectSchema}
 */
const employeeSchema = Joi.object({
  name: Joi.string().max(50).required(),
  hire_date: Joi.date().required(),
  salary: Joi.number().precision(2).required(),
});

/**
 * Validates employee data against the schema.
 * @param {Object} employeeData - Employee data to be validated.
 * @throws {AppError} If validation fails.
 */
export const validateEmployee = (employeeData) => {
  const { error } = employeeSchema.validate(employeeData);
  if (error) {
    throw new AppError(error.details[0].message, 400);
  }
  return employeeData;
};
