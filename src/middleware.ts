import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Set this to true to enable maintenance mode (site offline)
const IS_MAINTENANCE_MODE = true;

export function middleware(request: NextRequest) {
  if (IS_MAINTENANCE_MODE) {
    // Return a plain 503 Service Unavailable response
    return new NextResponse('503 Service Unavailable', {
      status: 503,
      headers: {
        'content-type': 'text/plain',
        'Retry-After': '3600',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
