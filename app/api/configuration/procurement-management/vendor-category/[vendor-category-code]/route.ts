import { NextRequest, NextResponse } from '@node_modules/next/server';
import { getServerSideSession } from '@utils/session';
import axios, { AxiosError } from 'axios';
import { PATH_VENDOR_CATEGORY_BE } from '@constants/routes';

export async function PUT(
  req: NextRequest,
  { params }: { params: { vendor_category_code: string } }
) {
  try {
    const session = await getServerSideSession();
    console.log('session:', session.user?.data?.authorization?.access_token);

    const { vendor_category_code } = params;

    const body = (await req.json()) as VendorCategoryFormBody;

    const response = await axios.put(
      `${PATH_VENDOR_CATEGORY_BE}/${vendor_category_code}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${session.user?.data?.authorization?.access_token}`,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.data) {
      return NextResponse.json(error?.response?.data, { status: 400 });
    }
    return NextResponse.json(
      { message: 'Internal server error', error },
      { status: 500 }
    );
  }
}
