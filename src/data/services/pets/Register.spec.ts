import { IPetModel } from '../../../domain/models/Pet';
import { IPetRepository, INewPetModel } from "../../contracts/pets/IPetRepository";
import { Register } from "./Register";
import { IRegisterPetRequest } from './../../../domain/protocols/pets/IRegister';

interface ISutType {
  mockPetRepository: IPetRepository
  sut: Register;
}

const makePetRegistrationResultMock = (): IPetModel => {
  return {
    id: 'mock_id',
    insertedAt: new Date(),
    latitude: 30.00000001,
    longitude: -51.999999991,
  };
}

const makePetRepositoryMock = (): IPetRepository => {
  class mockPetRepository implements IPetRepository {
    add(pet: INewPetModel): IPetModel {
      return makePetRegistrationResultMock();
    }
  }
  return new mockPetRepository();
}

const makeSut = (): ISutType => {
  const mockPetRepository = makePetRepositoryMock();
  const sut = new Register(mockPetRepository);
  return { sut, mockPetRepository };
};

const makePetRegistrationRequestMock = (): IRegisterPetRequest => {
  return {
    latitude: 30.000000001,
    longitude: -51.99999991,
  } as IRegisterPetRequest;
}

describe('Pets Registration Service Test Suite', () => {
  it('Should call petRepository add function with the provided data', () => {
    const { sut, mockPetRepository } = makeSut();
    const spy = jest.spyOn(mockPetRepository, 'add');
    const mockRequest = makePetRegistrationRequestMock();
    sut.register(mockRequest);
    expect(spy).toHaveBeenCalledWith({
      latitude: mockRequest.latitude,
      longitude: mockRequest.longitude,
    });
  });

  it('Should return registered pet from petRepository', () => {
    const { sut, mockPetRepository } = makeSut();
    const mockRegisteredPet = makePetRegistrationResultMock();
    jest.spyOn(mockPetRepository, 'add').mockReturnValueOnce(mockRegisteredPet);
    const mockRequest = makePetRegistrationRequestMock();
    const response = sut.register(mockRequest);
    expect(response).toEqual(mockRegisteredPet);
  });
});
