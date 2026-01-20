import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: '인재상 | 지플랜(GPLAN)',
  description: '지플랜(GPLAN)이 함께하고 싶은 사람은 이런 사람입니다. 일과 함께 성장하고, 함께 나누며, 행복을 만들어가는 사람. 장애인 표준사업장으로서 다양성을 존중하고, 모든 구성원이 함께 성장할 수 있는 포용적인 일터를 만들어갑니다.',
  path: '/talent',
  keywords: ['인재상', '채용', 'GPLAN', '인재 채용'],
})

export default function TalentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}