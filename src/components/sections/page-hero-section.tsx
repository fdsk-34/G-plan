import { LucideIcon } from "lucide-react"

type PageHeroSectionProps = {
  icon: LucideIcon
  title: string | React.ReactNode
  description: string | React.ReactNode
  className?: string
}

export function PageHeroSection({ icon: Icon, title, description, className = "" }: PageHeroSectionProps) {
  return (
    <section className={`relative pt-24 sm:pt-32 pb-16 sm:pb-20 bg-gradient-to-b from-gray-50 to-white ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl sm:rounded-3xl bg-gray-900 mb-6 sm:mb-8 shadow-lg">
            <Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight px-4">
            {typeof title === "string" ? title : title}
          </h1>
          <div className="w-16 sm:w-24 h-1 bg-gray-900 mx-auto mb-6 sm:mb-8"></div>
          <div className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed font-light px-4">
            {typeof description === "string" ? (
              <p>{description}</p>
            ) : (
              description
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

