import { IHttpRequest, IHttpResponse, IHttpService } from '../../protocols';
import { ok } from './../../utils/Responses'

class Register implements IHttpService {
  handle(request: IHttpRequest): IHttpResponse {
    return ok({ message: "ok" });
  }
}

export { Register }
