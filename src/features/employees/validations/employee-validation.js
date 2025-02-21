import Joi from 'joi';

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
 * @throws {Error} If validation fails.
 */
export const validateEmployee = (employeeData) => {
  const { error } = employeeSchema.validate(employeeData);
  if (error) {
    throw new Error(error.details[0].message);
  }
};
