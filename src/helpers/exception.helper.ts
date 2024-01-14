import { ExceptionType } from '@enums/exception';

export default class Exception extends Error {
  code: number;
  data: null;
  type: ExceptionType;

  constructor(message: string, code: number, data: null, type: ExceptionType) {
    super(message);
    this.message = message;
    this.code = code;
    this.data = data;
    this.type = type;
  }
}
