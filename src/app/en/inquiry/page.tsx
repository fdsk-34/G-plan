import type { Metadata } from "next"
import { generatePageMetadata } from "@/lib/metadata"
import InquiryPageClient from "@/components/pages/inquiry-client"

export const metadata: Metadata = generatePageMetadata({
  title: "Customer Inquiry - GPLAN",
  description: "Contact GPLAN for inquiries. We are here to help you with any questions about our services.",
  path: '/en/inquiry',
  keywords: ['GPLAN', 'Inquiry', 'Contact', 'Customer service', 'Support'],
  locale: 'en',
})

export default function EnInquiryPage() {
  return <InquiryPageClient lang="en" />
}
