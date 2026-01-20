import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: '회사소개 | 지플랜(GPLAN)',
  description: '지플랜(GPLAN)은 행복한 일터를 만드는 기업입니다. 일과 함께 성장하고, 함께 나누며, 행복을 만들어가는 가치를 실현합니다. 장애인 표준사업장으로서 함께 성장하고 행복을 나누는 일터를 만들어갑니다.',
  path: '/about',
  keywords: ['회사소개', '지플랜', 'GPLAN', '장애인 표준사업장', '회사 소개'],
})

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

