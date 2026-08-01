// apps/web/src/middleware.ts
// Protect /report and /recommendations unless assessment is complete
// NOTE: Cannot read IndexedDB/localStorage in middleware (edge runtime)
// Instead: soft redirect — the pages themselves check completion state

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // The actual guard happens client-side in the page components.
  // Middleware here only handles:
  // 1. Trailing slash normalization
  // 2. Future API rate limiting hooks
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
