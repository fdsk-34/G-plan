import type { Metadata } from "next"
import { generatePageMetadata } from "@/lib/metadata"
import BusinessPageClient from "@/components/pages/business-client"

export const metadata: Metadata = generatePageMetadata({
  title: "Business Areas - GPLAN",
  description: "GPLAN provides comprehensive business support services including office support, IT support, marketing content creation, and consulting for establishing standard workplaces.",
  path: '/en/business',
  keywords: ['GPLAN', 'Business', 'Office support', 'IT support', 'Marketing', 'Consulting'],
  locale: 'en',
})

export default function EnBusinessPage() {
  return <BusinessPageClient lang="en" />
}
