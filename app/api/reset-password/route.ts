import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';
import { PATH_AUTH_RESET_PASSWORD_BE } from '@constants/routes';

export async function POST(request: Request) {
  try {
    const { token, newPassword } = await request.json();

    if (!token || !newPassword) {
      return NextResponse.json(
        { message: 'Token and new password are required' },
        { status: 400 }
      );
    }

    const response = await axios.post(PATH_AUTH_RESET_PASSWORD_BE, {
      token,
      newPassword,
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
