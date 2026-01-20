import { MetadataRoute } from 'next'

/**
 * [SEO 최적화 사이트맵]
 * 1. 도메인 통일: https://www.gplanworld.com
 * 2. 리디렉트 URL 제거: /business/marketing-content, /business/marketing
 * 3. 영어 페이지 추가: /en/* 경로들
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // [SEO Strict Mode] 강제 Canonical 도메인 고정
  const baseUrl = "https://www.gplanworld.com"

  const routes = [
    // 메인 및 핵심 페이지 (한글)
    { url: '', priority: 1.0, changeFrequency: 'daily' },
    { url: '/about', priority: 0.8, changeFrequency: 'daily' },
    { url: '/talent', priority: 0.8, changeFrequency: 'daily' },

    // 비즈니스 영역 (한글)
    { url: '/business', priority: 0.9, changeFrequency: 'daily' },
    { url: '/business/office-support', priority: 0.8, changeFrequency: 'daily' },
    { url: '/business/it-support', priority: 0.8, changeFrequency: 'daily' },
    { url: '/business/marketing-support', priority: 0.8, changeFrequency: 'daily' },
    { url: '/business/consulting', priority: 0.8, changeFrequency: 'daily' },

    // 고객 지원 (한글)
    { url: '/contact', priority: 0.7, changeFrequency: 'daily' },
    { url: '/inquiry', priority: 0.7, changeFrequency: 'daily' },

    // 영어 페이지
    { url: '/en', priority: 0.9, changeFrequency: 'daily' },
    { url: '/en/about', priority: 0.8, changeFrequency: 'daily' },
    { url: '/en/talent', priority: 0.8, changeFrequency: 'daily' },
    { url: '/en/business', priority: 0.8, changeFrequency: 'daily' },
    { url: '/en/business/office-support', priority: 0.7, changeFrequency: 'daily' },
    { url: '/en/business/it-support', priority: 0.7, changeFrequency: 'daily' },
    { url: '/en/business/marketing-support', priority: 0.7, changeFrequency: 'daily' },
    { url: '/en/business/consulting', priority: 0.7, changeFrequency: 'daily' },
    { url: '/en/contact', priority: 0.7, changeFrequency: 'daily' },
    { url: '/en/inquiry', priority: 0.7, changeFrequency: 'daily' },
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency as any,
    priority: route.priority,
  }))
}
