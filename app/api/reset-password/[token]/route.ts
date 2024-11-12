import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';
import { PATH_AUTH_RESET_PASSWORD_BE } from '@constants/routes';

export async function POST(
  request: Request,
  { params }: { params: { token: string } }
): Promise<NextResponse> {
  try {
    const { token } = params;
    const { new_password, confirm_password } = await request.json();

    if (!token || !new_password || !confirm_password) {
      return NextResponse.json(
        { message: 'Token, new password, and confirmation are required' },
        { status: 400 }
      );
    }

    const tokenValidationResponse = await axios.get(
      `${PATH_AUTH_RESET_PASSWORD_BE}/validate-token/${token}`
    );

    if (!tokenValidationResponse.data.isValid) {
      return NextResponse.json(
        { message: 'Invalid or expired token' },
        { status: 400 }
      );
    }

    const response = await axios.put(
      `${PATH_AUTH_RESET_PASSWORD_BE}/${token}`,
      {
        new_password,
        confirm_password,
      }
    );

    await axios.post(`${PATH_AUTH_RESET_PASSWORD_BE}/invalid-token`, {
      token,
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
