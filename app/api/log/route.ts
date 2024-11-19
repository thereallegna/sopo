import { NextRequest, NextResponse } from 'next/server';
import { getServerSideSession } from '@utils/session';
import axios, { AxiosError } from 'axios';
import { PATH_LOG_HISTORY_BE } from '@constants/routes';

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;

    const session = await getServerSideSession();

    const url = `${PATH_LOG_HISTORY_BE}?code=${params.get(
      'code'
    )}&category=${params.get('category')}`;

    console.log('Backend URL:', url);

    const response = await axios.get(url.toString(), {
      headers: {
        Authorization: `Bearer ${session.user?.data?.authorization?.access_token}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    const axiosError = error as AxiosError;
    if (error?.response?.data) {
      return NextResponse.json(error?.response?.data, {
        status: axiosError.response?.status,
      });
    }
    return NextResponse.json(
      { message: 'Internal server error', error },
      { status: 500 }
    );
  }
}
