import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: '고객 문의 | 지플랜(GPLAN)',
  description: '지플랜(GPLAN)에 대해 궁금하신 사항이 있으시면 언제든지 문의해주세요. 사무업무지원, IT업무지원, 홍보콘텐츠지원, 표준사업장 설립 컨설팅 등 다양한 서비스에 대한 상세한 안내를 제공해 드립니다.',
  path: '/inquiry',
  keywords: ['고객 문의', '문의', '연락', 'GPLAN'],
})

export default function InquiryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

