type ErrorBodyCollection = Readonly<{
  code: string;
  message: string;
}>;

type ErrorBody = Readonly<{
  statusCode: number;
  message: string;
  errors: ErrorBodyCollection[];
}>;

type ErrorData = Readonly<{
  statusCode: number;
  message: string;
  body: ErrorBody;
}>;

export default ErrorData;
