"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { memo } from "react"
import { useT } from "@/components/i18n/use-t"

export const BusinessSection = memo(function BusinessSection() {
  const { t } = useT()
  const services = [
    {
      icon: "🔹",
      title: t("business.officeSupport.title"),
      subtitle: t("business.officeSupport.subtitle"),
      description: t("business.officeSupport.description"),
      href: "/business/office-support",
    },
    {
      icon: "🔹",
      title: t("business.itSupport.title"),
      subtitle: t("business.itSupport.subtitle"),
      description: t("business.itSupport.description"),
      href: "/business/it-support",
    },
    {
      icon: "🔹",
      title: t("business.marketingSupport.title"),
      subtitle: t("business.marketingSupport.subtitle"),
      description: t("business.marketingSupport.description"),
      href: "/business/marketing-support",
    },
    {
      icon: "🔹",
      title: t("business.consulting.title"),
      subtitle: t("business.consulting.subtitle"),
      description: t("business.consulting.description"),
      href: "/business/consulting",
    },
  ]

  return (
    <section id="business" className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance mb-8">{t("business.title")}</h2>

          <Card className="border-none shadow-lg mb-12 before:hidden">
            <CardContent className="p-8 sm:p-12">
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground mb-3 sm:mb-4">
                {t("business.description1")}
              </p>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground">
                {t("business.description2")}
              </p>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service, index) => (
              <Link key={index} href={service.href} prefetch={true}>
                <Card className="border-2 hover:border-primary/50 transition-colors shadow-sm cursor-pointer h-full before:hidden border-l-2">
                  <CardHeader>
                    <CardTitle className="flex items-start gap-3">
                      <span className="text-2xl">{service.icon}</span>
                      <div>
                        <div className="text-lg font-bold text-foreground">{service.title}</div>
                        {service.subtitle && (
                          <div className="text-sm font-normal text-muted-foreground mt-1">{service.subtitle}</div>
                        )}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
})
