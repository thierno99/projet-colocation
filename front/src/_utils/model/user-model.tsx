
export interface UserInterface {
    id: string;
    nom: string;
    prenom: string;
    sexe: string;
    dateOfBirth: Date;
    email: string;
    password: string;
    isEmailVerified: boolean;
    iscertified: boolean;
    profileImg: string;
    autorizeHaldleTel:  boolean,
    autorizeHaldleEmail: boolean,
}