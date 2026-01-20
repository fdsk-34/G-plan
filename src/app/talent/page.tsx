import { Footer } from "@/components/footer"
import { TopButton } from "@/components/top-button"
import { Users } from "lucide-react"
import { t, getServerLocale } from "@/lib/translations"
import { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  return {
    title: `${t("navigation.talent", locale)} | 지플랜(GPLAN)`,
    description: t("pages.talent.subtitle", locale) as string,
    alternates: {
      canonical: "/talent",
    },
  }
}

export default async function TalentPage() {
  const locale = await getServerLocale()
  
  const talents = [
    {
      title: t("talent.gather.title", locale) as string,
      subtitle: t("talent.gather.subtitle", locale) as string,
      description: t("talent.gather.description", locale) as string,
    },
    {
      title: t("talent.growth.title", locale) as string,
      subtitle: t("talent.growth.subtitle", locale) as string,
      description: t("talent.growth.description", locale) as string,
    },
    {
      title: t("talent.give.title", locale) as string,
      subtitle: t("talent.give.subtitle", locale) as string,
      description: t("talent.give.description", locale) as string,
    },
    {
      title: t("talent.grace.title", locale) as string,
      subtitle: t("talent.grace.subtitle", locale) as string,
      description: t("talent.grace.description", locale) as string,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-gray-50 to-white pb-16 sm:pb-20 pt-24 sm:pt-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl text-center">
              <div className="mb-6 sm:mb-8 inline-flex h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 items-center justify-center rounded-2xl sm:rounded-3xl bg-gray-900 shadow-lg">
                <Users className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-white" />
              </div>
              <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-gray-900 px-4">{t("pages.talent.title", locale) as string}</h1>
              <div className="mx-auto mb-6 sm:mb-8 h-1 w-16 sm:w-24 bg-gray-900"></div>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-gray-600 px-4">
                {t("pages.talent.subtitle", locale) as string}
              </p>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-12 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-4 sm:mb-6 flex items-center">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{t("pages.talent.introTitle", locale) as string}</h2>
              <div className="ml-2 sm:ml-4 h-px flex-1 bg-gradient-to-r from-orange-400 to-transparent"></div>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 sm:p-6 md:p-8">
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight px-2">
                  {(t("talent.mainTitle", locale) as string).split('\n').map((line, i, arr) => (
                    <span key={i}>
                      {line}
                      {i < arr.length - 1 && <br className="hidden sm:block" />}
                    </span>
                  ))}
                </h3>
                <div className="space-y-3 sm:space-y-4 text-gray-600">
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                    {t("pages.talent.introDescription1", locale) as string}
                  </p>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                    {t("pages.talent.introDescription2", locale) as string}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Talents Grid Section */}
        <section className="bg-white py-12 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-4 sm:mb-6 flex items-center">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{t("pages.talent.talentsTitle", locale) as string}</h2>
              <div className="ml-2 sm:ml-4 h-px flex-1 bg-gradient-to-r from-orange-400 to-transparent"></div>
            </div>
            <div className="grid gap-6 sm:gap-8 sm:grid-cols-2">
              {talents.map((talent, index) => (
                <div
                  key={index}
                  className="group p-6 sm:p-8 bg-white border border-gray-200 rounded-xl sm:rounded-2xl hover:border-gray-900 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-lg sm:rounded-xl bg-gray-900 text-white font-bold text-xl sm:text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {talent.title[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="mb-3 sm:mb-4">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{talent.title}</h3>
                        <p className="text-sm sm:text-base text-gray-500 font-medium mt-1">{talent.subtitle}</p>
                      </div>
                      <p className="text-sm sm:text-base leading-relaxed text-gray-600">{talent.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <TopButton />
    </div>
  )
}