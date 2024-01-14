import { Request } from 'express';
import { loginSchema, registerSchema } from './user.validator.schema';
import { ValidationError } from 'yup';

export default class UserValidator {
  registerValidator = async (req: Request) => {
    try {
      return await registerSchema.validate(req.body.variables, {
        abortEarly: false,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        return new Error(error.errors.join(', '));
      }
    }
  };

  loginValidator = async (req: Request) => {
    try {
      return await loginSchema.isValid(req.body.variables, {
        abortEarly: false,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        return new Error(error.errors.join(', '));
      }
    }
  };
}
