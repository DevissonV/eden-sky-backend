import Joi from 'joi';
import { AppError } from '#core/utils/response/error-handler.js';

/**
 * Schema definition for validating employee search criteria.
 * @constant {Joi.ObjectSchema}
 */
const employeeCriteriaSchema = Joi.object({
  name: Joi.string().max(50).optional(),
  minSalary: Joi.number().precision(2).optional(),
  hireDate: Joi.date().optional(),
  limit: Joi.number().integer().min(1).optional(),
  page: Joi.number().integer().min(1).optional(),
});

/**
 * Validates the employee search criteria using the defined schema.
 * @param {Object} criteria - The search criteria object containing query parameters.
 * @returns {Object} The validated and possibly transformed criteria.
 * @throws {AppError} Throws an AppError with a 400 status code if validation fails.
 */
export const validateEmployeeCriteria = (criteria) => {
  const { error, value } = employeeCriteriaSchema.validate(criteria);
  if (error) {
    throw new AppError(error.details[0].message, 400);
  }
  return value;
};
