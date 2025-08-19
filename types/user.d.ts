interface UserData {
    companyId?: string;
    usercode?: string;
    authorization?: UserAuthorization;
    imageUrl?: string;
    role: string;
}

interface UserAuthorization {
    access_token: string;
    duration: number;
    role: string;
}

interface IUser {
    isLoggedIn: boolean;
    data: UserData | null;
}
