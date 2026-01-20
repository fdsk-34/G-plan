import type { Metadata } from "next"
import HomeClient from "@/components/home-client"
import { generatePageMetadata } from '@/lib/metadata'

/** * [핵심 수정] Vercel 캐시를 무효화하고 항상 최신 상태를 유지하게 합니다.
 * 이 설정이 있어야 연혁 데이터나 코드 수정사항이 즉시 반영됩니다.
 */
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = generatePageMetadata({
  title: "지플랜(GPLAN) - 행복한 일터를 만드는 기업 | 장애인 표준사업장",
  description: "지플랜(GPLAN)은 장애인 표준사업장으로, 함께 성장하고 행복을 나누는 일터를 만들어갑니다. 사무업무지원, IT업무지원, 홍보콘텐츠지원, 표준사업장 설립 컨설팅 서비스를 제공합니다.",
  path: '/',
  keywords: ['지플랜', 'GPLAN', '장애인 표준사업장', '사무업무지원', 'IT업무지원', '홍보콘텐츠지원', '표준사업장 설립 컨설팅'],
  locale: 'ko',
})

export default function HomePage() {
  // 로컬과 동일한 환경을 위해 서버 사이드에서 매번 새로 렌더링되도록 보장합니다.
  return <HomeClient />
}

// final-build-check-01