import { IHttpRequest, IHttpResponse, IHttpService } from '../../protocols';
import { ok, badRequest } from './../../utils/Responses'
import { MissingParameterError } from './../../../domain/errors/MissingParameterError';

class Register implements IHttpService {
  handle(request: IHttpRequest): IHttpResponse {
    const { latitude, longitude } = request.body;
    if (!latitude) return badRequest(new MissingParameterError('latitude'));
    if (!longitude) return badRequest(new MissingParameterError('longitude'));
    return ok({ message: "ok" });
  }
}

export { Register }
