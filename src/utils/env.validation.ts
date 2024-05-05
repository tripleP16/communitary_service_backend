import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  PORT: Joi.string().default('3000'),
  ENV: Joi.string().default('DEV'),
  DB_URL: Joi.string(),
  DB_NAME: Joi.string(),
  SMTP_HOST: Joi.string(),
  SMTP_PORT: Joi.number(),
  SMTP_SECURE: Joi.boolean(),
  SMTP_USER: Joi.string(),
  SMTP_PASS: Joi.string(),
  REFRESH_SECRET: Joi.string(),
  ACCESS_SECRET: Joi.string(),
});
