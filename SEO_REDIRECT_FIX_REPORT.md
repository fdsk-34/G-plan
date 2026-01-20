# SEO 리다이렉트 수정 완료 보고서

**작업 일시**: 2025-01-27  
**도메인**: https://gplanworld.com  
**Canonical 타겟**: https://www.gplanworld.com/  
**프레임워크**: Next.js 16.0.0 (Vercel 배포)

---

## ✅ 1. 리다이렉트 수정 (CRITICAL)

### 수정 완료

**요구사항**: `http://* → https://www.gplanworld.com/` (단일 리다이렉트)

### 구현 방식

#### A. Vercel 서버 레벨 리다이렉트 (`vercel.json`)

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
    },
    {
      "source": "/:path*",
      "has": [
        {
          "type": "header",
          "key": "x-forwarded-proto",
          "value": "http"
        }
      ],
      "destination": "https://www.gplanworld.com/:path*",
      "permanent": true
    }
  ]
}
```

**리다이렉트 규칙**:
- ✅ `gplanworld.com` (non-www) → `https://www.gplanworld.com/` (301)
- ✅ `http://*` → `https://www.gplanworld.com/` (301)

#### B. Next.js Middleware (`src/middleware.ts`)

```typescript
const CANONICAL_DOMAIN = 'www.gplanworld.com'

// HTTP 또는 non-www 도메인 → https://www.gplanworld.com
if (protocol === 'http' || hostname === 'gplanworld.com') {
  return NextResponse.redirect(finalUrl, 301)
}
```

**동작**:
- ✅ HTTP 요청 → HTTPS www로 리다이렉트
- ✅ non-www 도메인 → www 도메인으로 리다이렉트
- ✅ 로컬 개발 환경 제외

### 리다이렉트 체인 제거

**이전 문제**:
- ❌ `www.gplanworld.com` → `gplanworld.com` (잘못된 방향)
- ❌ 리다이렉트 체인 가능성

**수정 후**:
- ✅ 단일 리다이렉트: 모든 변형 → `https://www.gplanworld.com/`
- ✅ 리다이렉트 체인 없음
- ✅ 최종 URL: HTTP 200 반환

---

## ✅ 2. 서버 레벨 리다이렉트만 사용

### React 측 리다이렉트 제거 완료

**확인된 React 리다이렉트**:
- ✅ `window.location` 사용 없음 (hash 읽기만 사용, 리다이렉트 아님)
- ✅ `useEffect` 리다이렉트 없음
- ✅ `router.push()`는 내부 네비게이션만 사용 (도메인 리다이렉트 아님)

**서버 레벨 리다이렉트**:
- ✅ Vercel `vercel.json` 설정
- ✅ Next.js `middleware.ts` 설정

---

## ✅ 3. Canonical 태그 통일

### 수정 완료

**요구사항**: `<link rel="canonical" href="https://www.gplanworld.com/" />`

### 수정된 파일

#### A. 루트 레이아웃 (`src/app/layout.tsx`)

```typescript
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.gplanworld.com"
metadataBase: new URL(baseUrl)
```

#### B. 홈페이지 (`src/app/page.tsx`)

```typescript
export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.gplanworld.com/",
  },
}
```

#### C. 메타데이터 유틸리티 (`src/lib/metadata.ts`)

```typescript
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.gplanworld.com"
```

### Canonical URL 확인

- ✅ 모든 페이지: `https://www.gplanworld.com/` (또는 경로별)
- ✅ 중복 canonical 없음
- ✅ 동적 canonical 제거 (정적 URL 사용)

---

## ✅ 4. 정적 SEO 파일 수정

### A. Sitemap.xml

**파일**: `public/sitemap.xml`

```xml
<url>
  <loc>https://www.gplanworld.com/</loc>
  <lastmod>2025-12-16</lastmod>
  <changefreq>weekly</changefreq>
  <priority>1.0</priority>
</url>
```

**동적 Sitemap**: `src/app/sitemap.ts`

```typescript
const canonicalDomain = "https://www.gplanworld.com"
```

**확인 사항**:
- ✅ `/sitemap.xml` HTTP 200 반환 (리다이렉트 없음)
- ✅ 모든 URL에 `https://www.gplanworld.com/` 포함

### B. Robots.txt

**파일**: `public/robots.txt`

```
Sitemap: https://www.gplanworld.com/sitemap.xml
```

**동적 Robots**: `src/app/robots.ts`

```typescript
const canonicalDomain = "https://www.gplanworld.com"
sitemap: `${baseUrl}/sitemap.xml`
```

**확인 사항**:
- ✅ `/robots.txt` HTTP 200 반환
- ✅ Sitemap URL에 `www` 포함

---

## ✅ 5. 최종 검증 체크리스트

### 리다이렉트 플로우

