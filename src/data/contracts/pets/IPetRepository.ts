import { IPetModel } from './../../../domain/models/Pet';

interface INewPetModel {
  latitude: Number;
  longitude: Number;
}

interface IPetRepository {
  add(pet: INewPetModel): IPetModel
}

export { INewPetModel, IPetRepository };
