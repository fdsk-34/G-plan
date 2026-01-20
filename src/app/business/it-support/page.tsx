"use client"

import { Footer } from "@/components/footer"
import { TopButton } from "@/components/top-button"
import { Code, Database, Globe, TrendingUp, Shield, Users, Clock } from "lucide-react"
import { PageHeroSection } from "@/components/sections/page-hero-section"
import { ServiceCard } from "@/components/sections/service-card"
import { FeatureCard } from "@/components/sections/feature-card"
import { CTASection } from "@/components/sections/cta-section"
import { SectionHeader } from "@/components/sections/section-header"
import Image from "next/image"
import { getImagePaths } from "@/lib/image-paths"
import { useT } from "@/components/i18n/use-t"

export default function ITSupportPage() {
  const { t, lang } = useT()
  const imagePaths = getImagePaths(lang)
  return (
    <div className="min-h-screen bg-white">
      <main>
        <PageHeroSection
          icon={Code}
          title={t("pages.itSupport.title")}
          description={
            <>
              {String(t("pages.itSupport.subtitle")).split('\n').map((line: string, i: number) => (
                <span key={i}>
                  {line}
                  {i < t("pages.itSupport.subtitle").split('\n').length - 1 && <br className="hidden sm:block" />}
                </span>
              ))}
            </>
          }
        />

        <section className="py-12 sm:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <SectionHeader title={t("pages.itSupport.servicesTitle")} />

              <div className="space-y-6 sm:space-y-8">
                <ServiceCard
                  icon={Database}
                  title={t("pages.itSupport.coreSystemsTitle")}
                  description={t("pages.itSupport.coreSystemsDescription")}
                />
                <ServiceCard
                  icon={Code}
                  title={t("pages.itSupport.integrationTitle")}
                  description={t("pages.itSupport.integrationDescription")}
                />
                <ServiceCard
                  icon={Globe}
                  title={t("pages.itSupport.websiteTitle")}
                  description={t("pages.itSupport.websiteDescription")}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <SectionHeader
                title={t("pages.itSupport.rpaTitle")}
                description={t("pages.itSupport.rpaDescription")}
              />
              {/*
<div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
  <div className="group relative bg-white border border-gray-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm hover:shadow-2xl transition-all duration-300 hover:border-gray-900">
    <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-50 via-white to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    <div className="relative">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 mb-4 sm:mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">RPA 적용 업무자동화 사례</h3>
        <span className="text-xs font-semibold tracking-[0.2em] text-blue-500 uppercase">Case</span>
      </div>
      <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-gray-100">
        <Image
          src={imagePaths.services.officeSupport.rpaAutomationExamples}
          alt="RPA 적용 업무자동화 사례 리스트"
          width={1140}
          height={580}
          className="w-full h-auto"
          priority
        />
      </div>
    </div>
  </div>

  <div className="group relative bg-white border border-gray-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm hover:shadow-2xl transition-all duration-300 hover:border-gray-900">
    <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    <div className="relative">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 mb-4 sm:mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">RPA 프로세스 개요</h3>
        <span className="text-xs font-semibold tracking-[0.2em] text-indigo-500 uppercase">Overview</span>
      </div>
      <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-gray-100 bg-white">
        <Image
          src={imagePaths.services.officeSupport.rpaOverview}
          alt="RPA 프로세스 구성 개요"
          width={1024}
          height={512}
          className="w-full h-auto"
        />
      </div>
    </div>
  </div>
</div>
*/}

            </div>
          </div>
        </section>

        <section className="py-12 sm:py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <SectionHeader title={t("pages.itSupport.featuresTitle")} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <FeatureCard
                  icon={TrendingUp}
                  text={t("pages.itSupport.features.feature1")}
                />
                <FeatureCard
                  icon={Shield}
                  text={t("pages.itSupport.features.feature2")}
                />
                <FeatureCard
                  icon={Users}
                  text={t("pages.itSupport.features.feature3")}
                />
                <FeatureCard
                  icon={Clock}
                  text={t("pages.itSupport.features.feature4")}
                />
              </div>
            </div>
          </div>
        </section>

        <CTASection
          title={t("pages.itSupport.ctaTitle")}
          description={t("pages.itSupport.ctaDescription")}
        />
      </main>
      <Footer />
      <TopButton />
    </div>
  )
}
