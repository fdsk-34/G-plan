"use client"

import { Footer } from "@/components/footer"
import { TopButton } from "@/components/top-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Laptop, Megaphone, Users } from "lucide-react"
import Link from "next/link"
import { useT } from "@/components/i18n/use-t"
import { useEffect } from "react"
import { usePathname } from "next/navigation"

interface BusinessPageClientProps {
  lang?: "ko" | "en"
}

export default function BusinessPageClient({ lang = "ko" }: BusinessPageClientProps) {
  const { t, setLang } = useT()
  const pathname = usePathname()
  const isEnglish = lang === "en" || pathname?.startsWith("/en")
  
  useEffect(() => {
    if (lang) {
      setLang(lang)
    }
  }, [lang, setLang])
  
  const linkPrefix = isEnglish ? "/en" : ""
  
  const services = [
    {
      icon: FileText,
      title: t("business.officeSupport.title"),
      subtitle: t("business.officeSupport.subtitle"),
      description: t("business.officeSupport.description"),
      href: `${linkPrefix}/business/office-support`,
    },
    {
      icon: Laptop,
      title: t("business.itSupport.title"),
      subtitle: t("business.itSupport.subtitle"),
      description: t("business.itSupport.description"),
      href: `${linkPrefix}/business/it-support`,
    },
    {
      icon: Megaphone,
      title: t("business.marketingSupport.title"),
      subtitle: t("business.marketingSupport.subtitle"),
      description: t("business.marketingSupport.description"),
      href: `${linkPrefix}/business/marketing-support`,
    },
    {
      icon: Users,
      title: t("business.consulting.title"),
      subtitle: t("business.consulting.subtitle"),
      description: t("business.consulting.description"),
      href: `${linkPrefix}/business/consulting`,
    },
  ]

  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="py-16 sm:py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-4 sm:mb-6 px-4">
                {t("pages.business.pageTitle")}
              </h1>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-600 max-w-3xl mx-auto px-4">
                {t("pages.business.pageSubtitle")}
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
                    {t("business.description1")}
                  </p>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-gray-600">
                    {t("business.description2")}
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
