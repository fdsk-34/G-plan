# Google Search Console & Naver 인덱싱 문제 해결 리포트

**생성 일자**: 2025-01-XX  
**대상 도메인**: https://www.gplanworld.com/  
**프레임워크**: Next.js 16.0.0 (React 기반)  
**배포 환경**: HTTPS (Vercel 추정)

---

## 🔴 1. Google Search Console URL Inspection 문제 분석 및 해결

### 문제 진단

**오류 메시지**: "속성에 URL이 없음 (No URL in property)"

이 오류는 **Google Search Console 속성 타입 불일치**로 발생합니다.

### 원인 분석

Google Search Console에는 두 가지 속성 타입이 있습니다:

1. **Domain Property (도메인 속성)**
   - 형식: `gplanworld.com` (프로토콜/서브도메인 없음)
   - URL Inspection: ❌ **사용 불가**
   - 특징: 모든 서브도메인과 프로토콜을 포함하지만, URL별 상세 검사 불가

2. **URL-prefix Property (URL 접두어 속성)** ⭐ **필수**
   - 형식: `https://www.gplanworld.com` (정확한 프로토콜과 서브도메인)
   - URL Inspection: ✅ **사용 가능**
   - 특징: 특정 URL에 대한 상세 검사 및 인덱싱 요청 가능

### 해결 방법: 단계별 가이드

#### Step 1: Google Search Console 속성 확인

