import type { Metadata } from "next"
import { generatePageMetadata } from "@/lib/metadata"

import HomeClient from "@/components/home-client"

// ✅ 영문 홈페이지 메타데이터 - self-referencing canonical + hreflang
export const metadata: Metadata = generatePageMetadata({
  title: "GPLAN - Creating a Happy Workplace Together | Standard Workplace for People with Disabilities",
  description: "GPLAN is a certified standard workplace for people with disabilities, providing IT and office support services. We create a sustainable workplace through productivity improvement, IT system management, marketing content creation, and consulting for establishing standard workplaces.",
  path: '/en',
  keywords: ['GPLAN', 'Standard workplace', 'IT support', 'Office support', 'Marketing support', 'Consulting'],
  locale: 'en', // 영어 페이지로 명시
})

export default function EnHomePage() {
 // initialLang 프롭을 통해 HomeClient가 시작부터 영어 데이터를 그리도록 설정합니다.
  return <HomeClient initialLang="en" />
}