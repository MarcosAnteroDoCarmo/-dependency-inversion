type ConstructHouseDTO = {
  id: string;
  company: string;
  valuation: number;
  owner?: string;
};

export class Stocks {
   _id: string;
   _company: string;
   _valuation: number;
   _owner: string | undefined;

  constructor(params: ConstructHouseDTO) {
    this._id = params.id;
    this._company = params.company;
    this._valuation = params.valuation;
    this._owner = params.owner;
  }
}