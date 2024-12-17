import { NextRequest, NextResponse } from 'next/server';
import { getServerSideSession } from '@utils/session';
import axios, { AxiosError } from 'axios';
import { PATH_GET_ITEM_BE } from '@constants/routes';

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    console.log('param', params);

    const session = await getServerSideSession();

    const response = await axios.get(PATH_GET_ITEM_BE, {
      headers: {
        Authorization: `Bearer ${session.user?.data?.authorization?.access_token}`,
      },
      params: {
        code: params.get('page'),
        category: params.get('page_size'),
        warehouse: params.get('warehouse'),
        item_category: params.get('item_category'),
        item_name: params.get('item_name'),
      },
    });

    console.log('ressponm', response.data);

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
