import Joi from 'joi';

const requestSchema = Joi.object({
  code: Joi.string().max(50).required(),
  description: Joi.string().max(255).required(),
  summary: Joi.string().max(255).required(),
  employee_id: Joi.number().integer().required(),
});

export const validateRequest = (requestData) => {
  const { error } = requestSchema.validate(requestData);
  if (error) {
    throw new Error(error.details[0].message);
  }
};
