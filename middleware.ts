import { getServerSideSession } from '@utils/session';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/login')) {
    // return NextResponse.next();
  }

  const session = await getServerSideSession(request);
  if (!session || !session.user?.isLoggedIn) {
    // return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico|assets|sw.js|robots.txt|sitemap.xml).*)',
  ],
};
