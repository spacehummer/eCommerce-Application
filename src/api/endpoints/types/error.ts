export type ErrorBodyCollection = Readonly<{
  code: string;
  duplicateValue?: string;
  field?: string;
  message: string;
}>;

type ErrorBody = Readonly<{
  statusCode: number;
  message: string;
  errors: ErrorBodyCollection[];
}>;

type ErrorData = Readonly<{
  statusCode?: number;
  message: string;
  body: ErrorBody;
}>;

export default ErrorData;
