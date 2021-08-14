import { IHttpRequest, IHttpResponse, IHttpService } from '../../protocols';
import { ok, badRequest } from './../../utils/Responses'
import { MissingParameterError } from './../../../domain/errors/MissingParameterError';

class Register implements IHttpService {
  handle(request: IHttpRequest): IHttpResponse {
    const { latitude } = request.body;
    if (!latitude) return badRequest(new MissingParameterError('latitude'));
    return ok({ message: "ok" });
  }
}

export { Register }
