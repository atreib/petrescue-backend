import { IHttpRequest } from './IHttpRequest';
import { IHttpResponse } from './IHttpResponse';

interface IHttpService {
  handle(request: IHttpRequest): IHttpResponse
}

export {
  IHttpService
}
