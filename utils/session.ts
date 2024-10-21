// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { COOKIE_NAME } from '@constants/cookie';
import { IronSessionData, SessionOptions, getIronSession } from 'iron-session';
import { NextRequest, NextResponse } from 'next/server';

export const sessionOptions: SessionOptions = {
  cookieName: COOKIE_NAME,
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieOptions: {
    // httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  },
};

declare module 'iron-session' {
  interface IronSessionData {
    user?: IUser;
    token: string;
  }
}

export const getServerSideSession = (
  cookies: any,
  req: NextRequest,
  res: NextResponse,
  cookieOptions?: any
) => {
  const withDomainSessionOptions: SessionOptions = {
    ...sessionOptions,
    cookieOptions: {
      ...sessionOptions.cookieOptions,
      ...cookieOptions,
    },
  };

  return getIronSession<IronSessionData>(cookies, withDomainSessionOptions);
};
