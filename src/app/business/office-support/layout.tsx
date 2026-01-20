import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: '사무업무지원 | 지플랜(GPLAN)',
  description: '전문적이고 효율적인 사무 업무 지원 서비스로 귀사의 업무 생산성을 높여드립니다. RPA 기술을 활용한 업무 자동화 솔루션을 제공하며, 데이터 입력, 문서 처리, 보고서 작성 등 반복 업무를 자동화하여 인력과 시간을 절약합니다.',
  path: '/business/office-support',
  keywords: ['사무업무지원', 'RPA', '업무 자동화', '사무 생산성', 'GPLAN'],
})

export default function OfficeSupportLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

