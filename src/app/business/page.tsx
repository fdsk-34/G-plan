import { Footer } from "@/components/footer"
import { TopButton } from "@/components/top-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Laptop, Megaphone, Users } from "lucide-react"
import Link from "next/link"
import { t, getServerLocale } from "@/lib/translations"
import { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  return {
    title: `${t("navigation.business", locale)} | 지플랜(GPLAN)`,
    description: t("pages.business.pageSubtitle", locale) as string,
    alternates: {
      canonical: "/business",
    },
  }
}

// 서버 컴포넌트로 변경하여 검색엔진이 실제 텍스트를 크롤링할 수 있도록 함
export default async function BusinessPage() {
  // 서버 사이드에서 언어 감지 및 번역 데이터 직접 로드
  const locale = await getServerLocale()
  const pageTitle = t("pages.business.pageTitle", locale)
  const pageSubtitle = t("pages.business.pageSubtitle", locale)
  const description1 = t("business.description1", locale)
  const description2 = t("business.description2", locale)
  
  const services = [
    {
      icon: FileText,
      title: t("business.officeSupport.title", locale),
      subtitle: t("business.officeSupport.subtitle", locale),
      description: t("business.officeSupport.description", locale),
      href: "/business/office-support",
    },
    {
      icon: Laptop,
      title: t("business.itSupport.title", locale),
      subtitle: t("business.itSupport.subtitle", locale),
      description: t("business.itSupport.description", locale),
      href: "/business/it-support",
    },
    {
      icon: Megaphone,
      title: t("business.marketingSupport.title", locale),
      subtitle: t("business.marketingSupport.subtitle", locale),
      description: t("business.marketingSupport.description", locale),
      href: "/business/marketing-support",
    },
    {
      icon: Users,
      title: t("business.consulting.title", locale),
      subtitle: t("business.consulting.subtitle", locale),
      description: t("business.consulting.description", locale),
      href: "/business/consulting",
    },
  ]

  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section - 서버 사이드 렌더링으로 검색엔진이 실제 텍스트를 볼 수 있음 */}
        <section className="py-16 sm:py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-4 sm:mb-6 px-4">
                {pageTitle}
              </h1>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-600 max-w-3xl mx-auto px-4">
                {pageSubtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-12 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
              <Card className="border-none shadow-lg mb-10 sm:mb-16 before:hidden">
                <CardContent className="p-6 sm:p-8 md:p-12">
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-gray-600 mb-3 sm:mb-4">
                    {description1}
                  </p>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-gray-600">
                    {description2}
                  </p>
                </CardContent>
              </Card>

              {/* Service Cards */}
              <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
                {services.map((service, index) => {
                  const IconComponent = service.icon
                  return (
                    <Link key={index} href={service.href} prefetch={true} className="min-h-[44px]">
                      <Card className="border-2 hover:border-orange-500/50 transition-all hover:shadow-lg h-full cursor-pointer group before:hidden border-l-2">
                        <CardHeader className="p-4 sm:p-6">
                          <CardTitle className="flex items-start gap-3 sm:gap-4">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-gray-900 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-600 transition-colors">
                              <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{service.title}</div>
                              <div className="text-xs sm:text-sm font-normal text-gray-500">{service.subtitle}</div>
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6 pt-0">
                          <p className="text-[11px] sm:text-xs md:text-sm leading-relaxed text-gray-600">{service.description}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <TopButton />
    </div>
  )
}