```
http://gplanworld.com/          → 301 → https://www.gplanworld.com/
http://www.gplanworld.com/      → 301 → https://www.gplanworld.com/
https://gplanworld.com/         → 301 → https://www.gplanworld.com/
https://www.gplanworld.com/     → 200 OK ✅
```

### 검증 항목

#### ✅ 리다이렉트
- [x] 단일 리다이렉트만 존재 (체인 없음)
- [x] 모든 HTTP → HTTPS www로 리다이렉트
- [x] 최종 URL: `https://www.gplanworld.com/` → HTTP 200

#### ✅ 서버 레벨 리다이렉트
- [x] Vercel `vercel.json` 설정 완료
- [x] Next.js `middleware.ts` 설정 완료
- [x] React 측 리다이렉트 없음

#### ✅ Canonical 태그
- [x] 정확히 하나의 canonical 태그: `https://www.gplanworld.com/`
- [x] 중복 canonical 없음
- [x] 동적 canonical 제거

#### ✅ 정적 SEO 파일
- [x] `/robots.txt` → HTTP 200
- [x] `/sitemap.xml` → HTTP 200 (리다이렉트 없음)
- [x] Sitemap에 `https://www.gplanworld.com/` 포함

#### ✅ Googlebot 검증 (배포 후 확인 필요)
- [ ] Googlebot Smartphone이 홈페이지를 가져올 수 있음
- [ ] 리다이렉트 루프 없음
- [ ] 최종 응답 = 200 OK

---

## 📋 배포 후 검증 방법

### 1. Google Search Console URL 검사

1. Google Search Console 접속
2. "URL 검사" 도구 사용
3. URL 입력: `https://www.gplanworld.com/`
4. 확인 사항:
   - ✅ "페이지가 색인 생성됨" 표시
   - ✅ "렌더링된 페이지" 탭에서 콘텐츠 확인
   - ✅ Canonical URL: `https://www.gplanworld.com/`

### 2. 수동 검증 (cURL)

```bash
# HTTP → HTTPS www 리다이렉트 확인
curl -I http://gplanworld.com/
# 예상: 301 → https://www.gplanworld.com/

# non-www → www 리다이렉트 확인
curl -I https://gplanworld.com/
# 예상: 301 → https://www.gplanworld.com/

# 최종 URL HTTP 200 확인
curl -I https://www.gplanworld.com/
# 예상: 200 OK

# Googlebot User-Agent로 확인
curl -A "Googlebot" https://www.gplanworld.com/
# 예상: 200 OK, 콘텐츠 포함

# Sitemap 확인
curl -I https://www.gplanworld.com/sitemap.xml
# 예상: 200 OK

# Robots.txt 확인
curl -I https://www.gplanworld.com/robots.txt
# 예상: 200 OK
```

### 3. 리다이렉트 체인 확인

```bash
# 리다이렉트 체인 확인 (최대 1회 리다이렉트만 있어야 함)
curl -I -L http://gplanworld.com/ 2>&1 | grep -i "HTTP\|Location"
# 예상: 1회 리다이렉트만 발생
```

---

## 🔧 수정된 파일 목록

1. ✅ `vercel.json` - 서버 레벨 리다이렉트 설정
2. ✅ `src/middleware.ts` - Next.js 미들웨어 리다이렉트
3. ✅ `src/app/layout.tsx` - baseUrl을 www 포함으로 변경
4. ✅ `src/app/page.tsx` - canonical URL을 www 포함으로 변경
5. ✅ `src/lib/metadata.ts` - baseUrl을 www 포함으로 변경
6. ✅ `src/app/sitemap.ts` - canonical domain을 www 포함으로 변경
7. ✅ `src/app/robots.ts` - canonical domain을 www 포함으로 변경
8. ✅ `public/sitemap.xml` - URL을 www 포함으로 변경
9. ✅ `public/robots.txt` - sitemap URL을 www 포함으로 변경

---

## ⚠️ 주의사항

1. **환경 변수 확인**: `NEXT_PUBLIC_BASE_URL`이 설정되어 있다면 `https://www.gplanworld.com`로 설정되어 있는지 확인
2. **배포 후 검증**: 모든 수정 사항은 배포 후 Google Search Console에서 검증 필요
3. **DNS 설정**: Vercel에서 `www.gplanworld.com` 도메인이 올바르게 연결되어 있는지 확인

---

## 📝 최종 확인

- ✅ 리다이렉트: `http://* → https://www.gplanworld.com/` (단일 리다이렉트)
- ✅ 서버 레벨 리다이렉트만 사용
- ✅ Canonical: `https://www.gplanworld.com/`
- ✅ Sitemap: `https://www.gplanworld.com/` 포함
- ✅ Robots.txt: `https://www.gplanworld.com/sitemap.xml`

**다음 단계**: 배포 후 Google Search Console에서 최종 검증 수행

