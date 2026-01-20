# 리디렉션 오류 해결 가이드

**작성 일자**: 2025-01-27  
**대상 도메인**: https://www.gplanworld.com  
**프레임워크**: Next.js 16.0.0 (Vercel 배포)

---

## 🔴 Google Search Console 리디렉션 오류 유형

Google Search Console에서 발견할 수 있는 주요 리디렉션 오류들:

### 1. 리디렉션 체인이 너무 김
**원인**: 여러 번의 리디렉션이 연속으로 발생
**해결**: 단일 리디렉션으로 최적화

### 2. 리디렉션 순환 오류
**원인**: A → B → A 형태의 무한 루프
**해결**: 리디렉션 로직 검증 및 수정

### 3. 리디렉션 URL이 최대 URL 길이를 초과
**원인**: 쿼리 파라미터나 경로가 너무 길어짐
**해결**: URL 길이 제한 및 검증

### 4. 리디렉션 체인에 잘못되거나 빈 URL이 있음
**원인**: 리디렉션 대상 URL이 비어있거나 잘못된 형식
**해결**: URL 검증 로직 추가

---

## ✅ 현재 구현 상태

### 1. Vercel 리디렉션 설정 (`vercel.json`)

```json
{
  "redirects": [
    {
      "source": "/:path*",
      "has": [
        {
          "type": "host",
          "value": "gplanworld.com"
        }
      ],
      "destination": "https://www.gplanworld.com/:path*",
      "permanent": true
    }
  ]
}
```

**특징**:
- ✅ non-www → www 단일 리디렉션
- ✅ 경로와 쿼리 파라미터 보존 (`/:path*`)
- ✅ 301 (permanent) 리디렉션 사용
- ✅ HTTP → HTTPS는 Vercel이 자동 처리

### 2. Next.js Middleware (`src/middleware.ts`)

```typescript
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get('host') || ''
  
  // Canonical 도메인 확인
  const canonicalDomain = 'www.gplanworld.com'
  
  // 이미 canonical 도메인인 경우 리디렉션 불필요
  if (hostname === canonicalDomain) {
    return NextResponse.next()
  }
  
  // 리디렉션은 Vercel에서 처리
  return NextResponse.next()
}
```

**특징**:
- ✅ 리디렉션 체인 방지 로직
- ✅ Canonical 도메인 검증
- ✅ Vercel 리디렉션과 충돌 방지

### 3. 404 페이지 (`src/app/not-found.tsx`)

**특징**:
- ✅ 명확한 404 상태 코드 반환
- ✅ Soft 404 방지
- ✅ 사용자 친화적인 에러 메시지
- ✅ 홈페이지 링크 제공
- ✅ `robots: { index: false }` 설정 (404 페이지 색인 방지)

---

## 🔍 리디렉션 검증 방법

### 1. 수동 검증 (cURL)

```bash
# non-www → www 리디렉션 확인
curl -I https://gplanworld.com/
# 예상: HTTP/1.1 301 Moved Permanently
#       Location: https://www.gplanworld.com/

# 리디렉션 체인 확인 (최대 1회만 발생해야 함)
curl -I -L https://gplanworld.com/ 2>&1 | grep -i "HTTP\|Location"
# 예상 출력:
# HTTP/1.1 301 Moved Permanently
# Location: https://www.gplanworld.com/
# HTTP/1.1 200 OK

# 최종 URL HTTP 200 확인
curl -I https://www.gplanworld.com/
# 예상: HTTP/1.1 200 OK
```

### 2. Google Search Console URL 검사

