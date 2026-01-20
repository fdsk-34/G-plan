"use client";

import { useState, useCallback, startTransition, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { useT } from "@/components/i18n/use-t";
import { useHasMounted } from "@/hooks/use-has-mounted";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { t, lang, setLang } = useT();
  const router = useRouter();
  const pathname = usePathname();

  const hasMounted = useHasMounted();

  const isKorean = lang === "ko";
  const linkPrefix = isKorean ? "" : "/en";

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const megaMenuCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const languageCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const lastPathname = useRef(pathname);
  useEffect(() => {
    if (lastPathname.current !== pathname) {
      if (pathname?.startsWith("/en")) {
        setLang("en");
      } else {
        setLang("ko");
      }
      lastPathname.current = pathname;
    }
  }, [pathname, setLang]);

  const companyItems = [
    { href: "/", label: hasMounted ? t("navigation.about") : "About Us", scrollTo: "about" },
    { href: "/", label: hasMounted ? t("navigation.history") : "History", scrollTo: "history" },
    { href: "/", label: hasMounted ? t("navigation.mission") : "Mission", scrollTo: "mission" },
    { href: "/", label: hasMounted ? t("navigation.vision") : "Vision", scrollTo: "vision" },
    { href: "/", label: hasMounted ? t("navigation.values") : "Core Values", scrollTo: "core-values" },
    { href: "/", label: hasMounted ? t("navigation.ci") : "CI/BI", scrollTo: "ci" },
  ];

  const businessItems = [
    { href: "/business/office-support", label: hasMounted ? t("navigation.officeSupport") : "Office Support" },
    { href: "/business/it-support", label: hasMounted ? t("navigation.itSupport") : "IT Support" },
    { href: "/business/marketing-support", label: hasMounted ? t("navigation.marketingSupport") : "Marketing Support" },
    { href: "/business/consulting", label: hasMounted ? t("navigation.consulting") : "Consulting" },
  ];

  const handleLinkClick = useCallback(() => {
    setIsMenuOpen(false);
    setIsMegaMenuOpen(false);
  }, []);

  const handleScrollClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, scrollTo: string) => {
      e.preventDefault();
      e.stopPropagation();
      handleLinkClick();

      const targetPath = lang === "en" ? "/en" : "/";

      if (pathname === "/" || pathname === "/en") {
        const element = document.getElementById(scrollTo);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      } else {
        sessionStorage.setItem("scrollToSection", scrollTo);
        startTransition(() => {
          router.push(targetPath);
        });
      }
    },
    [pathname, router, handleLinkClick, lang]
  );

  const closeAllDropdowns = useCallback(() => {
    setIsMegaMenuOpen(false);
    setIsLanguageOpen(false);
  }, []);

  const toggleDropdown = useCallback((dropdownType: "mega" | "language") => {
    setIsMegaMenuOpen((prev) => (dropdownType === "mega" ? !prev : false));
    setIsLanguageOpen((prev) => (dropdownType === "language" ? !prev : false));
  }, []);

  const handleLanguageChange = useCallback(
    (language: "ko" | "en") => {
      if (lang === language) {
        setIsLanguageOpen(false);
        return;
      }

      setLang(language);
      setIsLanguageOpen(false);

      if (language === "en") {
        const newPath = pathname?.startsWith("/en") ? pathname : `/en${pathname === "/" ? "" : pathname}`;
        startTransition(() => {
          router.push(newPath);
        });
      } else {
        const newPath = pathname?.startsWith("/en") ? pathname.replace(/^\/en/, "") || "/" : pathname;
        startTransition(() => {
          router.push(newPath);
        });
      }
    },
    [setLang, lang, pathname, router]
  );

  useEffect(() => {
    if (!isTouchDevice) return;
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest("[data-dropdown]") &&
        !target.closest("[data-dropdown-menu]") &&
        !target.closest('button[aria-label="Toggle menu"]')
      ) {
        closeAllDropdowns();
      }
    };
    document.addEventListener("click", handleClickOutside, false);
    return () => document.removeEventListener("click", handleClickOutside, false);
  }, [closeAllDropdowns, isTouchDevice]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 overflow-visible">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
        <div className="flex h-16 items-center justify-between overflow-visible">
          <Logo
            href={linkPrefix || "/"}
            className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const targetHome = linkPrefix || "/";
              sessionStorage.setItem("forceSplash", "true");
              if (pathname === targetHome) {
                window.scrollTo({ top: 0, behavior: "smooth" });
                window.dispatchEvent(new Event("show-splash"));
              } else {
                startTransition(() => {
                  router.push(targetHome);
                });
              }
            }}
          />

          <nav
            className="hidden md:flex flex-1 items-center justify-center overflow-visible h-full"
            onMouseEnter={() => {
              if (megaMenuCloseTimeoutRef.current) {
                clearTimeout(megaMenuCloseTimeoutRef.current);
                megaMenuCloseTimeoutRef.current = null;
              }
              setIsMegaMenuOpen(true);
            }}
            onMouseLeave={() => {
              megaMenuCloseTimeoutRef.current = setTimeout(() => {
                setIsMegaMenuOpen(false);
              }, 150);
            }}
          >
            <div className="flex items-center space-x-12 overflow-visible h-full">
              <div className="relative h-full flex items-center">
                <Link
                  href={linkPrefix || "/"}
                  className="text-[15px] font-bold text-gray-900 hover:text-[#FF7A00] transition-colors py-5"
                  onClick={(e) => {
                    if (isTouchDevice) {
                      e.preventDefault();
                      toggleDropdown("mega");
                    } else {
                      handleScrollClick(e, "about");
                    }
                  }}
                >
                  {hasMounted ? t("navigation.company") : "Company"}
                </Link>
              </div>

              <div className="relative h-full flex items-center">
                <Link
                  href={`${linkPrefix}/talent`}
                  className="text-[15px] font-bold text-gray-900 hover:text-[#FF7A00] transition-colors py-5"
                  onClick={handleLinkClick}
                >
                  {hasMounted ? t("navigation.talent") : "Talent"}
                </Link>
              </div>

              <div className="relative h-full flex items-center">
                <Link
                  href={`${linkPrefix}/business`}
                  className="text-[15px] font-bold text-gray-900 hover:text-[#FF7A00] transition-colors py-5"
                  onClick={handleLinkClick}
                >
                  {hasMounted ? t("navigation.business") : "Business"}
                </Link>
              </div>

              <div className="relative h-full flex items-center">
                <Link
                  href={`${linkPrefix}/contact`}
                  className="text-[15px] font-bold text-gray-900 hover:text-[#FF7A00] transition-colors py-5"
                  onClick={handleLinkClick}
                >
                  {hasMounted ? t("navigation.contact") : "Contact"}
                </Link>
              </div>

              <div className="relative h-full flex items-center">
                <Link
                  href={`${linkPrefix}/inquiry`}
                  className="text-[15px] font-bold text-gray-900 hover:text-[#FF7A00] transition-colors py-5"
                  onClick={handleLinkClick}
                >
                  {hasMounted ? t("navigation.inquiry") : "Inquiry"}
                </Link>
              </div>
            </div>

            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 w-[95%] max-w-5xl bg-white shadow-2xl border border-gray-100 z-[60] transition-all duration-300 transform origin-top rounded-b-2xl ${isMegaMenuOpen ? "opacity-100 visible scale-y-100" : "opacity-0 invisible scale-y-95 pointer-events-none"
                }`}
            >
              <div className="px-8 py-10">
                <div className="grid grid-cols-5 gap-6">
                  <div className="space-y-4">
                    <p className="text-[13px] font-extrabold text-[#FF7A00] uppercase tracking-wider mb-4">
                      {hasMounted ? t("navigation.company") : "Company"}
                    </p>
                    <div className="flex flex-col space-y-2.5">
                      {companyItems.map((item) => (
                        <Link
                          key={item.label}
                          href={linkPrefix || "/"}
                          className="text-[14px] font-semibold text-gray-600 hover:text-[#FF7A00] transition-colors"
                          onClick={(e) => {
                            if (item.scrollTo) {
                              handleScrollClick(e, item.scrollTo);
                            } else {
                              handleLinkClick();
                            }
                          }}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 border-l border-gray-100 pl-6">
                    <p className="text-[13px] font-extrabold text-[#FF7A00] uppercase tracking-wider mb-4">
                      {hasMounted ? t("navigation.talent") : "Talent"}
                    </p>
                    <div className="flex flex-col space-y-2.5">
                      <Link
                        href={`${linkPrefix}/talent`}
                        className="text-[14px] font-semibold text-gray-600 hover:text-[#FF7A00] transition-colors"
                        onClick={handleLinkClick}
                      >
                        {hasMounted ? t("navigation.talent") : "Talent"}
                      </Link>
                    </div>
                  </div>

                  <div className="space-y-4 border-l border-gray-100 pl-6">
                    <p
                      className="text-[13px] font-extrabold text-[#FF7A00] uppercase tracking-wider mb-4 cursor-pointer"
                      onClick={() => {
                        handleLinkClick();
                        router.push(`${linkPrefix}/business`);
                      }}
                    >
                      {hasMounted ? t("navigation.business") : "Business"}
                    </p>
                    <div className="flex flex-col space-y-2.5">
                      {businessItems.map((item) => (
                        <Link
                          key={item.label}
                          href={`${linkPrefix}${item.href}`}
                          className="text-[14px] font-semibold text-gray-600 hover:text-[#FF7A00] transition-colors"
                          onClick={handleLinkClick}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 border-l border-gray-100 pl-6">
                    <p className="text-[13px] font-extrabold text-[#FF7A00] uppercase tracking-wider mb-4">
                      {hasMounted ? t("navigation.contact") : "Contact"}
                    </p>
                    <div className="flex flex-col space-y-2.5">
                      <Link
                        href={`${linkPrefix}/contact`}
                        className="text-[14px] font-semibold text-gray-600 hover:text-[#FF7A00] transition-colors"
                        onClick={handleLinkClick}
                      >
                        {hasMounted ? t("navigation.contact") : "Contact"}
                      </Link>
                    </div>
                  </div>

                  <div className="space-y-4 border-l border-gray-100 pl-6">
                    <p className="text-[13px] font-extrabold text-[#FF7A00] uppercase tracking-wider mb-4">
                      {hasMounted ? t("navigation.inquiry") : "Inquiry"}
                    </p>
                    <div className="flex flex-col space-y-2.5">
                      <Link
                        href={`${linkPrefix}/inquiry`}
                        className="text-[14px] font-semibold text-gray-600 hover:text-[#FF7A00] transition-colors"
                        onClick={handleLinkClick}
                      >
                        {hasMounted ? t("navigation.inquiry") : "Inquiry"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <div className="hidden md:flex items-center gap-1">
            <Globe className="w-5 h-5 text-gray-500" />
            <div
              className="relative overflow-visible group"
              data-dropdown="language"
              onMouseEnter={() => {
                if (languageCloseTimeoutRef.current) {
                  clearTimeout(languageCloseTimeoutRef.current);
                  languageCloseTimeoutRef.current = null;
                }
                setIsLanguageOpen(true);
              }}
              onMouseLeave={() => {
                languageCloseTimeoutRef.current = setTimeout(() => {
                  setIsLanguageOpen(false);
                }, 150);
              }}
            >
              <button
                onClick={() => {
                  if (isTouchDevice) {
                    toggleDropdown("language");
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-gray-900 hover:text-gray-900 transition-colors rounded-md bg-transparent h-9"
              >
                {hasMounted ? t("navigation.language") : "Language"}
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isLanguageOpen ? "rotate-180" : ""}`} />
              </button>
              <div
                className={`absolute top-full right-0 pt-2 z-[60] transition-all duration-200 ${isLanguageOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"}`}
                data-dropdown-menu="language"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-32 bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLanguageChange("ko");
                    }}
                    className={`w-full px-4 py-3 text-sm font-semibold text-left transition-colors ${isKorean ? "text-gray-900" : "text-gray-900 hover:bg-[#FF7A00] hover:text-white"}`}
                  >
                    KOR
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLanguageChange("en");
                    }}
                    className={`w-full px-4 py-3 text-sm font-semibold text-left transition-colors ${!isKorean ? "text-gray-900" : "text-gray-900 hover:bg-[#FF7A00] hover:text-white"}`}
                  >
                    ENG
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <div className="flex items-center gap-1 px-2">
              <Globe className="w-5 h-5 text-gray-500" />
              <div className="relative overflow-visible" data-dropdown="language">
                <button
                  onClick={() => toggleDropdown("language")}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-gray-900 hover:text-gray-900 transition-colors rounded-md bg-transparent h-9"
                >
                  {hasMounted ? t("navigation.language") : "Language"}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isLanguageOpen ? "rotate-180" : ""}`} />
                </button>
                <div
                  className={`absolute top-full right-0 mt-1 z-[60] transition-all duration-200 ${isLanguageOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"}`}
                  data-dropdown-menu="language"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="w-32 bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLanguageChange("ko");
                      }}
                      className={`w-full px-4 py-3 text-sm font-semibold text-left transition-colors ${isKorean ? "text-gray-900" : "text-gray-900 hover:bg-[#FF7A00] hover:text-white"}`}
                    >
                      KOR
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLanguageChange("en");
                      }}
                      className={`w-full px-4 py-3 text-sm font-semibold text-left transition-colors ${!isKorean ? "text-gray-900" : "text-gray-900 hover:bg-[#FF7A00] hover:text-white"}`}
                    >
                      ENG
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="pt-2 border-t border-gray-100">
              <span className="text-sm font-bold text-[#FF7A00] py-3 block px-4 uppercase">
                {hasMounted ? t("navigation.company") : "Company"}
              </span>
              {companyItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.scrollTo ? `${linkPrefix || "/"}` : `${linkPrefix}${item.href}`}
                  prefetch={true}
                  onClick={(e) => {
                    if (item.scrollTo) {
                      handleScrollClick(e, item.scrollTo);
                    } else {
                      handleLinkClick();
                    }
                  }}
                  className="block py-3 pl-6 pr-4 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-gray-100">
              <span className="text-sm font-bold text-[#FF7A00] py-3 block px-4 uppercase">
                {hasMounted ? t("navigation.talent") : "Talent"}
              </span>
              <Link
                href={`${linkPrefix}/talent`}
                className="block py-3 pl-6 pr-4 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-colors"
                onClick={handleLinkClick}
              >
                {hasMounted ? t("navigation.talent") : "Talent"}
              </Link>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <span className="text-sm font-bold text-[#FF7A00] py-3 block px-4 uppercase">
                {hasMounted ? t("navigation.business") : "Business"}
              </span>
              <Link
                href={`${linkPrefix}/business`}
                className="block py-3 pl-6 pr-4 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-colors font-bold"
                onClick={handleLinkClick}
              >
                {hasMounted ? t("navigation.business") : "Business"} {hasMounted ? t("footer.viewAll") : "View All"}
              </Link>
              {businessItems.map((item) => (
                <Link
                  key={item.href}
                  href={`${linkPrefix}${item.href}`}
                  prefetch={true}
                  onClick={handleLinkClick}
                  className="block py-3 pl-10 pr-4 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-gray-100">
              <span className="text-sm font-bold text-[#FF7A00] py-3 block px-4 uppercase">
                {hasMounted ? t("navigation.contact") : "Contact"}
              </span>
              <Link
                href={`${linkPrefix}/contact`}
                className="block py-3 pl-6 pr-4 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-colors"
                onClick={handleLinkClick}
              >
                {hasMounted ? t("navigation.contact") : "Contact"}
              </Link>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <span className="text-sm font-bold text-[#FF7A00] py-3 block px-4 uppercase">
                {hasMounted ? t("navigation.inquiry") : "Inquiry"}
              </span>
              <Link
                href={`${linkPrefix}/inquiry`}
                className="block py-3 pl-6 pr-4 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-colors"
                onClick={handleLinkClick}
              >
                {hasMounted ? t("navigation.inquiry") : "Inquiry"}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}