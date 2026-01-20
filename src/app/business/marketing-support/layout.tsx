import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: '홍보콘텐츠지원 | 지플랜(GPLAN)',
  description: 'AI 기반 콘텐츠 제작부터 SNS 채널 운영까지 브랜드 성장을 위한 통합 마케팅 솔루션을 제공합니다. 전문 크리에이터가 제작하는 고품질 콘텐츠로 브랜드 인지도를 높이고, 타겟 고객과의 소통을 강화합니다.',
  path: '/business/marketing-support',
  keywords: ['홍보콘텐츠지원', 'SNS 운영', '마케팅', '콘텐츠 제작', 'AI 콘텐츠', 'GPLAN'],
})

export default function MarketingSupportLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

