import { COOKIE_NAME } from '@constants/cookie';
import { IronSessionData, SessionOptions, getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

export const sessionOptions: SessionOptions = {
  cookieName: COOKIE_NAME,
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  },
};

declare module 'iron-session' {
  interface IronSessionData {
    user?: IUser;
    token: string;
  }
}

export type SessionParams = {
  ttl?: number;
  cookieOptions?: any;
};

export const getServerSideSession = (params?: SessionParams) => {
  const { ttl, cookieOptions } = params || {};
  const withSessionOptions: SessionOptions = {
    ...sessionOptions,
    ttl,
    cookieOptions: {
      ...sessionOptions.cookieOptions,
      ...cookieOptions,
    },
  };

  return getIronSession<IronSessionData>(cookies(), withSessionOptions);
};

export const clearServerSideSession = async (cookieOptions?: any) => {
  const withSessionOptions: SessionOptions = {
    ...sessionOptions,
    cookieOptions: {
      ...sessionOptions.cookieOptions,
      ...cookieOptions,
    },
  };

  const session = await getIronSession<IronSessionData>(
    cookies(),
    withSessionOptions
  );

  session.destroy();
};