1. [Google Search Console](https://search.google.com/search-console) 접속
2. **URL 검사** 도구 사용
3. URL 입력: `https://www.gplanworld.com/`
4. 확인 사항:
   - ✅ "페이지가 색인 생성됨"
   - ✅ "리디렉션 오류" 없음
   - ✅ HTTP 200 상태 코드

### 3. 온라인 리디렉션 체크 도구

**추천 도구**:
- [Redirect Checker](https://www.redirectchecker.com/)
- [HTTP Status Code Checker](https://httpstatus.io/)
- [Redirect Path](https://redirectpath.com/)

**검증 항목**:
- ✅ 리디렉션 체인: 최대 1회만 발생
- ✅ 최종 상태 코드: 200 OK
- ✅ 최종 URL: `https://www.gplanworld.com/`
- ✅ 리디렉션 코드: 301 (Permanent)

---

## 🛠️ 문제 해결 단계

### Step 1: 리디렉션 체인 확인

```bash
# 리디렉션 체인 테스트
curl -v -L https://gplanworld.com/ 2>&1 | grep -i "< HTTP\|< Location"
```

**정상 결과**: 1회의 리디렉션만 발생
**문제 결과**: 2회 이상의 리디렉션 발생

### Step 2: 리디렉션 순환 확인

```bash
# 리디렉션 순환 테스트
curl -I -L --max-redirs 5 https://gplanworld.com/
```

**정상 결과**: 최종적으로 200 OK 반환
**문제 결과**: 리디렉션 루프 발생 (--max-redirs 초과)

### Step 3: 리디렉션 URL 검증

리디렉션 URL이 올바른지 확인:
- ✅ 프로토콜 포함 (`https://`)
- ✅ 도메인 포함 (`www.gplanworld.com`)
- ✅ 경로 보존 (`/:path*`)
- ✅ 쿼리 파라미터 보존

### Step 4: 404 페이지 검증

```bash
# 404 페이지 테스트
curl -I https://www.gplanworld.com/nonexistent-page
# 예상: HTTP/1.1 404 Not Found
```

---

## 📋 리디렉션 플로우 다이어그램

```
요청: http://gplanworld.com/
  ↓
[Vercel 자동] HTTP → HTTPS 리디렉션
  ↓
요청: https://gplanworld.com/
  ↓
[vercel.json] non-www → www 리디렉션 (301)
  ↓
요청: https://www.gplanworld.com/
  ↓
[Next.js] HTTP 200 OK ✅
```

**총 리디렉션 횟수**: 2회
- HTTP → HTTPS: 1회 (Vercel 자동)
- non-www → www: 1회 (vercel.json)

**참고**: HTTP 요청은 자동으로 HTTPS로 리디렉션되므로, 일반적인 경우는 1회의 리디렉션만 발생합니다.

---

## ⚠️ 주의사항

### 1. DNS 전파 시간
- 리디렉션 설정 변경 후 최대 24시간 소요
- 즉시 반영되지 않을 수 있음

### 2. 캐시
- 브라우저 캐시: 리디렉션 정보가 캐시됨
- Google 캐시: Search Console 결과가 지연될 수 있음
- 해결: 시크릿 모드 또는 캐시 비활성화로 테스트

### 3. 환경 변수
- `NEXT_PUBLIC_BASE_URL` 환경 변수가 설정되어 있는지 확인
- 올바른 값: `https://www.gplanworld.com`

### 4. Vercel 배포
- 설정 변경 후 반드시 Vercel에 배포 필요
- 배포 상태 확인: Vercel 대시보드

---

## 🔧 추가 최적화 권장사항

### 1. 리디렉션 로깅

프로덕션 환경에서 리디렉션을 모니터링하려면:

```typescript
// middleware.ts에 로깅 추가 (선택 사항)
if (process.env.NODE_ENV === 'production') {
  console.log(`[Redirect] ${hostname} → ${canonicalDomain}`)
}
```

### 2. 리디렉션 테스트 자동화

CI/CD 파이프라인에 리디렉션 검증 추가:

```bash
#!/bin/bash
# scripts/test-redirects.sh

REDIRECT_COUNT=$(curl -s -o /dev/null -w "%{redirect_count}" -L https://gplanworld.com/)
if [ "$REDIRECT_COUNT" -gt 2 ]; then
  echo "❌ 리디렉션 체인이 너무 깁니다: $REDIRECT_COUNT"
  exit 1
fi
echo "✅ 리디렉션 정상: $REDIRECT_COUNT"
```

### 3. 리디렉션 성능 모니터링

Vercel Analytics에서 리디렉션 성능 추적:
- 리디렉션 시간
- 리디렉션 횟수
- 오류율

---

## 📊 예상 결과

### 정상 동작 시
- ✅ 모든 non-www 요청이 www로 리디렉션
- ✅ 리디렉션 체인 최소화 (최대 2회)
- ✅ 최종 URL에서 HTTP 200 반환
- ✅ Google Search Console에서 리디렉션 오류 없음
- ✅ 페이지 색인 생성 정상

### 문제 발생 시 확인 사항
1. Vercel 배포 상태 확인
2. DNS 설정 확인
3. Vercel 도메인 설정 확인
4. 환경 변수 확인
5. 브라우저 캐시 클리어
6. Google Search Console 캐시 대기 (최대 24시간)

---

## 📝 체크리스트

### 배포 전 검증
- [ ] `vercel.json` 리디렉션 설정 확인
- [ ] `src/middleware.ts` 검증 로직 확인
- [ ] `src/app/not-found.tsx` 404 페이지 확인
- [ ] 환경 변수 설정 확인

### 배포 후 검증
- [ ] cURL로 리디렉션 테스트
- [ ] 리디렉션 체인 확인 (최대 2회)
- [ ] 최종 URL HTTP 200 확인
- [ ] Google Search Console URL 검사
- [ ] 404 페이지 테스트

### 정기 모니터링
- [ ] Google Search Console에서 리디렉션 오류 확인
- [ ] 페이지 색인 생성 상태 확인
- [ ] 리디렉션 성능 모니터링

---

## 📚 참고 자료

- [Vercel Redirects Documentation](https://vercel.com/docs/edge-network/redirects)
- [Next.js Middleware Documentation](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Google Search Console Help - Redirects](https://support.google.com/webmasters/answer/93633)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

---

## ✅ 결론

현재 구현은 다음과 같이 최적화되어 있습니다:

1. ✅ **단일 리디렉션**: non-www → www만 처리
2. ✅ **체인 방지**: Vercel 리디렉션과 Middleware 분리
3. ✅ **404 처리**: Soft 404 방지를 위한 명확한 404 페이지
4. ✅ **검증 로직**: 리디렉션 체인 방지 검증

**다음 단계**: Vercel에 배포 후 실제 동작 확인

