import { LucideIcon } from "lucide-react"

type ServiceCardProps = {
  icon: LucideIcon
  title: string
  description?: string
  items?: string[]
  className?: string
}

export function ServiceCard({ icon: Icon, title, description, items, className = "" }: ServiceCardProps) {
  return (
    <div className={`group relative p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-white border border-gray-200 hover:border-gray-900 transition-all duration-300 hover:shadow-xl ${className}`}>
      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 md:gap-8">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gray-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">{title}</h3>
          {description && (
            <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">{description}</p>
          )}
          {items && Array.isArray(items) && items.length > 0 && (
            <ul className="space-y-2 sm:space-y-3 text-gray-600 text-sm sm:text-base md:text-lg mt-4">
              {items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-900 mt-2.5 flex-shrink-0"></span>
                  <span className="break-words">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

