interface UserData {
  companyId?: string;
  usercode?: string;
  authorization?: UserAuthorization;
  imageUrl?: string;
}

interface UserAuthorization {
  access_token: string;
  duration: number;
}

interface IUser {
  isLoggedIn: boolean;
  data: UserData | null;
}
