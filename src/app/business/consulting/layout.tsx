import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: '표준사업장 설립 컨설팅 | 지플랜(GPLAN)',
  description: '장애인 표준사업장 설립의 모든 과정을 체계적으로 지원하고 성공적인 운영을 돕습니다. 설립 절차부터 인증, 운영 컨설팅까지 전문가가 함께합니다. 표준사업장 설립으로 사회적 가치와 경제적 가치를 동시에 실현하세요.',
  path: '/business/consulting',
  keywords: ['표준사업장 설립 컨설팅', '장애인 표준사업장', '표준사업장 인증', 'GPLAN'],
})

export default function ConsultingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

