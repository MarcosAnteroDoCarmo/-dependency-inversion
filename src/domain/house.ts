type ConstructHouseDTO = {
  id: string;
  address: string;
  valuation: number;
  owner?: string;
};

export class House {
   _id: string;
   _address: string;
   _valuation: number;
   _owner: string | undefined;

  constructor(params: ConstructHouseDTO) {
    this._id = params.id;
    this._address = params.address;
    this._valuation = params.valuation;
    this._owner = params.owner;
  }


}
