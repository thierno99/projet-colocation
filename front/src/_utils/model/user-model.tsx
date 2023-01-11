
export interface UserInterface {
    id: number;
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