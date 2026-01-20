# 리다이렉트 오류 수정 보고서

**수정 일자**: 2026-01-05  
**대상 도메인**: https://www.gplanworld.com  
**프레임워크**: Next.js 16.0.0 (Vercel 배포)

---

## 🔴 발견된 문제점

### 1. **Sitemap에 리다이렉트 URL 포함** ❌

**문제**:
- `src/app/sitemap.ts`에 `/business/marketing-content`와 `/business/marketing` URL이 포함되어 있었습니다.
- 이 URL들은 실제로 `/business/marketing-support`로 리다이렉트됩니다.
- Google Search Console이 sitemap을 통해 이 URL들을 크롤링하면 **리다이렉트 오류**가 발생합니다.

**영향**:
- 검색엔진이 리다이렉트 체인을 감지
- "페이지 색인이 생성되지 않음: 리디렉션 오류" 발생
- SEO 점수 하락

### 2. **Canonical URL 불일치** ❌

**문제**:
- `src/app/layout.tsx`: `baseUrl = "https://gplanworld.com"` (non-www)
- `src/lib/metadata.ts`: `baseUrl = "https://gplanworld.com"` (non-www)
- `src/app/sitemap.ts`: `baseUrl = "https://gplanworld.com"` (non-www)
- `src/app/robots.ts`: `baseUrl = "https://gplanworld.com"` (non-www)
- `vercel.json`: `destination = "https://www.gplanworld.com"` (www)

**결과**:
- Canonical URL이 `https://gplanworld.com`으로 생성됨
- 실제 사이트는 `https://www.gplanworld.com`으로 리다이렉트됨
- **검색엔진이 혼란을 겪고 리다이렉트 오류 발생**

### 3. **리다이렉트 플로우 문제**

기존 플로우:
```
사용자 요청: https://gplanworld.com/
  ↓
[Canonical URL 생성] https://gplanworld.com (메타데이터)
  ↓
[Vercel 리다이렉트] 301 → https://www.gplanworld.com/
  ↓
❌ Canonical URL과 실제 URL 불일치
```

---

## ✅ 수정 내용

### 1. **Sitemap에서 리다이렉트 URL 제거**

**파일**: `src/app/sitemap.ts`

**수정 전**:
```typescript
{
  url: `${baseUrl}/business/marketing-support`,
  lastModified: new Date(),
  changeFrequency: 'monthly',
  priority: 0.8,
},
{
  url: `${baseUrl}/business/marketing-content`,  // ❌ 리다이렉트 URL
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
{
  url: `${baseUrl}/business/marketing`,  // ❌ 리다이렉트 URL
  lastModified: new Date(),
  changeFrequency: 'monthly',
  priority: 0.8,
},
```

**수정 후**:
```typescript
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
```

**효과**:
- ✅ 검색엔진이 리다이렉트 URL을 크롤링하지 않음
- ✅ 리다이렉트 오류 방지
- ✅ 최종 URL만 sitemap에 포함

### 2. **모든 파일의 baseUrl을 www.gplanworld.com으로 통일**

#### 2.1. `src/lib/metadata.ts`
```typescript
// 수정 전
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://gplanworld.com"

// 수정 후
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.gplanworld.com"
```

#### 2.2. `src/app/layout.tsx`
```typescript
// 수정 전
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://gplanworld.com"

// 수정 후
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.gplanworld.com"
```

#### 2.3. `src/app/sitemap.ts`
```typescript
// 수정 전
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://gplanworld.com"

// 수정 후
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.gplanworld.com"
```

#### 2.4. `src/app/robots.ts`
```typescript
// 수정 전
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://gplanworld.com"

// 수정 후
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.gplanworld.com"
```

**효과**:
- ✅ Canonical URL이 `https://www.gplanworld.com`으로 생성됨
- ✅ Vercel 리다이렉트 설정과 일치
- ✅ 검색엔진이 올바른 canonical URL 인식
- ✅ 리다이렉트 체인 제거

---

## 📋 수정 후 리다이렉트 플로우

### 정상 플로우 (수정 후)

```
사용자 요청: https://gplanworld.com/
  ↓
[Vercel 리다이렉트] 301 → https://www.gplanworld.com/
  ↓
[Canonical URL] https://www.gplanworld.com (메타데이터)
  ↓
✅ HTTP 200 OK
```

**특징**:
- ✅ 단일 리다이렉트 (301 Permanent)
- ✅ Canonical URL과 실제 URL 일치
- ✅ 검색엔진이 올바른 URL 인식
- ✅ 리다이렉트 오류 없음

---

## 🔍 검증 방법

### 1. **로컬 빌드 테스트**

```bash
# Next.js 빌드
npm run build

# 빌드 성공 확인
# sitemap.xml 생성 확인
# robots.txt 생성 확인
```

### 2. **Vercel 배포 후 검증**

#### 2.1. cURL로 리다이렉트 확인
```bash
# non-www → www 리다이렉트 확인
curl -I https://gplanworld.com/
# 예상: HTTP/1.1 301 Moved Permanently
#       Location: https://www.gplanworld.com/

# 최종 URL HTTP 200 확인
curl -I https://www.gplanworld.com/
# 예상: HTTP/1.1 200 OK
```

