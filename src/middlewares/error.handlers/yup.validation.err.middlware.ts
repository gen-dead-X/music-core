import { ValidationError } from 'yup';
import Exception from '@helpers/exception.helper';
import { ExceptionType } from '@enums/exception';
import StatusCodes from '@enums/statusCodes';

export default function yupValidationErrorHandler(error: ValidationError) {
  return new Exception(
    error.errors.join(', '),
    StatusCodes.BAD_REQUEST,
    null,
    ExceptionType.VALIDATION_ERROR
  );
}
