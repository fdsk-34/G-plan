# Google Search Central SEO 설정 가이드

## 📋 목차
1. [현재 설정 완료 항목](#설정-완료-항목)
2. [Google Search Console 인증 방법](#google-search-console-인증-방법)
3. [SEO 설정 상세 분석](#seo-설정-상세-분석)
4. [검색엔진 최적화 체크리스트](#검색엔진-최적화-체크리스트)
5. [배포 후 확인 사항](#배포-후-확인-사항)
6. [추가 최적화 권장사항](#추가-최적화-권장사항)

---

## ✅ 설정 완료 항목

### 1. Google Search Console 인증 메타태그
**위치**: `src/app/layout.tsx` (라인 19-21, 132)

```19:21:src/app/layout.tsx
const googleVerification = 
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 
  "ertX1htU6vkXAHRhKK7y3bNuqSsGdmGW3OR7YLi8y-8"
```

**현재 상태**:
- ✅ Google Search Console 인증 메타태그 구현 완료
- ✅ 환경 변수 지원 (`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`)
- ✅ 기본값으로 인증 코드 설정됨: `ertX1htU6vkXAHRhKK7y3bNuqSsGdmGW3OR7YLi8y-8`

**메타태그 적용 위치**:
```130:134:src/app/layout.tsx
  other: {
    "naver-site-verification": naverVerification,
    "google-site-verification": googleVerification,
    "format-detection": "telephone=no, email=no, address=no",
  },
```

---

### 2. robots.txt 최적화
**위치**: `src/app/robots.ts`

**현재 설정**:
- ✅ Googlebot 명시적 허용
- ✅ Googlebot-Image 명시적 허용
- ✅ Bingbot 허용
- ✅ 네이버 검색로봇 (Yeti, NaverBot) 허용
- ✅ Sitemap 자동 포함

```14:50:src/app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // 모든 검색엔진 봇 허용
      {
        userAgent: '*',
        allow: '/',
      },
      // Google 검색엔진
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      // Google 이미지 검색엔진
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
      },
      // Bing 검색엔진
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
      // 네이버 검색엔진 (Yeti)
      {
        userAgent: 'Yeti',
        allow: '/',
      },
      // 네이버 검색엔진 (NaverBot)
      {
        userAgent: 'NaverBot',
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
```

**접근 URL**: `https://www.gplanworld.com/robots.txt`

---

### 3. Sitemap 설정
**위치**: `src/app/sitemap.ts`

**현재 구성**:
- ✅ 메인 페이지 (priority: 1.0, changeFrequency: weekly)
- ✅ 비즈니스 메인 페이지 (priority: 0.9, changeFrequency: weekly)
- ✅ 서비스 페이지들 (priority: 0.8, changeFrequency: monthly)
  - `/business/office-support`
  - `/business/it-support`
  - `/business/marketing-support`
  - `/business/consulting`
- ✅ 회사 정보 페이지들 (priority: 0.7, changeFrequency: monthly)
  - `/ci`
  - `/talent`
  - `/contact`
  - `/inquiry`
- ✅ 영문 페이지 (priority: 0.9, changeFrequency: weekly)
  - `/en`

```7:80:src/app/sitemap.ts
export default function sitemap(): MetadataRoute.Sitemap {
  // Canonical URL: www.gplanworld.com (vercel.json에서 non-www를 www로 리다이렉트)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.gplanworld.com"

  return [
    // Google SEO: 메인 페이지 (최우선)
    // priority: 1.0 (최고 우선순위) - Google이 가장 중요하게 인식하는 페이지
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',  // 주간 업데이트 빈도
      priority: 1,                 // 최고 우선순위
    },
    // Google SEO: 비즈니스 메인 페이지 (높은 우선순위)
    {
      url: `${baseUrl}/business`,
      lastModified: new Date(),
      changeFrequency: 'weekly',  // 주간 업데이트
      priority: 0.9,              // 높은 우선순위
    },
    // Google SEO: 서비스 페이지들 (중간 우선순위)
    // changeFrequency와 priority는 Google이 크롤링 빈도를 결정하는 데 도움이 됩니다
    {
      url: `${baseUrl}/business/office-support`,
      lastModified: new Date(),
      changeFrequency: 'monthly',  // 월간 업데이트
      priority: 0.8,                // 중간 우선순위
    },
    {
      url: `${baseUrl}/business/it-support`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/business/marketing-support`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/business/consulting`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // 회사 정보 페이지들
    {
      url: `${baseUrl}/ci`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/talent`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // ⭐ Google SEO: 연락처 및 문의 페이지 (낮은 우선순위)
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,  // 낮은 우선순위
    },
    {
      url: `${baseUrl}/inquiry`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Google SEO: 영문 페이지 (다국어 지원)
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'weekly',  // 주간 업데이트
      priority: 0.9,              // 높은 우선순위 (메인 페이지와 동일)
    },
  ]
}
```

**접근 URL**: `https://www.gplanworld.com/sitemap.xml`

---

### 4. 구조화된 데이터 (Schema.org)
**위치**: `src/app/layout.tsx` (라인 160-225)

**구현된 스키마**:

#### Organization Schema
```160:198:src/app/layout.tsx
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "지플랜(GPLAN)",
    alternateName: ["지플랜", "GPLAN"],
    description:
      "지플랜(GPLAN)은 장애인 표준사업장으로, 함께 성장하고 행복을 나누는 일터를 만들어갑니다. | GPLAN is a certified standard workplace for people with disabilities, providing IT and office support services.",
    url: baseUrl,
    logo: `${baseUrl}/favicon.png`,
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["Korean"],
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "KR",
    },
    areaServed: {
      "@type": "Country",
      name: "South Korea",
    },
    serviceType: [
      "지플랜",
      "GPLAN",
      "지플랜(GPLAN)",
      "RPA",
      "장애인 표준사업장",
      "사무업무지원",
      "IT업무지원",
      "홍보콘텐츠지원",
      "표준사업장 설립 컨설팅",
      "IT Support",
      "Office Management",
      "Marketing Content Creation",
      "Disability Employment Consulting",      
    ],
  }
```

#### WebSite Schema
```200:225:src/app/layout.tsx
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "지플랜(GPLAN)",
    alternateName: ["지플랜", "GPLAN"],
    url: baseUrl,
    description:
      "지플랜(GPLAN)은 장애인 표준사업장으로, 함께 성장하고 행복을 나누는 일터를 만들어갑니다. | GPLAN is a certified standard workplace for people with disabilities, providing IT and office support services.",
    publisher: {
      "@type": "Organization",
      name: "지플랜(GPLAN)",
      alternateName: ["지플랜", "GPLAN"],
      logo: `${baseUrl}/favicon.png`,
    },
    inLanguage: ["ko-KR", "en-US"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
```

**JSON-LD 적용**:
```243:255:src/app/layout.tsx
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(organizationSchema),
              }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(websiteSchema),
              }}
            />
```

**검증 도구**: [Google Rich Results Test](https://search.google.com/test/rich-results)

---

### 5. SEO 메타데이터 개선
**위치**: `src/app/layout.tsx` (라인 24-150)

**구현된 메타데이터**:

#### 기본 메타데이터
```24:49:src/app/layout.tsx
export const metadata: Metadata = {
  title: "지플랜(GPLAN) - 행복한 일터를 만드는 기업 Creating a Happy Workplace Together",
  description:
    "지플랜(GPLAN)은 장애인 표준사업장으로, 함께 성장하고 행복을 나누는 일터를 만들어갑니다. | GPLAN is a certified standard workplace for people with disabilities, providing IT and office support services.",
  generator: "v0.app",
  keywords: [
    "지플랜",
    "GPLAN",
    "지플랜(GPLAN)",
    "RPA",
    "장애인 표준사업장",
    "사무업무지원",
    "IT업무지원",
    "홍보콘텐츠지원",
    "표준사업장 설립 컨설팅",
    "Standard workplace for the disabled",
    "IT support services",
    "BPO Korea",
    "Social enterprise",
    "Inclusive workplace",
    "Office support outsourcing"
  ],
  authors: [{ name: "지플랜(GPLAN)" }],
  creator: "지플랜(GPLAN)",
  publisher: "지플랜(GPLAN)",
```

#### Canonical URL 설정
```50:60:src/app/layout.tsx
  // 기본 URL 및 Canonical URL 설정
  // metadataBase를 설정하면 각 페이지에서 자동으로 canonical URL이 생성됩니다
  metadataBase: new URL(baseUrl),
  alternates: {
    // canonical은 각 페이지에서 자동으로 생성되므로 루트 레이아웃에서는 제거
    // 각 페이지의 경로가 자동으로 canonical URL이 됩니다
    types: {
      "application/rss+xml": `${baseUrl}/rss`, // RSS 피드 링크 (네이버 서치어드바이저용)
    },
    // NOTE: hreflang은 페이지별(/en 포함)로 정확히 설정해야 하므로 전역에서는 제거합니다.
  },
```

#### Open Graph 메타태그
```88:105:src/app/layout.tsx
  // Open Graph - 소셜 미디어 공유 최적화
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: baseUrl,
    title: "지플랜(GPLAN) - 행복한 일터를 만드는 기업 Creating a Happy Workplace Together",
    description:
      "지플랜(GPLAN)은 장애인 표준사업장으로, 함께 성장하고 행복을 나누는 일터를 만들어갑니다. | GPLAN is a certified standard workplace for people with disabilities, providing IT and office support services.",
    siteName: "지플랜(GPLAN)",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "지플랜(GPLAN) 로고",
      },
    ],
  },
```

#### Twitter Card 메타태그
```107:114:src/app/layout.tsx
  // Twitter Card - 트위터 공유 최적화
  twitter: {
    card: "summary_large_image",
    title: "지플랜(GPLAN) - 행복한 일터를 만드는 기업 Creating a Happy Workplace Together",
    description:
      "지플랜(GPLAN)은 장애인 표준사업장으로, 함께 성장하고 행복을 나누는 일터를 만들어갑니다. | GPLAN is a certified standard workplace for people with disabilities, providing IT and office support services.",
    images: [`${baseUrl}/og-image.png`],
  },
```

#### Robots 메타태그
```116:127:src/app/layout.tsx
  // Robots 메타태그 - 검색엔진 크롤링 제어
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
```

#### Viewport 및 Theme Color
```136:145:src/app/layout.tsx
  // 모바일 최적화 설정
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  category: "business",
```

---

### 6. RSS 피드 설정
**위치**: `src/app/rss/route.ts`

**현재 구성**:
- ✅ RSS 2.0 형식 구현
- ✅ 네이버 서치어드바이저용 최적화
- ✅ 주요 페이지 포함
- ✅ 자동 캐싱 설정

**접근 URL**: `https://www.gplanworld.com/rss`

**메타데이터 연결**:
```56:59:src/app/layout.tsx
    types: {
      "application/rss+xml": `${baseUrl}/rss`, // RSS 피드 링크 (네이버 서치어드바이저용)
    },
```

---

### 7. 페이지별 메타데이터 관리
**위치**: `src/lib/metadata.ts`

**기능**:
- ✅ Self-referencing canonical URL 자동 생성
- ✅ 페이지별 메타데이터 생성 함수
- ✅ Open Graph 및 Twitter Card 자동 설정
- ✅ Robots 기본값 설정 (index, follow)

**사용 예시** (홈페이지):
```8:13:src/app/page.tsx
export const metadata: Metadata = generatePageMetadata({
  title: "지플랜(GPLAN) - 행복한 일터를 만드는 기업 | 장애인 표준사업장",
  description: "지플랜(GPLAN)은 장애인 표준사업장으로, 함께 성장하고 행복을 나누는 일터를 만들어갑니다. 사무업무지원, IT업무지원, 홍보콘텐츠지원, 표준사업장 설립 컨설팅 서비스를 제공합니다.",
  path: '/',
  keywords: ['지플랜', 'GPLAN', '장애인 표준사업장', '사무업무지원', 'IT업무지원', '홍보콘텐츠지원', '표준사업장 설립 컨설팅'],
})
```

---

### 8. 미들웨어 SEO 최적화
**위치**: `src/middleware.ts`

**기능**:
- ✅ Trailing slash 통일 (제거)
- ✅ 301 Permanent Redirect 적용
- ✅ 정적 파일 및 API 경로 제외

```15:34:src/middleware.ts
export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const { pathname, search } = request.nextUrl
  
  // Canonical 도메인 (www 기준으로 통일)
  const canonicalDomain = 'www.gplanworld.com'
  
  // 리디렉션은 Vercel에서 처리하므로 여기서는 검증만 수행
  // Trailing slash 통일 처리 (trailing slash 제거)
  // 단, 루트 경로(/)는 제외하고, 정적 파일 및 API 경로도 제외
  if (pathname !== '/' && pathname.endsWith('/')) {
    // Trailing slash 제거하여 리다이렉트
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(0, -1)
    url.search = search
    return NextResponse.redirect(url, 301) // 301 Permanent Redirect
  }
  
  return NextResponse.next()
}
```

---

## 🔐 Google Search Console 인증 방법

### 방법 1: HTML 메타태그 (권장) ✅ 현재 적용됨

**현재 상태**: 이미 구현되어 있음

**사용 방법**:
1. [Google Search Console](https://search.google.com/search-console)에 접속
2. 속성 추가 → **URL 접두어** 방식 선택
3. 사이트 URL 입력: `https://www.gplanworld.com` (또는 `https://gplanworld.com`)
4. **HTML 태그** 방식 선택
5. 제공된 메타태그 코드를 복사
   - 예: `<meta name="google-site-verification" content="YOUR_CODE_HERE" />`
6. 환경 변수 파일에 추가:
   ```env
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=YOUR_CODE_HERE
   ```
7. 배포 후 Google Search Console에서 "확인" 버튼 클릭

**현재 기본값**: `ertX1htU6vkXAHRhKK7y3bNuqSsGdmGW3OR7YLi8y-8`

---

### 방법 2: HTML 파일 업로드

**사용 방법**:
1. Google Search Console에서 **HTML 파일** 업로드 방식 선택
2. 제공된 파일명을 복사 (예: `google85a2a92428cbc5ca.html`)
3. `public/` 폴더에 해당 파일명으로 HTML 파일 생성
4. 파일 내용: `google-site-verification: YOUR_CODE_HERE`

**현재 파일**: `public/google85a2a92428cbc5ca.html` (이미 존재)

---

### 방법 3: DNS 레코드 추가

**사용 방법**:
1. Google Search Console에서 **DNS 레코드** 방식 선택
2. 제공된 TXT 레코드를 DNS에 추가
3. DNS 전파 대기 (보통 몇 시간 소요)
4. Google Search Console에서 "확인" 버튼 클릭

---

## 📊 SEO 설정 상세 분석

### Canonical URL 전략
- **기본 도메인**: `https://www.gplanworld.com`
- **자동 생성**: 각 페이지에서 self-referencing canonical URL 자동 생성
- **구현 위치**: `src/lib/metadata.ts`의 `generatePageMetadata` 함수

### 검색엔진 크롤링 설정
- **Googlebot**: 명시적 허용, 이미지 크롤링 허용
- **네이버**: Yeti, NaverBot 명시적 허용
- **Bing**: Bingbot 허용
- **모든 봇**: 기본적으로 허용 (`userAgent: '*'`)

### 페이지 우선순위 전략
- **최우선 (1.0)**: 메인 페이지 (`/`)
- **높은 우선순위 (0.9)**: 비즈니스 메인 (`/business`)
- **중간 우선순위 (0.8)**: 서비스 페이지들
- **낮은 우선순위 (0.7)**: 회사 정보 및 연락처 페이지

### 업데이트 빈도 전략
- **주간**: 메인 페이지, 비즈니스 메인 페이지
- **월간**: 서비스 페이지, 회사 정보 페이지

---

## ✅ 검색엔진 최적화 체크리스트

### 기본 SEO 설정
- [x] Google Search Console 인증 메타태그
- [x] robots.txt 최적화
- [x] Sitemap.xml 생성 및 설정
- [x] 구조화된 데이터 (Schema.org) 구현
- [x] Canonical URL 설정
- [x] 메타데이터 최적화 (title, description, keywords)
- [x] Open Graph 메타태그
- [x] Twitter Card 메타태그
- [x] Viewport 설정
- [x] Theme Color 설정
- [x] RSS 피드 생성

### 기술적 SEO
- [x] HTTPS 리다이렉트 (Vercel 자동 처리)
- [x] www/non-www 통일 (Vercel 리다이렉트)
- [x] Trailing slash 통일 (미들웨어 처리)
- [x] 301 Permanent Redirect 적용
- [x] 서버 사이드 렌더링 (SSR)
- [x] 모바일 최적화

### 콘텐츠 SEO
- [x] 페이지별 고유 메타데이터
- [x] 키워드 최적화
- [x] 내부 링크 구조
- [x] 이미지 alt 텍스트 (구현 필요 시 확인)
- [x] 다국어 지원 (hreflang 태그)

---

## 🔍 배포 후 확인 사항

### 1. 필수 확인 항목

#### robots.txt 확인
```bash
curl https://www.gplanworld.com/robots.txt
```
**예상 결과**:
```
User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

...

Sitemap: https://www.gplanworld.com/sitemap.xml
```

#### sitemap.xml 확인
```bash
curl https://www.gplanworld.com/sitemap.xml
```
**예상 결과**: XML 형식의 사이트맵 반환

#### RSS 피드 확인
```bash
curl https://www.gplanworld.com/rss
```
**예상 결과**: RSS 2.0 XML 형식 반환

---

### 2. Google Search Console 설정

#### 사이트 인증
1. [Google Search Console](https://search.google.com/search-console) 접속
2. 속성 추가: `https://www.gplanworld.com`
3. 인증 방법 선택 (HTML 메타태그 권장)
4. 인증 완료 확인

#### Sitemap 제출
1. Google Search Console → Sitemaps 메뉴
2. Sitemap URL 입력: `https://www.gplanworld.com/sitemap.xml`
3. 제출 버튼 클릭
4. 제출 상태 확인 (보통 몇 시간 내 처리)

#### URL 검사
1. Google Search Console → URL 검사 도구
2. 주요 페이지 URL 입력하여 인덱싱 상태 확인
3. "색인 생성 요청" 버튼으로 즉시 색인 요청 가능

---

### 3. 구조화된 데이터 검증

#### Google Rich Results Test
1. [Google Rich Results Test](https://search.google.com/test/rich-results) 접속
2. URL 입력: `https://www.gplanworld.com`
3. 검증 결과 확인
4. Organization 및 WebSite 스키마 검증 확인

**예상 결과**:
- ✅ Organization 스키마 검증 통과
- ✅ WebSite 스키마 검증 통과
- ✅ 리치 스니펫 표시 가능

---

### 4. 메타태그 확인

#### 페이지 소스 확인
1. 브라우저에서 `https://www.gplanworld.com` 접속
2. 페이지 소스 보기 (Ctrl+U 또는 Cmd+Option+U)
3. 다음 메타태그 확인:
   - `<meta name="google-site-verification" content="...">`
   - `<meta name="naver-site-verification" content="...">`
   - `<meta property="og:title" content="...">`
   - `<meta property="og:description" content="...">`
   - `<meta property="og:image" content="...">`
   - `<link rel="canonical" href="...">`

---

### 5. 모바일 친화성 확인

#### Google Mobile-Friendly Test
1. [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly) 접속
2. URL 입력: `https://www.gplanworld.com`
3. 테스트 실행
4. 모바일 친화성 확인

**예상 결과**: ✅ 모바일 친화적 페이지

---

### 6. 페이지 속도 확인

#### PageSpeed Insights
1. [PageSpeed Insights](https://pagespeed.web.dev/) 접속
2. URL 입력: `https://www.gplanworld.com`
3. 분석 실행
4. Core Web Vitals 확인:
   - LCP (Largest Contentful Paint)
   - FID (First Input Delay)
   - CLS (Cumulative Layout Shift)

---

## 🚀 추가 최적화 권장사항

### 1. Core Web Vitals 최적화

#### LCP (Largest Contentful Paint) 개선
- 이미지 최적화 (WebP 형식 사용)
- 이미지 lazy loading 적용
- 중요 리소스 우선 로딩

#### FID (First Input Delay) 개선
- JavaScript 번들 크기 최적화
- 코드 분할 (Code Splitting)
- 불필요한 JavaScript 제거

#### CLS (Cumulative Layout Shift) 개선
- 이미지 및 동영상에 명시적 크기 지정
- 동적 콘텐츠 로딩 시 레이아웃 시프트 방지
- 폰트 로딩 최적화

---

### 2. 이미지 최적화

#### 권장 사항
- WebP 형식 사용
- 적절한 이미지 크기 (너무 큰 이미지 사용 지양)
- Lazy loading 적용
- Alt 텍스트 추가 (접근성 및 SEO)

---

### 3. 내부 링크 구조 개선

#### 권장 사항
- Breadcrumb 네비게이션 추가 (선택 사항)
- 관련 페이지 간 내부 링크 강화
- 시맨틱 HTML 사용

---

### 4. 다국어 지원 (hreflang) ✅ 구현 완료

#### 현재 상태
- ✅ `/en` 경로 존재
- ✅ hreflang 태그 자동 설정됨
- ✅ 한국어와 영어 페이지 간 자동 연결

#### 구현 내용
**위치**: `src/lib/metadata.ts`

```21:49:src/lib/metadata.ts
export function generatePageMetadata({
  title,
  description,
  path,
  keywords = [],
  locale = 'ko', // 기본값은 한국어
}: PageMetadata): Metadata {
  // Trailing slash 제거하여 통일 (Next.js 기본 동작과 일치)
  const normalizedPath = path === '/' ? '/' : path.replace(/\/$/, '')
  // 절대경로 canonical URL 생성 (self-referencing)
  const canonicalUrl = `${baseUrl}${normalizedPath === '/' ? '' : normalizedPath}`
  
  // Hreflang 설정: 한국어와 영어 페이지 간 연결
  // 한국어 페이지 경로 (기본 경로)
  const koPath = normalizedPath === '/en' ? '/' : normalizedPath
  const koUrl = `${baseUrl}${koPath === '/' ? '' : koPath}`
  
  // 영어 페이지 경로
  const enPath = normalizedPath === '/en' ? '/en' : `/en${normalizedPath === '/' ? '' : normalizedPath}`
  const enUrl = `${baseUrl}${enPath}`
  
  // 현재 페이지의 언어에 따라 hreflang 설정
  const languages: Record<string, string> = {
    'ko': koUrl,
    'ko-KR': koUrl,
    'en': enUrl,
    'en-US': enUrl,
    'x-default': koUrl, // 기본 언어는 한국어
  }
```

**적용 예시** (한국어 홈페이지):
```8:13:src/app/page.tsx
export const metadata: Metadata = generatePageMetadata({
  title: "지플랜(GPLAN) - 행복한 일터를 만드는 기업 | 장애인 표준사업장",
  description: "지플랜(GPLAN)은 장애인 표준사업장으로, 함께 성장하고 행복을 나누는 일터를 만들어갑니다. 사무업무지원, IT업무지원, 홍보콘텐츠지원, 표준사업장 설립 컨설팅 서비스를 제공합니다.",
  path: '/',
  keywords: ['지플랜', 'GPLAN', '장애인 표준사업장', '사무업무지원', 'IT업무지원', '홍보콘텐츠지원', '표준사업장 설립 컨설팅'],
  locale: 'ko', // 한국어 페이지로 명시
})
```

**적용 예시** (영어 홈페이지):
```7:12:src/app/en/page.tsx
export const metadata: Metadata = generatePageMetadata({
  title: "GPLAN - Creating a Happy Workplace Together | Standard Workplace for People with Disabilities",
  description: "GPLAN is a certified standard workplace for people with disabilities, providing IT and office support services. We create a sustainable workplace through productivity improvement, IT system management, marketing content creation, and consulting for establishing standard workplaces.",
  path: '/en',
  keywords: ['GPLAN', 'Standard workplace', 'IT support', 'Office support', 'Marketing support', 'Consulting'],
  locale: 'en', // 영어 페이지로 명시
})
```

**생성되는 hreflang 태그**:
- `<link rel="alternate" hreflang="ko" href="https://www.gplanworld.com/" />`
- `<link rel="alternate" hreflang="ko-KR" href="https://www.gplanworld.com/" />`
- `<link rel="alternate" hreflang="en" href="https://www.gplanworld.com/en" />`
- `<link rel="alternate" hreflang="en-US" href="https://www.gplanworld.com/en" />`
- `<link rel="alternate" hreflang="x-default" href="https://www.gplanworld.com/" />`

#### 검증 방법
1. 페이지 소스 보기에서 hreflang 태그 확인
2. [Google Search Console](https://search.google.com/search-console) → 국제화 보고서 확인
3. [hreflang 태그 검증 도구](https://technicalseo.com/tools/hreflang/) 사용

---

### 5. 보안 (HTTPS)

#### 현재 상태
- ✅ Vercel에서 자동 HTTPS 처리
- ✅ SSL 인증서 자동 관리

#### 확인 사항
- HTTPS 리다이렉트 정상 작동 확인
- Mixed Content 오류 없음 확인

---

### 6. 추가 구조화된 데이터

#### 권장 스키마
- **LocalBusiness**: 지역 비즈니스 정보 (주소, 전화번호 등)
- **Service**: 서비스 페이지별 서비스 정보
- **BreadcrumbList**: Breadcrumb 네비게이션 (구현 시)

---

### 7. 네이버 서치어드바이저 설정

#### 현재 상태
- ✅ 네이버 사이트 인증 메타태그 설정됨
- ✅ RSS 피드 생성됨

#### 추가 설정
1. [네이버 서치어드바이저](https://searchadvisor.naver.com/) 접속
2. 사이트 등록
3. RSS 피드 제출: `https://www.gplanworld.com/rss`
4. Sitemap 제출: `https://www.gplanworld.com/sitemap.xml`

---

## 📝 환경 변수 설정 예시

`.env.local` 파일에 추가:

```env
# 기본 URL
NEXT_PUBLIC_BASE_URL=https://www.gplanworld.com

# Google Search Console 인증
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=ertX1htU6vkXAHRhKK7y3bNuqSsGdmGW3OR7YLi8y-8

# 네이버 서치어드바이저 인증
NEXT_PUBLIC_NAVER_SITE_VERIFICATION=bd4b7c4d18d565e8d894e412e49df5e979fb11b1
```

**프로덕션 환경 (Vercel)**:
- Vercel 대시보드 → Settings → Environment Variables에서 설정
- 각 환경별로 설정 가능 (Production, Preview, Development)

---

## 🔗 참고 링크

### Google Search Central
- [Google Search Central](https://developers.google.com/search)
- [Google Search Console](https://search.google.com/search-console)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [PageSpeed Insights](https://pagespeed.web.dev/)

### Schema.org
- [Schema.org](https://schema.org/)
- [Organization Schema](https://schema.org/Organization)
- [WebSite Schema](https://schema.org/WebSite)

### 네이버 서치어드바이저
- [네이버 서치어드바이저](https://searchadvisor.naver.com/)
- [네이버 검색 최적화 가이드](https://searchadvisor.naver.com/guide)

### 기타
- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Next.js Sitemap](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Next.js Robots](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)

---

## 📌 중요 참고사항

### 도메인 통일
- **Canonical 도메인**: `https://www.gplanworld.com`
- Vercel에서 non-www를 www로 자동 리다이렉트
- 모든 내부 링크는 www 사용 권장

### 배포 후 대기 시간
- Google Search Console 인증: 즉시 또는 몇 시간 내
- Sitemap 색인: 보통 24-48시간
- 검색 결과 노출: 보통 1-2주 (콘텐츠 품질에 따라 다름)

### 정기 점검
- 월 1회 Google Search Console 확인
- Sitemap 업데이트 시 재제출
- 구조화된 데이터 변경 시 재검증

---

**작성일**: 2024년
**최종 업데이트**: 현재 코드베이스 기준
**작성자**: AI Assistant

