"use client"

import { Footer } from "@/components/footer"
import { TopButton } from "@/components/top-button"
import { CISection } from "@/components/ci-section"


export default function CIPage() {

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

