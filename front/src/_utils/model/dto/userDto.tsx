import { RoleInterface } from "../user-model";

export class UserDto {
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
    autorizeHaldleTel: boolean;
    autorizeHaldleEmail: boolean;
    roles: RoleInterface[];
    
    constructor(
        id: string,
        lastname: string,
        firstname: string,
        sexe: string,
        dateOfBirth: Date,
        phoneNumber: string,
        email: string,
        password: string,
        isEmailVerified: boolean,
        iscertified: boolean,
        autorizeHaldleTel: boolean,
        autorizeHaldleEmail: boolean,
        roles: RoleInterface[]
    ) {
        this.id = id;
        this.lastname = lastname;
        this.firstname = firstname;
        this.sexe = sexe;
        this.dateOfBirth = dateOfBirth;
        this.phoneNumber = phoneNumber;
        this.email = email;  
        this.password = password;
        this.isEmailVerified = isEmailVerified;
        this.iscertified  = iscertified;
        this.autorizeHaldleTel = autorizeHaldleTel;
        this.autorizeHaldleEmail = autorizeHaldleEmail;
        this.roles = roles;
    }   
}