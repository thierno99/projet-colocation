
export interface UserInterface {
    id: string;
    lastname: string;
    firstname: string;
    sexe: string;
    dateOfBirth: Date;
    phoneNumber: string;
    email: string;
    password: string;
    isEmailVerified: boolean;
    iscertified: boolean;
    profileImg: string | string[];
    autorizeHaldleTel:  boolean,
    autorizeHaldleEmail: boolean,
    roles: string[]
}

export class User implements UserInterface {
    id!: string;
    lastname: string;
    firstname: string;
    sexe: string;
    dateOfBirth: Date;
    phoneNumber: string;
    email: string;
    password: string;
    isEmailVerified: boolean;
    iscertified: boolean;
    profileImg: string | string[];
    autorizeHaldleTel: boolean;
    autorizeHaldleEmail: boolean;
    roles: string[];
    
    constructor(
        lastname: string,
        firstname: string,
        sexe: string,
        dateOfBirth: Date,
        phoneNumber: string,
        email: string,
        password: string,
        isEmailVerified: boolean,
        iscertified: boolean,
        profileImg: string | string[],
        autorizeHaldleTel: boolean,
        autorizeHaldleEmail: boolean,
        roles: string[]
    ) {
      this.lastname = lastname;
      this.firstname = firstname;
      this.sexe = sexe;
      this.dateOfBirth = dateOfBirth;
      this.phoneNumber = phoneNumber;
      this.email = email;  
      this.password = password;
      this.isEmailVerified = isEmailVerified;
      this.iscertified  = iscertified;
      this.profileImg = profileImg;
      this.autorizeHaldleTel = autorizeHaldleTel;
      this.autorizeHaldleEmail = autorizeHaldleEmail;
      this.roles = roles;
    }   
}