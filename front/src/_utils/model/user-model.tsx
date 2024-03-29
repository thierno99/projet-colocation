export interface RoleInterface {
    id: string;
    name: string;
}

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
    profileImg: File;
    autorizeHaldleTel:  boolean,
    autorizeHaldleEmail: boolean,
    roles: RoleInterface[]
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
    profileImg: File;
    autorizeHaldleTel: boolean;
    autorizeHaldleEmail: boolean;
    roles: RoleInterface[];
    
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
        profileImg: File,
        autorizeHaldleTel: boolean,
        autorizeHaldleEmail: boolean,
        roles: RoleInterface[]
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