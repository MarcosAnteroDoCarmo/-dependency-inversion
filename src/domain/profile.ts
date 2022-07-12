type ConstructPerfilDTO = {
  id: string;
  userName: string;
};

export class Profile {
  private _id: string;
  private _userName: string;
  private _createdAt: Date;

  private constructor(params: ConstructPerfilDTO) {
    this._id = params.id;
    this._userName = params.userName;
    this._createdAt = new Date
  }

  static createProfile(params: ConstructPerfilDTO): Profile {
    const { id, userName} = params;

    return new Profile({ id, userName});
  }
}

// const perfil = Profile.createProfile({
//   id:"marcos",
//   userName: "marcola",
// })

// console.log(perfil)

// const data = new Date;
// console.log(data.getTime())