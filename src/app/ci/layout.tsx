import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'CI | 지플랜(GPLAN)',
  description: '지플랜(GPLAN)의 브랜드 메시지와 색상 체계를 한눈에 확인해 보세요. We Make Bliss라는 핵심 가치를 담은 브랜드 아이덴티티와 함께 성장하고 행복을 나누는 기업 문화를 시각적으로 표현합니다.',
  path: '/ci',
  keywords: ['CI', '브랜드', '브랜드 아이덴티티', 'GPLAN'],
})

export default function CILayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

