import { ErrorBodyCollection } from '#src/api/endpoints/types/error';

type RequestState = {
  isSuccessful: boolean;
};

type RequestErrors = {
  error?: ErrorBodyCollection[];
  errorMsg?: string;
};

export type ApiRequestResult = Readonly<RequestState> & ErrorCollection;

export type ErrorCollection = Readonly<RequestErrors>;
