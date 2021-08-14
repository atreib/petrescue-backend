import { IHttpRequest } from '../../protocols';
import { Register } from './Register';

interface ISutTypes {
  sut: Register
}

const makeSut = (): ISutTypes => {
  const sut = new Register()
  return { sut }
}

describe('Pets Register Service Test Suite', () => {
  it('Should return an ok', () => {
    const { sut } = makeSut();
    const response = sut.handle({} as IHttpRequest)
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "ok" });
  })
});
