import type { Metadata } from "next"
import { generatePageMetadata } from "@/lib/metadata"
import TalentPageClient from "@/components/pages/talent-client"

export const metadata: Metadata = generatePageMetadata({
  title: "Ideal Talent - GPLAN",
  description: "GPLAN seeks talented individuals who gather, grow, give, and grace together. Join us in creating a happy workplace.",
  path: '/en/talent',
  keywords: ['GPLAN', 'Talent', 'Career', 'Join us', 'Gather', 'Growth', 'Give', 'Grace'],
  locale: 'en',
})

export default function EnTalentPage() {
  return <TalentPageClient lang="en" />
}
