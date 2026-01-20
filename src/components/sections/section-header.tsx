type SectionHeaderProps = {
  title: string
  className?: string
  description?: string
}

export function SectionHeader({ title, className = "", description }: SectionHeaderProps) {
  return (
    <div className={`text-center mb-10 sm:mb-16 ${className}`}>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 px-4">{title}</h2>
      <div className="w-12 sm:w-16 h-1 bg-gray-900 mx-auto"></div>
      {description && (
        <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
          {description}
        </p>
      )}
    </div>
  )
}

