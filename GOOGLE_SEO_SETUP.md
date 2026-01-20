# Google Search Central SEO 설정 가이드

## 설정 완료 항목

### ✅ 1. Google Search Console 인증 메타태그
`src/app/layout.tsx`에 Google Search Console 인증 메타태그가 추가되었습니다.

**사용 방법:**
1. [Google Search Console](https://search.google.com/search-console)에 접속
2. 속성 추가 → URL 접두어 방식 선택
3. 사이트 URL 입력: `https://gplan.kr`
4. **HTML 태그** 방식 선택
5. 제공된 메타태그 코드를 복사
6. 환경 변수 파일에 추가:
   ```env
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=복사한_인증코드
   ```

### ✅ 2. robots.txt 최적화
`src/app/robots.ts`에 Googlebot이 명시적으로 추가되었습니다.
- Googlebot
- Googlebot-Image
- 네이버 검색로봇 (Yeti, NaverBot)

### ✅ 3. Sitemap 설정
`src/app/sitemap.ts`에 사이트맵이 구성되어 있으며, robots.txt에 자동으로 포함됩니다.
- URL: `https://gplan.kr/sitemap.xml`

### ✅ 4. 구조화된 데이터 (Schema.org)
다음 구조화된 데이터가 추가되었습니다:
- **Organization Schema**: 조직 정보
- **WebSite Schema**: 웹사이트 정보

### ✅ 5. SEO 메타데이터 개선
- Viewport 설정
- Theme Color 설정
- Category 및 Classification 추가
- Open Graph 메타태그
- Twitter Card 메타태그

## Google Search Console 인증 방법

### 방법 1: HTML 메타태그 (권장)
1. 환경 변수에 `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` 추가
2. Google Search Console에서 HTML 태그 방식 선택
3. 제공된 메타태그 코드를 환경 변수에 설정

### 방법 2: HTML 파일 업로드
1. Google Search Console에서 HTML 파일 업로드 방식 선택
2. 제공된 파일명을 복사 (예: `google1234567890abcdef.html`)
3. `public/` 폴더에 해당 파일명으로 HTML 파일 생성
4. 파일 내용: `google-site-verification: YOUR_CODE_HERE`

## 추가 SEO 최적화 권장사항

### 1. Google Search Console 제출
- Sitemap 제출: `https://gplan.kr/sitemap.xml`
- URL 검사 도구로 주요 페이지 인덱싱 확인

### 2. Core Web Vitals 최적화
- LCP (Largest Contentful Paint) 개선
- FID (First Input Delay) 개선
- CLS (Cumulative Layout Shift) 개선

### 3. 모바일 친화성
- 모바일 사용성 테스트 통과 확인
- 반응형 디자인 검증

### 4. 보안 (HTTPS)
- SSL 인증서 확인
- HTTPS 리다이렉트 설정

### 5. 페이지 속도 최적화
- 이미지 최적화 (WebP, lazy loading)
- 코드 분할 및 최적화
- CDN 활용

## 환경 변수 설정 예시

`.env.local` 파일에 추가:
```env
NEXT_PUBLIC_BASE_URL=https://gplan.kr
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_google_verification_code_here
NEXT_PUBLIC_NAVER_SITE_VERIFICATION=67c6c935fa2c73d99db784ecbc0d73d0eb39dfaf
```

## 확인 사항

배포 후 다음을 확인하세요:
1. ✅ `https://gplan.kr/robots.txt` 접근 가능
2. ✅ `https://gplan.kr/sitemap.xml` 접근 가능
3. ✅ Google Search Console에서 사이트 인증 완료
4. ✅ 메타태그가 올바르게 포함되어 있는지 확인 (페이지 소스 보기)
5. ✅ 구조화된 데이터 검증: [Google Rich Results Test](https://search.google.com/test/rich-results)

## 참고 링크
- [Google Search Central](https://developers.google.com/search)
- [Google Search Console](https://search.google.com/search-console)
- [Schema.org](https://schema.org/)

