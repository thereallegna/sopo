interface UserData {
  id: string;
  companyId?: string;
  usercode: string;
  authorization?: UserAuthorization;
  imageUrl?: string;
}

interface UserAuthorization {
  tokenType: string;
  accessToken: string;
  expiredAt: number;
  refreshToken: string;
  refreshTokenExpiredAt: number;
}

interface IUser {
  isLoggedIn: boolean;
  data: UserData | null;
}
