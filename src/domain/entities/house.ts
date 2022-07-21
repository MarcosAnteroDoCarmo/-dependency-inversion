export type ConstructHouseDTO = {
  id?: string;
  address: string;
  valuation: number;
  userId?: string;
};

export class House {
  _id?: string;
  _address: string;
  _valuation: number;
  _userId: string | undefined;

  constructor(params: ConstructHouseDTO) {
    this._id = params.id;
    this._address = params.address;
    this._valuation = params.valuation;
    this._userId = params.userId;
  }

  get id(): string | undefined{
    return this._id;
  }

  get address(): string {
    return this._address;
  }

  get valuation(): number {
    return this._valuation;
  }

  get userId(): string | undefined {
    return this._userId;
  }

  set id(value: string| undefined) {
    this._id = value;
  }

  set address(value: string) {
    this._address = value;
  }

  set valuation(value: number) {
    this._valuation = value;
  }
  
  set userId(value: string | undefined) {
    this._userId = value;
  }
}
