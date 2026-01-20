"use client"

import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { MouseEvent } from "react"
import { imagePaths } from "@/lib/image-paths"
import { useT } from "@/components/i18n/use-t"

type LogoProps = {
  href?: string
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
  className?: string
}

/**
 * Global brand logo rendered from the CI color image
 */
export function Logo({
  href = "/",
  onClick,
  className,
}: LogoProps) {
  const { t } = useT()
  return (
    <Link
      href={href}
      suppressHydrationWarning
      className={cn(
        "group flex items-center transition-colors",
        className
      )}
      aria-label={t("logo.homeLink")}
      onClick={onClick}
    >
      <Image
        src="/images/design-mode/gplan-ci-color_1.png"
        alt="GPLAN - We Make Bliss"
        width={120}
        height={40}
        className="h-auto w-auto max-w-[100px] sm:max-w-[120px] object-contain"
        priority
      />
    </Link>
  )
}
