import { NextResponse } from 'next/server';
import { getServerSideSession } from '@utils/session';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const session = await getServerSideSession();
    session.user = body;

    session.save();
    return NextResponse.json({
      message: 'Logged in successfully',
      data: session,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
