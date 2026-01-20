import type { Metadata } from "next"
import { generatePageMetadata } from "@/lib/metadata"
import AboutPageClient from "@/components/pages/about-client"

export const metadata: Metadata = generatePageMetadata({
  title: "About GPLAN - Creating a Happy Workplace Together",
  description: "GPLAN is a certified standard workplace for people with disabilities, creating a sustainable workplace through productivity improvement and shared growth.",
  path: '/en/about',
  keywords: ['GPLAN', 'About', 'Standard workplace', 'Disability employment', 'Social enterprise'],
  locale: 'en',
})

export default function EnAboutPage() {
  return <AboutPageClient lang="en" />
}
