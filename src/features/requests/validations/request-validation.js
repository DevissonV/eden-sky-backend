import Joi from 'joi';

/**
 * Schema definition for request validation.
 * @constant {Joi.ObjectSchema}
 */
const requestSchema = Joi.object({
  code: Joi.string().max(50).required(),
  description: Joi.string().max(255).required(),
  summary: Joi.string().max(255).required(),
  employee_id: Joi.number().integer().required(),
});

/**
 * Validates request data against the schema.
 * @param {Object} requestData - Request data to be validated.
 * @throws {Error} If validation fails.
 */
export const validateRequest = (requestData) => {
  const { error } = requestSchema.validate(requestData);
  if (error) {
    throw new Error(error.details[0].message);
  }
};
