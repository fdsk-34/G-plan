import { LucideIcon } from "lucide-react"

type FeatureCardProps = {
  icon: LucideIcon
  text: string
  className?: string
}

export function FeatureCard({ icon: Icon, text, className = "" }: FeatureCardProps) {
  return (
    <div className={`group p-6 sm:p-8 bg-white rounded-xl sm:rounded-2xl border border-gray-200 hover:border-gray-900 transition-all duration-300 hover:shadow-lg ${className}`}>
      <div className="flex items-start gap-4 sm:gap-6">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gray-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </div>
        </div>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed flex-1 pt-1 sm:pt-2 break-words">
          {text}
        </p>
      </div>
    </div>
  )
}

