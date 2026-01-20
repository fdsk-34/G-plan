import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: '사업 영역 | 지플랜(GPLAN)',
  description: '지플랜(GPLAN)은 사무업무 생산성 개선, IT 시스템 관리, 홍보 콘텐츠 제작, 표준사업장 설립 컨설팅을 통해 지속 가능한 일터를 만들어갑니다. 장애인 표준사업장으로서 전문 서비스를 제공하며, 함께 성장하고 행복을 나누는 기업 문화를 실현합니다.',
  path: '/business',
  keywords: ['사업 영역', '사무업무지원', 'IT업무지원', '홍보콘텐츠지원', '표준사업장 설립 컨설팅', 'GPLAN'],
})

export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

