import ErrorData from '../endpoints/types/error';

class ApiError extends Error {
  constructor(public readonly data: ErrorData) {
    super(data.body.message);
  }
}

export default ApiError;
