"use client"

import { Footer } from "@/components/footer"
import { TopButton } from "@/components/top-button"
import { Building, BookOpen, Users, Briefcase, TrendingUp, Shield, Clock, Award } from "lucide-react"
import { PageHeroSection } from "@/components/sections/page-hero-section"
import { ServiceCard } from "@/components/sections/service-card"
import { FeatureCard } from "@/components/sections/feature-card"
import { CTASection } from "@/components/sections/cta-section"
import { SectionHeader } from "@/components/sections/section-header"
import { useT } from "@/components/i18n/use-t"

export default function ConsultingPage() {
  const { t } = useT()
  return (
    <div className="min-h-screen bg-white">
      <main>
        <PageHeroSection
          icon={Building}
          title={t("pages.consulting.title")}
          description={
            <>
              {String(t("pages.consulting.subtitle")).split('\n').map((line: string, i: number) => (
                <span key={i}>
                  {line}
                  {i < t("pages.consulting.subtitle").split('\n').length - 1 && <br className="hidden sm:block" />}
                </span>
              ))}
            </>
          }
        />

        <section className="py-12 sm:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <SectionHeader title={t("pages.consulting.servicesTitle")} />

              <div className="space-y-6 sm:space-y-8">
                <ServiceCard
                  icon={BookOpen}
                  title={t("pages.consulting.establishmentTitle")}
                  description={t("pages.consulting.establishmentDescription")}
                />
                <ServiceCard
                  icon={Briefcase}
                  title={t("pages.consulting.jobTitle")}
                  description={t("pages.consulting.jobDescription")}
                />
                <ServiceCard
                  icon={Users}
                  title={t("pages.consulting.recruitmentTitle")}
                  description={t("pages.consulting.recruitmentDescription")}
                />
                <ServiceCard
                  icon={Award}
                  title={t("pages.consulting.operationTitle")}
                  description={t("pages.consulting.operationDescription")}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <SectionHeader title={t("pages.consulting.featuresTitle")} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <FeatureCard
                  icon={TrendingUp}
                  text={t("pages.consulting.features.feature1")}
                />
                <FeatureCard
                  icon={Shield}
                  text={t("pages.consulting.features.feature2")}
                />
                <FeatureCard
                  icon={Users}
                  text={t("pages.consulting.features.feature3")}
                />
                <FeatureCard
                  icon={Clock}
                  text={t("pages.consulting.features.feature4")}
                />
              </div>
            </div>
          </div>
        </section>

        <CTASection
          title={t("pages.consulting.ctaTitle")}
          description={t("pages.consulting.ctaDescription")}
        />
      </main>
      <Footer />
      <TopButton />
    </div>
  )
}
