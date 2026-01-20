import type { Metadata } from "next"
import { generatePageMetadata } from "@/lib/metadata"
import { Footer } from "@/components/footer"
import { TopButton } from "@/components/top-button"
import { CISection } from "@/components/ci-section"

export const metadata: Metadata = generatePageMetadata({
  title: "CI | GPLAN",
  description: "Check out GPLAN's brand message and color system. Our brand identity reflects the core value 'We Make Bliss', visually expressing a corporate culture of growing together and sharing happiness.",
  path: "/en/ci",
  keywords: ["CI", "Brand", "Brand Identity", "GPLAN"],
  locale: "en",
})

export default function EnCIPage() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <CISection />
      </main>
      <Footer />
      <TopButton />
    </div>
  )
}
