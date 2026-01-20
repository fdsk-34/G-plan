import type { Metadata } from "next"
import { generatePageMetadata } from "@/lib/metadata"
import ContactPageClient from "@/components/pages/contact-client"

export const metadata: Metadata = generatePageMetadata({
  title: "Directions - GPLAN",
  description: "Visit GPLAN office. Find our location, address, and public transportation information.",
  path: '/en/contact',
  keywords: ['GPLAN', 'Contact', 'Directions', 'Location', 'Address'],
  locale: 'en',
})

export default function EnContactPage() {
  return <ContactPageClient lang="en" />
}