#### 2.2. Sitemap 확인
```bash
# Sitemap 내용 확인
curl https://www.gplanworld.com/sitemap.xml

# 확인 사항:
# ✅ /business/marketing-content 없음
# ✅ /business/marketing 없음
# ✅ /business/marketing-support 포함
# ✅ 모든 URL이 https://www.gplanworld.com으로 시작
```

#### 2.3. Canonical URL 확인
```bash
# 홈페이지 canonical URL 확인
curl https://www.gplanworld.com/ | grep canonical

# 예상 결과:
# <link rel="canonical" href="https://www.gplanworld.com/" />
```

### 3. **Google Search Console 검증**

1. [Google Search Console](https://search.google.com/search-console) 접속
2. **URL 검사** 도구 사용
3. URL 입력: `https://www.gplanworld.com/`
4. 확인 사항:
   - ✅ "페이지가 색인 생성됨"
   - ✅ "리디렉션 오류" 없음
   - ✅ HTTP 200 상태 코드
   - ✅ Canonical URL: `https://www.gplanworld.com/`

5. **Sitemap 재제출**
   - Google Search Console → Sitemaps
   - `https://www.gplanworld.com/sitemap.xml` 제출
   - 색인 생성 요청

---

## ⚠️ 주의사항

### 1. **환경 변수 설정**

Vercel 환경 변수에 다음을 설정하세요:
```
NEXT_PUBLIC_BASE_URL=https://www.gplanworld.com
```

### 2. **DNS 전파 시간**
- 변경 사항이 전파되기까지 최대 24시간 소요
- 즉시 반영되지 않을 수 있음

### 3. **Google 캐시**
- Google Search Console의 캐시로 인해 즉시 반영되지 않을 수 있음
- 배포 후 최소 24-48시간 후 재검증 권장

### 4. **기존 리다이렉트 페이지 유지**
- `/business/marketing-content/page.tsx` (리다이렉트 유지)
- `/business/marketing/page.tsx` (리다이렉트 유지)
- 이 페이지들은 sitemap에서만 제거되었으며, 실제 리다이렉트 기능은 유지됩니다.
- 사용자가 직접 URL을 입력하거나 외부 링크로 접근 시 정상적으로 리다이렉트됩니다.

---

## 📊 예상 결과

### 수정 전 (문제 상황)
- ❌ Google Search Console: "페이지 색인이 생성되지 않음: 리디렉션 오류"
- ❌ Canonical URL 불일치
- ❌ Sitemap에 리다이렉트 URL 포함
- ❌ 검색엔진 혼란

### 수정 후 (정상 상황)
- ✅ Google Search Console: "페이지가 색인 생성됨"
- ✅ Canonical URL 일치 (`https://www.gplanworld.com`)
- ✅ Sitemap에 최종 URL만 포함
- ✅ 리다이렉트 오류 없음
- ✅ SEO 점수 개선

---

## 📝 다음 단계

### 1. **배포**
```bash
# Git commit
git add .
git commit -m "Fix: 리다이렉트 오류 수정 - sitemap에서 리다이렉트 URL 제거, baseUrl을 www.gplanworld.com으로 통일"

# Git push (Vercel 자동 배포)
git push origin main
```

### 2. **Vercel 환경 변수 설정**
- Vercel Dashboard → Settings → Environment Variables
- `NEXT_PUBLIC_BASE_URL` = `https://www.gplanworld.com`

### 3. **Google Search Console 검증 (배포 후 24-48시간 후)**
1. URL 검사: `https://www.gplanworld.com/`
2. Sitemap 재제출
3. 색인 생성 요청
4. 리다이렉트 오류 확인

### 4. **정기 모니터링**
- Google Search Console에서 리다이렉트 오류 확인
- 페이지 색인 생성 상태 확인
- Sitemap 크롤링 상태 확인

---

## ✅ 수정된 파일 목록

1. ✅ `src/app/sitemap.ts` - 리다이렉트 URL 제거, baseUrl 통일
2. ✅ `src/lib/metadata.ts` - baseUrl을 www.gplanworld.com으로 변경
3. ✅ `src/app/layout.tsx` - baseUrl을 www.gplanworld.com으로 변경
4. ✅ `src/app/robots.ts` - baseUrl을 www.gplanworld.com으로 변경

---

## 📚 참고 자료

- [Google Search Console - Redirect Error](https://support.google.com/webmasters/answer/93633)
- [Next.js Sitemap](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Vercel Redirects](https://vercel.com/docs/edge-network/redirects)
- [Canonical URL Best Practices](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)

---

## 🎯 결론

이번 수정으로 다음과 같은 문제들이 해결되었습니다:

1. ✅ **Sitemap 최적화**: 리다이렉트 URL 제거로 검색엔진이 올바른 URL만 크롤링
2. ✅ **Canonical URL 통일**: 모든 파일에서 `https://www.gplanworld.com` 사용
3. ✅ **리다이렉트 체인 제거**: Vercel 리다이렉트 설정과 메타데이터 일치
4. ✅ **SEO 개선**: 검색엔진이 올바른 canonical URL 인식

**배포 후 24-48시간 내에 Google Search Console에서 리다이렉트 오류가 해결될 것으로 예상됩니다.**
