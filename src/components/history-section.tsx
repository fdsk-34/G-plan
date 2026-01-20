"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useT } from "@/components/i18n/use-t"

export function HistorySection() {
  const { t } = useT()
  const historyItems = [
    {
      date: t("history.item1.date"),
      content: t("history.item1.content"),
    },
    {
      date: t("history.item2.date"),
      content: t("history.item2.content"),
    },
    {
      date: t("history.item3.date"),
      content: t("history.item3.content"),
    },
  ]

  return (
    <section id="history" className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground text-balance">{t("history.title")}</h3>
          <div className="mt-8 sm:mt-12 space-y-4 sm:space-y-6">
            {historyItems.map((item, index) => (
              <Card key={index} className="border-l-4 border-l-primary shadow-sm before:hidden">
                <CardContent className="p-4 sm:p-6">
                  <time className="font-semibold text-primary leading-7 text-base sm:text-lg md:text-xl lg:text-2xl">{item.date}</time>
                  <p className="mt-2 text-foreground text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">{item.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
