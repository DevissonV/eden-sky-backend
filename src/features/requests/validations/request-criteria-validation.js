import Joi from 'joi';
import { AppError } from '#core/utils/response/error-handler.js';

/**
 * Schema definition for validating request search criteria.
 * @constant {Joi.ObjectSchema}
 */
const requestCriteriaSchema = Joi.object({
  code: Joi.string().max(50).optional(),
  description: Joi.string().max(255).optional(),
  summary: Joi.string().max(255).optional(),
  employee_id: Joi.number().integer().optional(),
  limit: Joi.number().integer().min(1).optional(),
  page: Joi.number().integer().min(1).optional(),
});

/**
 * Validates the request search criteria using the defined schema.
 *
 * @param {Object} criteria - The search criteria object containing query parameters.
 * @returns {Object} The validated and possibly transformed criteria.
 * @throws {AppError} Throws an AppError with a 400 status code if validation fails.
 */
export const validateRequestCriteria = (criteria) => {
  const { error, value } = requestCriteriaSchema.validate(criteria);
  if (error) {
    throw new AppError(error.details[0].message, 400);
  }
  return value;
};
