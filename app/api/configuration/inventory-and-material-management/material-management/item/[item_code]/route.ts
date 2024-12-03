import { NextRequest, NextResponse } from 'next/server';
import { getServerSideSession } from '@utils/session';
import axios, { AxiosError } from 'axios';
import { PATH_ITEMS_MASTER_BE } from '@constants/routes';

export async function GET(
  req: NextRequest,
  { params }: { params: { item_code: string } }
) {
  try {
    const { item_code } = params;
    const session = await getServerSideSession();

    const response = await axios.get(`${PATH_ITEMS_MASTER_BE}/${item_code}`, {
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

export async function PUT(
  req: NextRequest,
  { params }: { params: { item_code: string } }
) {
  try {
    const session = await getServerSideSession();

    const { item_code } = params;

    const { searchParams } = req.nextUrl;

    const body = (await req.json()) as MasterItemFormBody;

    const response = await axios.put(
      `${PATH_ITEMS_MASTER_BE}/${item_code}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${session.user?.data?.authorization?.access_token}`,
        },
        params: searchParams,
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.data) {
      return NextResponse.json(error?.response?.data, {
        status: axiosError.response.status,
      });
    }
    return NextResponse.json(
      { message: 'Internal server error', error },
      { status: 500 }
    );
  }
}
