import { MissingParameterError } from './../../../domain/errors/MissingParameterError';
import { IRegister, IRegisterPetRequest } from './../../../domain/protocols/pets/IRegister';
import { IPetModel } from './../../../domain/models/Pet';
import { IHttpRequest } from '../../protocols';
import { Register } from './Register';
import { InternalServerError } from '../../../domain/errors/InternalServerError';

interface ISutTypes {
  mockPetRegistration: IRegister;
  sut: Register;
}

const makeRegisteredPetMock = (): IPetModel => {
  return {
    id: 'mock_id',
    insertedAt: new Date(),
    latitude: 30.00000001,
    longitude: -51.999999991,
  };
}

const makePetRegistrationServiceMock = (): IRegister => {
  class MockPetRegistrationService implements IRegister {
    register(pet: IRegisterPetRequest): IPetModel {
      return makeRegisteredPetMock();
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

describe('Pets Registration HTTP Controller Test Suite', () => {
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
  });

  it('Should return the registered pet', () => {
    const { sut, mockPetRegistration } = makeSut();
    const registeredPetMock = makeRegisteredPetMock();
    jest.spyOn(mockPetRegistration, 'register').mockImplementationOnce(() => {
      return registeredPetMock;
    });
    const mockRequest = makeValidPetRegistrationRequest();
    const response = sut.handle(mockRequest);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(registeredPetMock);
  });

  it('Should return status 500 if something unexpected is thrown', () => {
    const { sut, mockPetRegistration } = makeSut();
    const expectedError = new Error('mock_error');
    jest.spyOn(mockPetRegistration, 'register').mockImplementationOnce(() => {
      throw expectedError;
    });
    const mockRequest = makeValidPetRegistrationRequest();
    const response = sut.handle(mockRequest)
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(new InternalServerError(expectedError));
  });
});
