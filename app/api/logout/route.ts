import { NextResponse } from 'next/server';
import axios from 'axios';
import { PATH_AUTH_LOGOUT_BE } from '@constants/routes';
import { getServerSideSession, clearServerSideSession } from '@utils/session';

export async function GET() {
  try {
    const session = await getServerSideSession();

    await axios.get(PATH_AUTH_LOGOUT_BE, {
      headers: {
        Authorization: `Bearer ${session.user?.data?.authorization?.access_token}`,
      },
    });

    await clearServerSideSession();

    return NextResponse.json(
      { message: 'Successfully logged out' },
      { status: 200 }
    );
  } catch (error: any) {
    if (error?.response?.data) {
      return NextResponse.json(error?.response?.data, { status: 400 });
    }

    return NextResponse.json(
      { message: 'Internal server error', error },
      { status: 500 }
    );
  }
}
