import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  // [SEO Strict Mode] 강제 Canonical 도메인 고정
  const baseUrl = "https://www.gplanworld.com"

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      // Google, Naver 봇 명시적 허용 (중복이어도 안전장치로 유지)
      {
        userAgent: ['Googlebot', 'Yeti', 'NaverBot'],
        allow: '/',
      },
    ],

    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
