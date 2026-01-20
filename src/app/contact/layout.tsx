import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: '오시는 길 | 지플랜(GPLAN)',
  description: '지플랜(GPLAN)을 찾아오시는 길을 안내해 드립니다. 경기도 김포시 김포한강10로 133번길 107에 위치하고 있으며, 지하철 및 대중교통 이용이 편리합니다. 방문 전 연락 주시면 더욱 친절하게 안내해 드립니다.',
  path: '/contact',
  keywords: ['오시는 길', '연락처', '주소', 'GPLAN', '김포'],
})

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

