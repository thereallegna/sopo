interface UserData {
  companyId?: string;
  usercode?: string;
  authorization?: UserAuthorization;
  imageUrl?: string;
}

interface UserAuthorization {
  access_token: string;
}

interface IUser {
  isLoggedIn: boolean;
  data: UserData | null;
}
