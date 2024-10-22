import { removeAuthorization } from '@utils/cleanAuthorization';
import { getServerSideSession } from '@utils/session';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await getServerSideSession();
    return NextResponse.json(removeAuthorization(session.user?.data));
  } catch (e) {
    return NextResponse.json({ message: 'user not found' }, { status: 401 });
  }
}