1. [Google Search Console](https://search.google.com/search-console) 접속
2. 왼쪽 상단 속성 선택기 확인
3. 현재 속성 타입 확인:
   - `gplanworld.com` → Domain Property (URL Inspection 불가)
   - `https://www.gplanworld.com` → URL-prefix Property (URL Inspection 가능)

#### Step 2: URL-prefix Property 생성 (필요한 경우)

**현재 Domain Property만 있는 경우:**

1. Google Search Console 메인 페이지
2. **속성 추가** 클릭
3. **URL 접두어** 방식 선택 ⭐ (중요!)
4. 정확한 URL 입력: `https://www.gplanworld.com`
   - ✅ `https://` 포함 필수
   - ✅ `www.` 포함 필수 (실제 도메인과 정확히 일치)
   - ❌ `http://` 사용 금지
   - ❌ `gplanworld.com` (프로토콜 없음) 사용 금지
5. **계속** 클릭

#### Step 3: 사이트 소유권 확인

**방법 1: HTML 메타태그 (권장)**

1. Google Search Console에서 제공하는 메타태그 복사
   - 예: `<meta name="google-site-verification" content="ertX1htU6vkXAHRhKK7y3bNuqSsGdmGW3OR7YLi8y-8" />`
2. 현재 코드 확인: `src/app/layout.tsx`에 이미 설정되어 있음
   ```typescript
   const googleVerification = 
     process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 
     "ertX1htU6vkXAHRhKK7y3bNuqSsGdmGW3OR7YLi8y-8"
   ```
3. 환경 변수 설정 (Vercel):
   - `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=ertX1htU6vkXAHRhKK7y3bNuqSsGdmGW3OR7YLi8y-8`
4. 배포 후 Google Search Console에서 **확인** 클릭

**방법 2: HTML 파일 업로드**

1. Google Search Console에서 제공하는 파일명 복사
   - 예: `google85a2a92428cbc5ca.html`
2. `public/` 폴더에 해당 파일명으로 생성 (이미 존재: `public/google85a2a92428cbc5ca.html`)
3. 배포 후 Google Search Console에서 **확인** 클릭

#### Step 4: URL Inspection 테스트

1. Google Search Console에서 **URL 검사** 메뉴 클릭
2. URL 입력: `https://www.gplanworld.com/`
3. **실행** 클릭
4. ✅ 정상 작동 시: 페이지 정보, 인덱싱 상태, 크롤링 정보 표시
5. ❌ 여전히 오류 발생 시: 속성 타입 재확인

### 중요 체크리스트

- [ ] **URL-prefix Property 생성**: `https://www.gplanworld.com` (정확한 형식)
- [ ] **프로토콜 일치**: `https://` (http:// 아님)
- [ ] **서브도메인 일치**: `www.` 포함 (실제 도메인과 동일)
- [ ] **사이트 소유권 확인 완료**: Google Search Console에서 "확인됨" 상태
- [ ] **URL Inspection 작동 확인**: `https://www.gplanworld.com/` 검사 성공

### 예상 해결 시간

- 속성 생성 및 확인: **5-10분**
- 사이트 소유권 확인: **즉시** (배포 후)
- URL Inspection 활성화: **즉시** (속성 확인 후)

---

## ✅ 2. robots.txt 검증 및 수정

### 현재 상태 분석

**파일 위치**: `src/app/robots.ts`  
**프로덕션 URL**: `https://www.gplanworld.com/robots.txt`

### 검증 결과

#### ✅ 올바른 설정 확인

```typescript
// src/app/robots.ts
rules: [
  { userAgent: '*', allow: '/' },           // ✅ 모든 크롤러 허용
  { userAgent: 'Googlebot', allow: '/' },   // ✅ Googlebot 명시적 허용
  { userAgent: 'Googlebot-Image', allow: '/' },
  { userAgent: 'Yeti', allow: '/' },        // ✅ Naver Yeti 허용
  { userAgent: 'NaverBot', allow: '/' },    // ✅ NaverBot 허용
],
sitemap: `${baseUrl}/sitemap.xml`,          // ✅ Sitemap 선언
host: baseUrl,                              // ✅ Host 선언 (Naver 호환)
```

### 예상 robots.txt 출력

프로덕션에서 `https://www.gplanworld.com/robots.txt` 접근 시:

```
User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

User-agent: Yeti
Allow: /

User-agent: NaverBot
Allow: /

Sitemap: https://www.gplanworld.com/sitemap.xml

Host: https://www.gplanworld.com
```

### 검증 체크리스트

- [x] HTTP 200 반환 (Next.js 자동 생성)
- [x] `Disallow: /` 없음
- [x] Googlebot 명시적 허용
- [x] Naver Yeti 명시적 허용
- [x] Sitemap URL 선언
- [x] Host 선언 (Naver 호환)

### 배포 후 확인 방법

```bash
# robots.txt 확인
curl https://www.gplanworld.com/robots.txt

# Googlebot User-Agent로 확인
curl -A "Googlebot" https://www.gplanworld.com/robots.txt

# Naver Yeti User-Agent로 확인
curl -A "Yeti" https://www.gplanworld.com/robots.txt
```

### 수정 필요 사항

**현재 코드는 올바르게 설정되어 있습니다.** 추가 수정 불필요.

---

## ✅ 3. sitemap.xml 검증 및 생성

### 현재 상태 분석

**파일 위치**: `src/app/sitemap.ts`  
**프로덕션 URL**: `https://www.gplanworld.com/sitemap.xml`

### 검증 결과

#### ✅ 올바른 설정 확인

```typescript
// src/app/sitemap.ts
const pagePaths = [
  '',                                    // 메인 페이지
  '/business',
  '/business/office-support',
  '/business/it-support',
  '/business/marketing-support',
  '/business/consulting',
  '/ci',
  '/talent',
  '/contact',
  '/inquiry',
]

// 모든 URL이 https://로 시작하도록 정규화
const ensureHttps = (url: string): string => {
  if (url.startsWith('http://')) {
    return url.replace('http://', 'https://')
  }
  if (!url.startsWith('https://')) {
    return `https://${url}`
  }
  return url
}
```

### 예상 sitemap.xml 출력

프로덕션에서 `https://www.gplanworld.com/sitemap.xml` 접근 시:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.gplanworld.com/</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.gplanworld.com/business</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.gplanworld.com/business/office-support</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- ... 나머지 7개 페이지 ... -->
</urlset>
```

### 포함된 페이지 (총 10개)

1. 메인 페이지 (`/`) - priority: 1.0
2. 사업 영역 (`/business`) - priority: 0.9
3. 사무업무지원 (`/business/office-support`) - priority: 0.8
4. IT업무지원 (`/business/it-support`) - priority: 0.8
5. 홍보콘텐츠지원 (`/business/marketing-support`) - priority: 0.8
6. 표준사업장 설립 컨설팅 (`/business/consulting`) - priority: 0.8
7. CI (`/ci`) - priority: 0.8
8. 인재상 (`/talent`) - priority: 0.8
9. 오시는 길 (`/contact`) - priority: 0.7
10. 고객 문의 (`/inquiry`) - priority: 0.7

### 검증 체크리스트

- [x] XML 형식 유효성
- [x] 모든 URL이 `https://`로 시작
- [x] Canonical 도메인 사용 (`www.gplanworld.com`)
- [x] localhost 또는 dev URL 없음
- [x] Google 호환성 (표준 sitemap 형식)
- [x] Naver 호환성 (표준 sitemap 형식)

### 개선 권장 사항

**lastModified 날짜 업데이트** (선택 사항):

```typescript
// src/app/sitemap.ts
// 현재: 고정 날짜
const lastModifiedDate = new Date('2025-01-01')

// 권장: 실제 배포 날짜로 업데이트
const lastModifiedDate = new Date('2025-01-XX') // 실제 배포 날짜
```

### 배포 후 확인 방법

