import { IPetModel } from './../../models/Pet';

interface IRegisterPetRequest {
  latitude: Number;
  longitude: Number;
}

interface IRegister {
  register(pet: IRegisterPetRequest): IPetModel
}

export { IRegisterPetRequest, IRegister }
