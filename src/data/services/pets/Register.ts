import { IRegister, IRegisterPetRequest } from "../../../domain/protocols/pets/IRegister";
import { IPetModel } from './../../../domain/models/Pet';
import { IPetRepository } from './../../contracts/pets/IPetRepository';

class Register implements IRegister {
  constructor(
    private readonly petRepository: IPetRepository
  ) { }

  register(pet: IRegisterPetRequest): IPetModel {
    const registeredPet = this.petRepository.add({
      latitude: pet.latitude,
      longitude: pet.longitude,
    });
    return registeredPet;
  }
}

export { Register };
