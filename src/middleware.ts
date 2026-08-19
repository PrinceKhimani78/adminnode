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
            transition: background-color 0.3s, color 0.3s;
          }
          .container {
            padding: 20px;
          }
          h1 {
            font-size: 180px;
            font-weight: 800;
            margin: 0;
            color: #4a4a4a;
            line-height: 1;
            transition: color 0.3s;
          }
          h2 {
            font-size: 24px;
            margin: 15px 0 10px 0;
            color: #4a4a4a;
            transition: color 0.3s;
          }
          p {
            font-size: 12px;
            color: #666666;
            margin: 0;
            transition: color 0.3s;
          }
          
          @media (prefers-color-scheme: dark) {
            body {
              background-color: #121212;
              color: #e0e0e0;
            }
            h1, h2 {
              color: #f5f5f5;
            }
            p {
              color: #a0a0a0;
            }
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
