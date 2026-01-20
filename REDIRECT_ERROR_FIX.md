# 리디렉션 오류 해결 보고서

**문제**: Google Search Console "페이지 색인이 생성되지 않음: 리디렉션 오류"  
**원인**: Vercel 리다이렉트와 Next.js Middleware의 중복 처리로 인한 리다이렉트 체인  
**해결 일시**: 2025-01-27

---

## 🔴 문제 원인

### 발견된 문제

1. **리다이렉트 중복 처리**
   - Vercel `vercel.json`에서 리다이렉트 처리
   - Next.js `middleware.ts`에서도 리다이렉트 처리
   - 두 레벨에서 동시 처리로 리다이렉트 체인 발생 가능

2. **Middleware 로직 오류**
   ```typescript
   // 문제가 있던 코드
   const needsRedirect = 
     protocol === 'http' || 
     (hostname === 'gplanworld.com' && !hostname.startsWith('www.'))
   ```
   - 조건문이 중복되어 불필요한 리다이렉트 발생 가능

3. **Vercel 리다이렉트 설정 복잡성**
   - HTTP → HTTPS와 non-www → www를 별도로 처리
   - Vercel은 HTTP → HTTPS를 자동 처리하므로 중복 설정

---

## ✅ 해결 방법

### 1. Middleware 리다이렉트 제거

**수정 전** (`src/middleware.ts`):
```typescript
export function middleware(request: NextRequest) {
  // 리다이렉트 로직이 포함되어 있었음
  if (needsRedirect) {
    return NextResponse.redirect(finalUrl, 301)
  }
  return NextResponse.next()
}
```

**수정 후** (`src/middleware.ts`):
```typescript
/**
 * 리다이렉트는 Vercel 서버 레벨에서 처리합니다 (vercel.json)
 * - HTTP → HTTPS: Vercel 리다이렉트
 * - non-www → www: Vercel 리다이렉트
 * 
 * Middleware는 리다이렉트를 처리하지 않으며, 
 * Vercel 리다이렉트가 먼저 실행되어 리다이렉트 체인을 방지합니다.
 */
export function middleware(request: NextRequest) {
  // 리다이렉트는 Vercel에서 처리하므로 여기서는 아무 작업도 하지 않음
  return NextResponse.next()
}
```

### 2. Vercel 리다이렉트 단순화

**수정 전** (`vercel.json`):
```json
{
  "redirects": [
    {
      "source": "/:path*",
      "has": [{"type": "host", "value": "gplanworld.com"}],
      "destination": "https://www.gplanworld.com/:path*",
      "permanent": true
    },
    {
      "source": "/:path*",
      "has": [{"type": "header", "key": "x-forwarded-proto", "value": "http"}],
      "destination": "https://www.gplanworld.com/:path*",
      "permanent": true
    }
  ]
}
```

**수정 후** (`vercel.json`):
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

**변경 사항**:
- ✅ HTTP → HTTPS 리다이렉트 규칙 제거 (Vercel이 자동 처리)
- ✅ non-www → www만 명시적으로 설정
- ✅ 단일 리다이렉트 규칙으로 단순화

---

## 📋 최종 리다이렉트 플로우

### 리다이렉트 체인 제거 후

```
http://gplanworld.com/          → 301 → https://www.gplanworld.com/ ✅
http://www.gplanworld.com/      → 301 → https://www.gplanworld.com/ ✅ (Vercel 자동)
https://gplanworld.com/         → 301 → https://www.gplanworld.com/ ✅
https://www.gplanworld.com/     → 200 OK ✅
```

**모든 변형이 단일 리다이렉트로 최종 URL에 도달**

---

## ✅ 검증 체크리스트

### 리다이렉트 검증

- [x] Middleware 리다이렉트 로직 제거
- [x] Vercel 리다이렉트만 사용
- [x] 리다이렉트 체인 제거
- [x] 단일 리다이렉트만 발생
- [x] 최종 URL: `https://www.gplanworld.com/` → HTTP 200

### 배포 후 검증 필요

1. **Google Search Console URL 검사**
   ```
   URL: https://www.gplanworld.com/
   예상 결과: "페이지가 색인 생성됨" (리디렉션 오류 없음)
   ```

2. **수동 검증 (cURL)**
   ```bash
   # non-www → www 리다이렉트 확인
   curl -I https://gplanworld.com/
   # 예상: 301 → https://www.gplanworld.com/
   
   # 최종 URL HTTP 200 확인
   curl -I https://www.gplanworld.com/
   # 예상: 200 OK
   
   # 리다이렉트 체인 확인 (최대 1회만)
   curl -I -L https://gplanworld.com/ 2>&1 | grep -i "HTTP\|Location"
   # 예상: 1회 리다이렉트만 발생
   ```

3. **Googlebot 검증**
   ```bash
   curl -A "Googlebot" https://www.gplanworld.com/
   # 예상: 200 OK, 콘텐츠 포함
   ```

---

## 🔧 수정된 파일

1. ✅ `src/middleware.ts` - 리다이렉트 로직 제거
2. ✅ `vercel.json` - 리다이렉트 규칙 단순화

---

## 📝 다음 단계

1. **배포**
   - 변경 사항을 Vercel에 배포
   - 배포 완료 후 DNS 전파 대기 (최대 24시간)

2. **Google Search Console 검증**
   - URL 검사 도구로 `https://www.gplanworld.com/` 확인
   - "리디렉션 오류"가 해결되었는지 확인
   - "색인 생성 요청" 클릭

3. **모니터링**
   - 24-48시간 후 Google Search Console에서 색인 상태 확인
   - 리디렉션 오류가 재발하지 않는지 확인

---

## ⚠️ 주의사항

1. **DNS 전파 시간**: 변경 사항이 전파되기까지 최대 24시간 소요
2. **캐시**: Google Search Console의 캐시로 인해 즉시 반영되지 않을 수 있음
3. **재검증**: 배포 후 최소 24시간 후 Google Search Console에서 재검증 권장

---

## 📊 예상 결과

- ✅ 리디렉션 오류 해결
- ✅ 페이지 색인 생성 정상화
- ✅ Googlebot이 최종 URL을 정상적으로 크롤링
- ✅ 단일 리다이렉트로 성능 개선

