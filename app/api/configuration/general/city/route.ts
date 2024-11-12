import { NextRequest, NextResponse } from 'next/server';
import { getServerSideSession } from '@utils/session';
import axios, { AxiosError } from 'axios';
import { PATH_CITY_BE } from '@constants/routes';

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;

    const session = await getServerSideSession();

    const url = `${PATH_CITY_BE}?page_size=${
      params.get('page_size') || ''
    }&page=${params.get('current_page') || ''}&search=${
      params.get('search') || ''
    }`;

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
