import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';
import { getServerSideSession } from '@utils/session';

// Mock function to simulate user authentication
async function authenticateUser(
  username: string,
  password: string
): Promise<UserData | null> {
  try {
    const res = await axios.post(`${process.env.BACKEND_URL}/auth/login`, {
      username,
      password,
    });
    return res.data as UserData;
  } catch (e: unknown) {
    console.log(e);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { message: 'Username and password are required' },
        { status: 400 }
      );
    }

    const userData = await authenticateUser(username, password);

    if (!userData) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const session = await getServerSideSession(
      cookies(),
      request,
      new NextResponse(),
      {}
    );

    const user: IUser = {
      isLoggedIn: true,
      data: userData,
    };

    session.user = user;
    session.token = userData.authorization?.accessToken || '';
    await session.save();

    return NextResponse.json({ message: 'Logged in successfully', user });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
