import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const { pathname, host } = url

  // 1. 도메인 고정 (www.gplanworld.com)
  const isLocal = host.includes('localhost') || host.includes('192.168.')
  if (!isLocal && host !== 'www.gplanworld.com') {
    url.hostname = 'www.gplanworld.com'
    return NextResponse.redirect(url, 301)
  }

  // 2. Trailing Slash 제거
  if (pathname !== '/' && pathname.endsWith('/')) {
    url.pathname = pathname.slice(0, -1)
    return NextResponse.redirect(url, 301)
  }

  // 3. /en 경로 처리
  // 만약 /en/ci 접속 시 404가 뜬다면, 
  // Next.js가 src/app/en/ci/page.tsx를 제대로 배포했는지 확인하는 것이 우선입니다.
  return NextResponse.next()
}

export const config = {
  matcher: [
    // api, _next 등을 제외한 모든 경로 감시
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:ico|png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf|eot)).*)',
  ],
}