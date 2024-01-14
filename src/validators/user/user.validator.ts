import { Request } from 'express';
import { loginSchema, registerSchema } from './user.validator.schema';
import { ZodError } from 'zod';

export default class UserValidator {
  registerValidator = (req: Request) => {
    try {
      return registerSchema.parse(req.body.variables);
    } catch (error) {
      if (error instanceof ZodError) {
        return new Error(error.toString());
      }
    }
  };

  loginValidator = (req: Request) => {
    try {
      return loginSchema.parse(req.body.variables);
    } catch (error) {
      if (error instanceof ZodError) {
        return new Error(error.toString());
      }
    }
  };
}
