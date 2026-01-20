import { Metadata } from 'next'

// Canonical domain: https://www.gplanworld.com (Vercel 리다이렉트 설정과 일치)
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.gplanworld.com"

export interface PageMetadata {
  title: string
  description: string
  path: string
  keywords?: string[]
  locale?: 'ko' | 'en' // 페이지 언어 설정
}

/**
 * 페이지 메타데이터 생성 함수
 * - Canonical URL: 절대경로 + self-referencing 방식 보장
 * - Hreflang: 다국어 페이지 간 연결 (한국어/영어)
 * - Robots: 기본값 index, follow 보장
 * - 모든 페이지에서 일관된 SEO 설정 제공
 */
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
  
  return {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    // Self-referencing canonical URL (절대경로)
    // Hreflang: 다국어 페이지 간 연결
    alternates: {
      canonical: canonicalUrl,
      languages: languages,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl, // OpenGraph URL도 canonical과 동일하게 설정
      siteName: "지플랜(GPLAN)",
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale === 'en' ? 'en_US' : 'ko_KR', // 페이지 언어에 따라 설정
      alternateLocale: locale === 'en' ? 'ko_KR' : 'en_US', // 대체 언어
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/og-image.png`],
    },
    // 기본값: index, follow (모든 페이지 색인 허용)
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