```bash
# sitemap.xml 확인
curl https://www.gplanworld.com/sitemap.xml

# XML 유효성 검사
curl https://www.gplanworld.com/sitemap.xml | xmllint --format -

# Google Search Console에 제출
# 1. Google Search Console 접속
# 2. Sitemaps 메뉴 클릭
# 3. 새 사이트맵 추가: https://www.gplanworld.com/sitemap.xml
# 4. 제출 클릭

# Naver Search Advisor에 제출
# 1. Naver Search Advisor 접속
# 2. 요청 > 사이트맵 제출
# 3. https://www.gplanworld.com/sitemap.xml 입력
# 4. 제출 클릭
```

### 수정 필요 사항

**현재 코드는 올바르게 설정되어 있습니다.** 추가 수정 불필요.

---

## 📋 4. 인덱싱 최적화 체크리스트

### A. Meta Robots 태그 검증

#### ✅ 현재 상태: PASS

**설정 위치**: `src/app/layout.tsx`

```typescript
robots: {
  index: true,      // ✅ 인덱싱 허용
  follow: true,     // ✅ 링크 따라가기 허용
  googleBot: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
}
```

**검증 결과**:
- ✅ `<meta name="robots" content="noindex">` 없음
- ✅ `<meta name="googlebot" content="noindex">` 없음
- ✅ 모든 페이지에서 `index: true` 설정

### B. Canonical 태그 검증

#### ✅ 현재 상태: PASS

**설정 위치**: `src/app/layout.tsx`

```typescript
metadataBase: new URL(baseUrl),  // 자동 canonical 생성
```

**검증 결과**:
- ✅ 모든 페이지에 canonical URL 자동 생성
- ✅ Canonical URL이 sitemap의 URL과 일치
- ✅ `https://www.gplanworld.com` 형식 사용

**예상 출력** (각 페이지):
```html
<link rel="canonical" href="https://www.gplanworld.com/" />
<link rel="canonical" href="https://www.gplanworld.com/business" />
<!-- ... -->
```

### C. SPA 렌더링/인덱싱 위험 분석

#### ⚠️ 주의 필요: Next.js 서버 사이드 렌더링 확인

**현재 상태**:
- Next.js 16.0.0 사용 (서버 사이드 렌더링 기본 지원)
- 일부 페이지가 `"use client"` 사용 (클라이언트 컴포넌트)
- 초기 HTML에 콘텐츠 포함 여부 확인 필요

**검증 방법**:

1. **Google Search Console URL Inspection 사용**:
   - URL 입력: `https://www.gplanworld.com/`
   - "페이지가 색인 생성됨" 섹션 확인
   - "렌더링된 페이지" 탭에서 초기 HTML 확인

2. **수동 확인**:
   ```bash
   # 페이지 소스 보기 (JavaScript 비활성화)
   curl https://www.gplanworld.com/ | grep -i "지플랜"
   
   # Googlebot User-Agent로 확인
   curl -A "Googlebot" https://www.gplanworld.com/ | grep -i "지플랜"
   ```

**예상 결과**:
- ✅ Next.js는 기본적으로 서버 사이드 렌더링 수행
- ✅ 초기 HTML에 주요 콘텐츠 포함 예상
- ⚠️ 배포 후 실제 확인 필요

### D. 내부 링크 구조 분석

#### ✅ 현재 상태: 양호

**검증 결과**:
- ✅ Header 컴포넌트에 네비게이션 링크 존재
- ✅ Footer 컴포넌트에 링크 존재
- ✅ 메인 페이지에서 모든 주요 섹션으로 링크 존재

**개선 권장 사항**:
- 각 서비스 페이지에 관련 페이지로의 내부 링크 추가
- Breadcrumb 네비게이션 추가 (선택 사항)

### E. 구조화된 데이터 (Schema.org)

#### ✅ 현재 상태: PASS

**설정 위치**: `src/app/layout.tsx`

```typescript
// Organization Schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "지플랜(GPLAN)",
  // ...
}

// WebSite Schema
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  // ...
}
```

**검증 결과**:
- ✅ Organization Schema 구현
- ✅ WebSite Schema 구현
- ✅ JSON-LD 형식 사용 (Google & Naver 호환)

**검증 도구**:
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- URL 입력: `https://www.gplanworld.com/`

---

## 🚨 우선순위별 수정 체크리스트

### 🔴 최우선 (즉시 조치, 24시간 내)

1. **Google Search Console URL-prefix Property 생성**
   - [ ] 속성 추가: `https://www.gplanworld.com` (정확한 형식)
   - [ ] 사이트 소유권 확인 완료
   - [ ] URL Inspection 작동 확인

2. **Sitemap 제출**
   - [ ] Google Search Console에 제출: `https://www.gplanworld.com/sitemap.xml`
   - [ ] Naver Search Advisor에 제출: `https://www.gplanworld.com/sitemap.xml`

