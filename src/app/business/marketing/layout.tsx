import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: '홍보콘텐츠지원 | 지플랜(GPLAN)',
  description: 'AI 기반 콘텐츠 제작부터 SNS 채널 운영까지 브랜드 성장을 위한 통합 마케팅 솔루션을 제공합니다.',
  path: '/business/marketing-support', // canonical은 실제 페이지로 설정
  keywords: ['홍보콘텐츠지원', 'SNS 운영', '마케팅', '콘텐츠 제작', 'AI 콘텐츠', 'GPLAN'],
})

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

