import { NextResponse } from 'next/server';
import { getServerSideSession } from '@utils/session';
import axios from 'axios';
import { ApiResponse } from '../../../types/api/api';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as LoginFormBody;

    const response = await axios.post(
      `${process.env.API_BASE_URL}/login`,
      body
    );
    const responseData = response.data as ApiResponse<UserAuthorization>;

    const session = await getServerSideSession();
    session.user = {
      isLoggedIn: true,
      data: {
        companyId: body.companyId,
        usercode: body.usercode,
        authorization: responseData.data,
      },
    };

    await session.save();
    return NextResponse.json(response.data);
  } catch (error: any) {
    if (error?.response?.data) {
      return NextResponse.json(error?.response?.data, { status: 400 });
    }
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
