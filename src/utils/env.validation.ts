import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  PORT: Joi.string().default('3000'),
  ENV: Joi.string().default('DEV'),
  DB_URL: Joi.string(),
});
