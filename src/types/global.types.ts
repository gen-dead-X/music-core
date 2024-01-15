import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export type Context = {
  req: Request;
  res: Response;
};

export type JWTCustomPayload = JwtPayload & {
  id: string;
};
