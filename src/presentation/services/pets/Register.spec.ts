import { MissingParameterError } from './../../../domain/errors/MissingParameterError';
import { IHttpRequest } from '../../protocols';
import { Register } from './Register';

interface ISutTypes {
  sut: Register
}

const makeSut = (): ISutTypes => {
  const sut = new Register()
  return { sut }
}

const makeValidPetRegistrationRequest = (): IHttpRequest => {
  return {
    body: {
      latitude: 30.0000001,
      longitude: -51.9999919,
    }
  } as IHttpRequest;
}

describe('Pets Register Service Test Suite', () => {
  it('Should return an ok if provided data is valid', () => {
    const { sut } = makeSut();
    const mockRequest = makeValidPetRegistrationRequest();
    const response = sut.handle(mockRequest)
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "ok" });
  });

  it('Should return badRequest if latitude isnt provided', () => {
    const { sut } = makeSut();
    const missingParam = 'latitude';
    const mockRequest = makeValidPetRegistrationRequest();
    delete mockRequest.body.latitude;
    const response = sut.handle(mockRequest);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new MissingParameterError(missingParam))
  });
});
