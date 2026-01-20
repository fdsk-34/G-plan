"use client"


import Image from "next/image"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { startTransition } from "react"
import { Phone, Mail } from "lucide-react"
import { imagePaths } from "@/lib/image-paths"
import { useT } from "@/components/i18n/use-t"

export function Footer() {
  const { t, lang } = useT()
  const router = useRouter()
  const pathname = usePathname()
  
  const isEnglish = lang === "en"
  const linkPrefix = isEnglish ? "/en" : ""
  
  /**
   * 섹션 스크롤 핸들러 (SEO 최적화: URL에 해시 없이 스크롤)
   */
  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, scrollTo: string) => {
    e.preventDefault()
    const targetPath = isEnglish ? "/en" : "/"

    if (pathname === targetPath) {
      // 이미 메인 페이지에 있으면 바로 스크롤
      const element = document.getElementById(scrollTo)
      if (element) {
        const headerOffset = 80
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    } else {
      // 다른 페이지에서 메인 페이지로 이동 후 스크롤 (sessionStorage로 전달)
      sessionStorage.setItem("scrollToSection", scrollTo)
      startTransition(() => {
        router.push(targetPath)
      })
    }
  }

  // 레거시 호환용 핸들러
  const handleHashLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const hash = href.split("#")[1]
    if (hash) {
      handleScrollClick(e, hash)
    }
  }
  return (
    <footer className="bg-[#004457] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Left Column - Logo and Tagline */}
          <div className="space-y-4">
            <Image
              src={imagePaths.brand.logoWhite}
              alt="GPLAN - We Make Bliss"
              width={180}
              height={60}
              className="h-auto w-auto max-w-[180px]"
            />
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              {t("footer.tagline")}
            </p>
            {/* Social Media Icons */}
            <div className="flex gap-3 sm:gap-4 pt-2">
              <Link
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors min-h-[44px] min-w-[44px]"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors min-h-[44px] min-w-[44px]"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Link>
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors min-h-[44px] min-w-[44px]"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Center Column - Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-[#FF7A00]">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={linkPrefix || "/"}
                  prefetch={true}
                  onClick={(e) => handleScrollClick(e, "about")}
                  className="text-xs sm:text-sm text-blue-100 hover:text-white transition-colors min-h-[44px] flex items-center"
                >
                  {t("footer.companyIntro")}
                </Link>
              </li>
              <li>
                <Link
                  href={`${linkPrefix}/business`}
                  prefetch={true}
                  className="text-xs sm:text-sm text-blue-100 hover:text-white transition-colors min-h-[44px] flex items-center"
                >
                  {t("navigation.business")}
                </Link>
              </li>
              <li>
                <Link
                  href={linkPrefix || "/"}
                  prefetch={true}
                  onClick={(e) => handleScrollClick(e, "ci")}
                  className="text-xs sm:text-sm text-blue-100 hover:text-white transition-colors min-h-[44px] flex items-center"
                >
                  CI
                </Link>
              </li>
              <li>
                <Link
                  href={`${linkPrefix}/talent`}
                  prefetch={true}
                  className="text-xs sm:text-sm text-blue-100 hover:text-white transition-colors min-h-[44px] flex items-center"
                >
                  {t("navigation.talent")}
                </Link>
              </li>
              <li>
                <Link
                  href={`${linkPrefix}/inquiry`}
                  prefetch={true}
                  className="text-xs sm:text-sm text-blue-100 hover:text-white transition-colors min-h-[44px] flex items-center"
                >
                  {t("navigation.inquiry")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Column - Contact Information */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-[#FF7A00]">{t("footer.contact")}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-xs sm:text-sm text-blue-100">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <a
                  href="tel:0507-1346-6756"
                  className="hover:text-white transition-colors min-h-[44px] flex items-center"
                >
                  0507-1346-6756
                </a>
              </li>
              <li className="flex items-center gap-3 text-xs sm:text-sm text-blue-100">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <a
                  href="mailto:sypark@gplanworld.com"
                  className="hover:text-white transition-colors min-h-[44px] flex items-center break-all"
                >
                  sypark@gplanworld.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-white/10 mt-8 pt-6 text-center">
          <p className="text-xs text-blue-200">{t("footer.copyright", { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  )
}