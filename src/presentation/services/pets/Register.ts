import { IHttpRequest, IHttpResponse, IHttpService } from '../../protocols';
import { ok, badRequest } from './../../utils/Responses'
import { MissingParameterError } from './../../../domain/errors/MissingParameterError';
import { IRegister } from './../../../domain/protocols/pets/IRegister'

class Register implements IHttpService {
  constructor(
    private readonly registerService: IRegister
  ) { }

  handle(request: IHttpRequest): IHttpResponse {
    const { latitude, longitude } = request.body;
    if (!latitude) return badRequest(new MissingParameterError('latitude'));
    if (!longitude) return badRequest(new MissingParameterError('longitude'));
    const registeredPet = this.registerService.register({ latitude, longitude });
    return ok(registeredPet);
  }
}

export { Register }
