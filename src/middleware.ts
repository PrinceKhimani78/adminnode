import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Set this to true to enable maintenance mode (site offline)
const IS_MAINTENANCE_MODE = true;

export function middleware(request: NextRequest) {
  if (IS_MAINTENANCE_MODE) {
    // Return a styled 503 Service Unavailable HTML page matching the image
    return new NextResponse(
      `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>503 Service Unavailable</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #ffffff;
            color: #444444;
            text-align: center;
          }
          .container {
            padding: 20px;
          }
          h1 {
            font-size: 100px;
            font-weight: 800;
            margin: 0;
            color: #4a4a4a;
            line-height: 1;
          }
          h2 {
            font-size: 24px;
            margin: 15px 0 10px 0;
            color: #4a4a4a;
          }
          p {
            font-size: 12px;
            color: #666666;
            margin: 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>503</h1>
          <h2>Service Unavailable</h2>
          <p>The server is temporarily busy, try again later!</p>
        </div>
      </body>
      </html>`,
      {
        status: 503,
        headers: {
          'content-type': 'text/html',
          'Retry-After': '3600',
        },
      }
    );
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
