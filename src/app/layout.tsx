import type { Metadata, Viewport } from "next"
import { Geist } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { LangProviderWrapper } from "@/components/i18n/lang-provider-wrapper"
import { Header } from "@/components/header"
import "./globals.css"

// Canonical domain: https://gplanworld.com (Vercel 리다이렉트 설정과 일치)
const baseUrl = "https://www.gplanworld.com"
const geist = Geist({ subsets: ["latin"] })

// 검색엔진 사이트 인증코드
const naverVerification =
  process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION ||
  "bd4b7c4d18d565e8d894e412e49df5e979fb11b1"
// Google 인증: 환경 변수 우선, 없으면 최신 인증 코드 사용
// gplanworld.com 도메인 인증 코드: ertX1htU6vkXAHRhKK7y3bNuqSsGdmGW3OR7YLi8y-8
const googleVerification = 
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 
  "ertX1htU6vkXAHRhKK7y3bNuqSsGdmGW3OR7YLi8y-8"

// SEO 메타데이터 설정
export const metadata: Metadata = {
  title: "지플랜(GPLAN) - 행복한 일터를 만드는 기업 Creating a Happy Workplace Together",
  description:
    "지플랜(GPLAN)은 장애인 표준사업장으로, 함께 성장하고 행복을 나누는 일터를 만들어갑니다. | GPLAN is a certified standard workplace for people with disabilities, providing IT and office support services.",
  generator: "Next.js",
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

  // 기본 URL 및 Canonical URL 설정
  // metadataBase를 설정하면 각 페이지에서 자동으로 canonical URL이 생성됩니다
  metadataBase: new URL(baseUrl),
  alternates: {
    languages: {
      'ko-KR': '/',
      'en-US': '/en',
    },
    types: {
      "application/rss+xml": "https://www.gplanworld.com/rss", // RSS 피드 링크 (네이버 서치어드바이저용)
    },
    // NOTE: hreflang은 페이지별(/en 포함)로 정확히 설정해야 하므로 전역에서는 제거합니다.
  },

  icons: {
    icon: [
      // 구글 검색 결과 파비콘 (Google Search Results Favicon) - 48x48 우선
      { url: `${baseUrl}/favicon-48x48.png`, type: "image/png", sizes: "48x48" },
      // 네이버 검색 결과 파비콘 (Naver Search Results Favicon) - 16x16, 32x32 우선
      { url: `${baseUrl}/favicon-16x16.png`, type: "image/png", sizes: "16x16" },
      { url: `${baseUrl}/favicon-32x32.png`, type: "image/png", sizes: "32x32" },
      // 기본 파비콘 (fallback)
      { url: `${baseUrl}/favicon.ico`, sizes: "any" },
      { url: `${baseUrl}/favicon.png`, type: "image/png", sizes: "32x32" },
      // Android Chrome 아이콘
      { url: `${baseUrl}/android-chrome-192x192.png`, type: "image/png", sizes: "192x192" },
      { url: `${baseUrl}/android-chrome-512x512.png`, type: "image/png", sizes: "512x512" },
    ],
    shortcut: `${baseUrl}/favicon.ico`, // 구글/네이버 검색엔진 shortcut icon
    apple: [
      { url: `${baseUrl}/apple-icon.png`, sizes: "180x180", type: "image/png" }, // Apple Touch Icon (iOS 홈 화면 추가용 - iPhone/iPad)
    ],
    other: [
      {
        rel: "manifest",
        url: `${baseUrl}/site.webmanifest`,
      },
    ],
  },

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

  // Twitter Card - 트위터 공유 최적화
  twitter: {
    card: "summary_large_image",
    title: "지플랜(GPLAN) - 행복한 일터를 만드는 기업 Creating a Happy Workplace Together",
    description:
      "지플랜(GPLAN)은 장애인 표준사업장으로, 함께 성장하고 행복을 나누는 일터를 만들어갑니다. | GPLAN is a certified standard workplace for people with disabilities, providing IT and office support services.",
    images: [`${baseUrl}/og-image.png`],
  },

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

  // 검색엔진 사이트 인증 메타태그 및 추가 SEO 설정
  other: {
    "naver-site-verification": naverVerification,
    "google-site-verification": googleVerification,
    "format-detection": "telephone=no, email=no, address=no",
  },

  category: "business",
  // 추가 SEO 메타데이터
  applicationName: "지플랜(GPLAN)",
  referrer: "origin-when-cross-origin",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 구조화된 데이터 (Schema.org) - Organization
  // 검색 결과에 리치 스니펫으로 표시되도록 설정
  // Rich Results Test: https://search.google.com/test/rich-results
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

  // 구조화된 데이터 (Schema.org) - WebSite
  // 웹사이트 정보를 검색엔진에 제공
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

  // URL 경로에 따라 언어 결정 (서버 컴포넌트에서는 headers를 통해 확인)
  // 기본값은 'ko'이며, /en 경로는 en/layout.tsx에서 처리됨
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geist.className} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LangProviderWrapper>
            <Header />
            {/* 구조화된 데이터 JSON-LD 스크립트 */}
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
            {children}
          </LangProviderWrapper>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}