import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';
import { PATH_AUTH_FORGOT_PASSWORD_BE } from '@constants/routes';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    const response = await axios.post(PATH_AUTH_FORGOT_PASSWORD_BE, { email });

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