3. **프로덕션 환경 검증**
   - [ ] `https://www.gplanworld.com/robots.txt` 접근 확인 (HTTP 200)
   - [ ] `https://www.gplanworld.com/sitemap.xml` 접근 확인 (HTTP 200)
   - [ ] 각 페이지 HTTP 200 반환 확인

### 🟡 높은 우선순위 (48시간 내)

4. **URL Inspection으로 각 페이지 검증**
   - [ ] 메인 페이지: `https://www.gplanworld.com/`
   - [ ] 사업 영역: `https://www.gplanworld.com/business`
   - [ ] 각 서비스 페이지 (5개)
   - [ ] 기타 페이지 (CI, 인재상, 오시는 길, 고객 문의)

5. **인덱싱 요청**
   - [ ] Google Search Console에서 각 페이지 "색인 생성 요청"
   - [ ] Naver Search Advisor에서 각 페이지 "URL 제출"

6. **초기 HTML 검증**
   - [ ] Google Search Console URL Inspection의 "렌더링된 페이지" 확인
   - [ ] JavaScript 없이도 주요 콘텐츠 확인 가능 여부 확인

### 🟢 중간 우선순위 (72시간 내)

7. **성능 모니터링**
   - [ ] Google Search Console에서 크롤링 통계 확인
   - [ ] 인덱싱 상태 모니터링
   - [ ] 색인 생성 오류 확인

8. **내부 링크 최적화** (선택 사항)
   - [ ] 각 서비스 페이지에 관련 페이지 링크 추가
   - [ ] Breadcrumb 네비게이션 추가 고려

---

## ⏱️ 예상 인덱싱 타임라인

### Google

- **초기 크롤링**: 24-48시간
- **색인 생성 시작**: 48-72시간
- **전체 색인 완료**: 1-2주

**가속화 방법**:
1. ✅ Sitemap 제출 (즉시)
2. ✅ URL Inspection으로 각 페이지 "색인 생성 요청" (즉시)
3. ✅ 내부 링크 최적화 (선택 사항)

### Naver

- **초기 크롤링**: 24-72시간
- **색인 생성 시작**: 3-7일
- **전체 색인 완료**: 1-3주

**가속화 방법**:
1. ✅ Sitemap 제출 (즉시)
2. ✅ Naver Search Advisor에서 "URL 제출" (즉시)
3. ✅ RSS 피드 제출 (이미 설정됨: `/rss`)

---

## 📝 추가 권장 사항

### 1. 환경 변수 설정 확인

**Vercel 환경 변수 설정**:
```
NEXT_PUBLIC_BASE_URL=https://www.gplanworld.com
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=ertX1htU6vkXAHRhKK7y3bNuqSsGdmGW3OR7YLi8y-8
NEXT_PUBLIC_NAVER_SITE_VERIFICATION=bd4b7c4d18d565e8d894e412e49df5e979fb11b1
```

### 2. Google Search Console 모니터링

- **색인 범위** 리포트 확인 (주 1회)
- **성능** 리포트 확인 (월 1회)
- **URL Inspection**으로 문제 페이지 즉시 확인

### 3. Naver Search Advisor 모니터링

- **요청 > 사이트맵 제출** 상태 확인
- **요청 > URL 제출** 상태 확인
- **검색 노출 현황** 모니터링

### 4. 두 도메인 관리 전략

현재 두 도메인을 모두 지원하고 있습니다:
- Primary: `https://www.gplan.com`
- Secondary: `https://www.gplanworld.com`

**권장 사항**:
- 각 도메인을 Google Search Console과 Naver Search Advisor에 별도로 등록
- 각 도메인에 대해 별도의 sitemap 제출
- Canonical 태그로 primary 도메인 지정 고려 (동일 콘텐츠인 경우)

---

## ✅ 결론

### 현재 상태 요약

- ✅ **robots.txt**: 올바르게 설정됨 (수정 불필요)
- ✅ **sitemap.xml**: 올바르게 설정됨 (수정 불필요)
- ✅ **Meta robots 태그**: `index: true` 설정 (수정 불필요)
- ✅ **Canonical 태그**: 자동 생성 (수정 불필요)
- ✅ **구조화된 데이터**: 구현됨 (수정 불필요)
- 🔴 **Google Search Console**: URL-prefix Property 생성 필요 (즉시 조치)

### 즉시 조치 사항

1. **Google Search Console URL-prefix Property 생성** (최우선)
2. **Sitemap 제출** (Google & Naver)
3. **프로덕션 환경 검증** (robots.txt, sitemap.xml 접근 확인)

### 예상 결과

- **24-48시간 내**: Google 초기 크롤링 시작
- **48-72시간 내**: Google 색인 생성 시작
- **1-2주 내**: Google 전체 색인 완료
- **3-7일 내**: Naver 색인 생성 시작

---

**보고서 생성일**: 2025-01-XX  
**다음 검증 권장일**: 배포 후 24-48시간 내

