import { ErrorBodyCollection } from '#src/api/endpoints/types/error';

export type ApiRequestResult = Readonly<RequestState> & ErrorCollection;

type RequestState = {
  isSuccessful: boolean;
};

type RequestErrors = {
  error?: ErrorBodyCollection[];
  errorMsg?: string;
};

export type ErrorCollection = Readonly<RequestErrors>;
