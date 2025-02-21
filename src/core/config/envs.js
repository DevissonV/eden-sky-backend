import "dotenv/config";
import { object, number, string } from "yup";

/**
 * Schema for environment variables validation and default values.
 * @constant {Object} envVarsSchema
 */
const envVarsSchema = object({
  APP_PORT: number().required().default(3000),
  DB_HOST: string().required().default("localhost"),
  DB_PORT: number().required().default(5432),
  DB_USER: string().required(),
  DB_PASSWORD: string().required(),
  DB_NAME: string().required(),
  NODE_ENV: string()
    .oneOf(['development', 'production'])
    .required()
    .default("development"),
  JWT_SECRET: string()
    .required("JWT_SECRET is required")
    .min(16, "JWT_SECRET must be at least 16 characters"),
  JWT_TIME_EXPIRES: string().required("JWT_TIME_EXPIRES is required"),
  ROLE_ADMIN: string().required("ROLE_ADMIN is required"),
  ROLE_EMPLOYEE: string().required("ROLE_EMPLOYEE is required"), 
  CORS_ORIGINS: string().required("CORS_ORIGINS is required"),
}).noUnknown();

/**
 * Validated environment variables.
 * @constant {Object} envs
 */
export const envs = {
  ...envVarsSchema.validateSync(process.env, {
    abortEarly: false,
    stripUnknown: true,
  }),
};
