type ErrorBodyCollection = {
  code: string;
  message: string;
};

type ErrorBody = {
  statusCode: number;
  message: string;
  errors: ErrorBodyCollection[];
};

type ErrorData = {
  statusCode: number;
  message: string;
  body: ErrorBody;
};

export default ErrorData;
