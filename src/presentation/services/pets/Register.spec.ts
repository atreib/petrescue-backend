import { MissingParameterError } from './../../../domain/errors/MissingParameterError';
import { IRegister, IRegisterPetRequest } from './../../../domain/protocols/pets/IRegister';
import { IPetModel } from './../../../domain/models/Pet';
import { IHttpRequest } from '../../protocols';
import { Register } from './Register';

interface ISutTypes {
  mockPetRegistration: IRegister;
  sut: Register;
}

const makePetRegistrationServiceMock = (): IRegister => {
  class MockPetRegistrationService implements IRegister {
    register(pet: IRegisterPetRequest): IPetModel {
      return {
        id: 'mock_id',
        insertedAt: new Date(),
        latitude: 30.00000001,
        longitude: -51.999999991,
      }
    }
  }
  return new MockPetRegistrationService();
}

const makeSut = (): ISutTypes => {
  const mockPetRegistration = makePetRegistrationServiceMock();
  const sut = new Register(mockPetRegistration)
  return { sut, mockPetRegistration }
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
    delete mockRequest.body[missingParam];
    const response = sut.handle(mockRequest);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new MissingParameterError(missingParam))
  });

  it('Should return badRequest if longitude isnt provided', () => {
    const { sut } = makeSut();
    const missingParam = 'longitude';
    const mockRequest = makeValidPetRegistrationRequest();
    delete mockRequest.body[missingParam];
    const response = sut.handle(mockRequest);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new MissingParameterError(missingParam))
  });

  it('Should call pet registration service', () => {
    const { sut, mockPetRegistration } = makeSut();
    const spyRegister = jest.spyOn(mockPetRegistration, 'register');
    const mockRequest = makeValidPetRegistrationRequest();
    sut.handle(mockRequest);
    expect(spyRegister).toHaveBeenCalledWith({
      latitude: mockRequest.body.latitude,
      longitude: mockRequest.body.longitude,
    });
  })
});
