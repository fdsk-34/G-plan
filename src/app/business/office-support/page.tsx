import { Footer } from "@/components/footer"
import { TopButton } from "@/components/top-button"
import { Monitor, FileText, Users, Zap, TrendingUp, Shield, Clock } from "lucide-react"
import { PageHeroSection } from "@/components/sections/page-hero-section"
import { ServiceCard } from "@/components/sections/service-card"
import { FeatureCard } from "@/components/sections/feature-card"
import { CTASection } from "@/components/sections/cta-section"
import { SectionHeader } from "@/components/sections/section-header"
import Image from "next/image"
import { getImagePaths } from "@/lib/image-paths"
import { t, getServerLocale } from "@/lib/translations"

export default async function OfficeSupportPage() {
  const locale = await getServerLocale()
  const imagePaths = getImagePaths(locale)
  return (
    <div className="min-h-screen bg-white">
      <main>
        <PageHeroSection
          icon={Monitor}
          title={t("pages.officeSupport.title", locale) as string}
          description={
            <>
              {String(t("pages.officeSupport.subtitle", locale)).split('\n').map((line: string, i: number, arr: string[]) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br className="hidden sm:block" />}
                </span>
              ))}
            </>
          }
        />

        <section className="py-12 sm:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <SectionHeader title={t("pages.officeSupport.servicesTitle", locale) as string} />

              <div className="space-y-6 sm:space-y-8">
                <ServiceCard
                  icon={Users}
                  title={t("pages.officeSupport.welfareTitle", locale) as string}
                  items={(() => {
                    const items = t("pages.officeSupport.welfareItems", locale)
                    return Array.isArray(items) ? items as string[] : []
                  })()}
                />
                <ServiceCard
                  icon={FileText}
                  title={t("pages.officeSupport.accountingTitle", locale) as string}
                  items={(() => {
                    const items = t("pages.officeSupport.accountingItems", locale)
                    return Array.isArray(items) ? items as string[] : []
                  })()}
                />

                {/* Service 3: RPA Automation */}
                <div className="group relative p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-white border border-gray-200 hover:border-gray-900 transition-all duration-300 hover:shadow-xl">
                  <div className="space-y-6 sm:space-y-8">
                    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 md:gap-8">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gray-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{t("pages.officeSupport.productivityTitle", locale) as string}</h3>
                      </div>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                      <>
                        <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
                          <Image
                            src={imagePaths.services.officeSupport.rpaAutomation}
                            alt={t("pages.officeSupport.rpaAlt", locale) as string}
                            width={800}
                            height={400}
                            className="w-full max-w-3xl mx-auto"
                          />
                        </div>

                        <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
                          <Image
                            src={imagePaths.services.officeSupport.rpaCase}
                            alt={t("pages.officeSupport.rpaCaseAlt", locale) as string}
                            width={800}
                            height={400}
                            className="w-full max-w-3xl mx-auto"
                          />
                        </div>
                      </>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <SectionHeader title={t("pages.officeSupport.featuresTitle", locale) as string} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <FeatureCard
                  icon={TrendingUp}
                  text={t("pages.officeSupport.features.feature1", locale) as string}
                />
                <FeatureCard
                  icon={Shield}
                  text={t("pages.officeSupport.features.feature2", locale) as string}
                />
                <FeatureCard
                  icon={Users}
                  text={t("pages.officeSupport.features.feature3", locale) as string}
                />
                <FeatureCard
                  icon={Clock}
                  text={t("pages.officeSupport.features.feature4", locale) as string}
                />
              </div>
            </div>
          </div>
        </section>

        <CTASection
          title={t("pages.officeSupport.ctaTitle", locale) as string}
          description={t("pages.officeSupport.ctaDescription", locale) as string}
        />
      </main>
      <Footer />
      <TopButton />
    </div>
  )
}
