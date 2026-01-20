"use client"

import { Footer } from "@/components/footer"
import { TopButton } from "@/components/top-button"
import { Megaphone, Camera, Share2, TrendingUp, Zap, Users, Shield, Clock } from "lucide-react"
import { PageHeroSection } from "@/components/sections/page-hero-section"
import { ServiceCard } from "@/components/sections/service-card"
import { FeatureCard } from "@/components/sections/feature-card"
import { CTASection } from "@/components/sections/cta-section"
import { SectionHeader } from "@/components/sections/section-header"
import { useT } from "@/components/i18n/use-t"

export default function MarketingPage() {
  const { t } = useT()
  return (
    <div className="min-h-screen">
      <main>
        <PageHeroSection
          icon={Megaphone}
          title={
            <>
              {String(t("pages.marketingSupport.title")).split('\n').map((line: string, i: number) => (
                <span key={i}>
                  {line}
                  {i < t("pages.marketingSupport.title").split('\n').length - 1 && <br className="hidden sm:block" />}
                </span>
              ))}
            </>
          }
          description={
            <>
              {String(t("pages.marketingSupport.subtitle")).split('\n').map((line: string, i: number) => (
                <span key={i}>
                  {line}
                  {i < t("pages.marketingSupport.subtitle").split('\n').length - 1 && <br className="hidden sm:block" />}
                </span>
              ))}
            </>
          }
        />

        <section className="py-12 sm:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <SectionHeader title={t("pages.marketingSupport.servicesTitle")} />

              <div className="space-y-6 sm:space-y-8">
                <ServiceCard
                  icon={Camera}
                  title={t("pages.marketingSupport.contentTitle")}
                  items={Array.isArray(t("pages.marketingSupport.contentItems", { returnObjects: true })) 
                    ? (t("pages.marketingSupport.contentItems", { returnObjects: true }) as string[])
                    : []}
                />
                <ServiceCard
                  icon={Share2}
                  title={t("pages.marketingSupport.snsTitle")}
                  items={Array.isArray(t("pages.marketingSupport.snsItems", { returnObjects: true })) 
                    ? (t("pages.marketingSupport.snsItems", { returnObjects: true }) as string[])
                    : []}
                />
                <ServiceCard
                  icon={TrendingUp}
                  title={t("pages.marketingSupport.marketingTitle")}
                  items={Array.isArray(t("pages.marketingSupport.marketingItems", { returnObjects: true })) 
                    ? (t("pages.marketingSupport.marketingItems", { returnObjects: true }) as string[])
                    : []}
                />
                <ServiceCard
                  icon={Megaphone}
                  title={t("pages.marketingSupport.brandTitle")}
                  items={Array.isArray(t("pages.marketingSupport.brandItems", { returnObjects: true })) 
                    ? (t("pages.marketingSupport.brandItems", { returnObjects: true }) as string[])
                    : []}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <SectionHeader title={t("pages.marketingSupport.featuresTitle")} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <FeatureCard
                  icon={Zap}
                  text={t("pages.marketingSupport.features.feature1")}
                />
                <FeatureCard
                  icon={Users}
                  text={t("pages.marketingSupport.features.feature2")}
                />
                <FeatureCard
                  icon={Shield}
                  text={t("pages.marketingSupport.features.feature3")}
                />
                <FeatureCard
                  icon={Clock}
                  text={t("pages.marketingSupport.features.feature4")}
                />
              </div>
            </div>
          </div>
        </section>

        <CTASection
          title={t("pages.marketingSupport.ctaTitle")}
          description={t("pages.marketingSupport.ctaDescription")}
        />
      </main>
      <Footer />
      <TopButton />
    </div>
  )
}
