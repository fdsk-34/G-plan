import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'IT업무지원 | 지플랜(GPLAN)',
  description: '최신 기술과 전문성을 바탕으로 귀사의 IT 업무를 안정적으로 지원합니다. ERP, 그룹웨어, PRM 등 핵심 시스템 운영 및 유지보수를 제공하며, 24시간 모니터링과 신속한 대응으로 비즈니스 연속성을 보장합니다.',
  path: '/business/it-support',
  keywords: ['IT업무지원', 'ERP', '그룹웨어', '시스템 관리', 'IT 유지보수', 'GPLAN'],
})

export default function ITSupportLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

