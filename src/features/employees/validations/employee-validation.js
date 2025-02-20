import Joi from 'joi';

const employeeSchema = Joi.object({
  name: Joi.string().max(50).required(),
  hire_date: Joi.date().required(),
  salary: Joi.number().precision(2).required(),
});

export const validateEmployee = (employeeData) => {
  const { error } = employeeSchema.validate(employeeData);
  if (error) {
    throw new Error(error.details[0].message);
  }
};
