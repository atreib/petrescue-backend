import { IHttpResponse } from "../protocols";
import { BaseError } from './../../domain/errors/BaseError';

const ok = (body: any) => {
  return {
    statusCode: 200,
    body,
  } as IHttpResponse;
}

const badRequest = (error: BaseError) => {
  return {
    statusCode: 400,
    body: error,
  } as IHttpResponse;
}

const serverError = (error: BaseError) => {
  return {
    statusCode: 500,
    body: error,
  } as IHttpResponse;
}

export {
  ok,
  badRequest,
  serverError,
}
