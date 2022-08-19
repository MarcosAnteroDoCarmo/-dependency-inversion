export type ConstructStockDTO = {
  id?: string;
  company: string;
  valuation: number;
  createdAt: Date;
  userIds?: string[];
};

export class Stocks {
  _id?: string;
  _company: string;
  _valuation: number;
  _createdAt: Date;
  _userIds?: string[];

  constructor(params: ConstructStockDTO) {
    this._id = params.id;
    this._company = params.company;
    this._valuation = params.valuation;
    this._createdAt = params.createdAt || new Date();
    this._userIds = params.userIds;
  }
  get id(): string | undefined {
    return this._id;
  }
  get company(): string {
    return this._company;
  }
  get valuation(): number {
    return this._valuation;
  }
  get createdAt(): Date {
    return this._createdAt;
  }
  get userId(): string[] | undefined {
    return this._userIds;
  }

  set id(value: string | undefined) {
    this._id = value;
  }
  set company(value: string) {
    this._company = value;
  }
  set valuation(value: number) {
    this._valuation = value;
  }
  set createdAt(value: Date) {
    this._createdAt = value;
  }
  set userId(value: string[] | undefined) {
    this._userIds = value;
  }
}
