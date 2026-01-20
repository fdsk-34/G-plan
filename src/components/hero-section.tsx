"use client"

import { useEffect, useState, useTransition, type CSSProperties } from "react"
import { useT } from "@/components/i18n/use-t"
import { useRouter, usePathname } from "next/navigation"

import {
  FileText,
  Laptop,
  Camera,
  MessageSquare,
  Network,
  Zap,
  Video,
  Instagram,
  Crosshair,
  Settings,
  Shield,
  Cpu,
  type LucideIcon,
  Fence as Peace,
} from "lucide-react"

type Particle = {
  id: number
  left: number
  top: number
  duration: number
  delay: number
}

type InnerIconConfig = {
  Icon: LucideIcon
  iconColor: string
  glowClass: string
}

type OuterIconConfig = {
  Icon: LucideIcon
  borderColor: string
  glowClass: string
  iconColor: string
}

const INNER_ICON_CONFIG: InnerIconConfig[] = [
  {
    Icon: Video,
    iconColor: "text-white",
    glowClass: "shadow-[0_0_25px_rgba(255,255,255,0.5)]",
  },
  {
    Icon: MessageSquare,
    iconColor: "text-yellow-400",
    glowClass: "shadow-[0_0_25px_rgba(251,191,36,0.5)]",
  },
  {
    Icon: Network,
    iconColor: "text-green-400",
    glowClass: "shadow-[0_0_25px_rgba(74,222,128,0.5)]",
  },
  {
    Icon: FileText,
    iconColor: "text-orange-400",
    glowClass: "shadow-[0_0_25px_rgba(251,146,60,0.5)]",
  },
  {
    Icon: Zap,
    iconColor: "text-blue-400",
    glowClass: "shadow-[0_0_25px_rgba(96,165,250,0.5)]",
  },
  {
    Icon: Laptop,
    iconColor: "text-blue-300",
    glowClass: "shadow-[0_0_25px_rgba(147,197,253,0.5)]",
  },
  {
    Icon: Camera,
    iconColor: "text-purple-300",
    glowClass: "shadow-[0_0_25px_rgba(216,180,254,0.5)]",
  },
]

const OUTER_ICON_CONFIG: OuterIconConfig[] = [
  {
    Icon: Instagram,
    borderColor: "border-pink-500",
    glowClass: "shadow-[0_0_30px_rgba(236,72,153,0.6)]",
    iconColor: "text-pink-400",
  },
  {
    Icon: Crosshair,
    borderColor: "border-blue-400",
    glowClass: "shadow-[0_0_30px_rgba(96,165,250,0.6)]",
    iconColor: "text-blue-400",
  },
  {
    Icon: Settings,
    borderColor: "border-pink-500",
    glowClass: "shadow-[0_0_30px_rgba(236,72,153,0.6)]",
    iconColor: "text-pink-400",
  },
  {
    Icon: Peace,
    borderColor: "border-cyan-400",
    glowClass: "shadow-[0_0_30px_rgba(34,211,238,0.6)]",
    iconColor: "text-cyan-400",
  },
  {
    Icon: Shield,
    borderColor: "border-teal-400",
    glowClass: "shadow-[0_0_30px_rgba(45,212,191,0.6)]",
    iconColor: "text-teal-400",
  },
  {
    Icon: Cpu,
    borderColor: "border-purple-500",
    glowClass: "shadow-[0_0_30px_rgba(168,85,247,0.6)]",
    iconColor: "text-purple-400",
  },
  {
    Icon: Crosshair,
    borderColor: "border-blue-400",
    glowClass: "shadow-[0_0_30px_rgba(96,165,250,0.6)]",
    iconColor: "text-blue-400",
  },
]

const createParticles = (count: number): Particle[] =>
  Array.from({ length: count }, (_, index) => ({
    id: index,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: 2 + Math.random() * 3,
    delay: Math.random() * 2,
  }))

type HeroSectionProps = {
  onClick?: () => void
}

export function HeroSection({ onClick }: HeroSectionProps) {
  const { t, lang, setLang } = useT()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const [backgroundParticles, setBackgroundParticles] = useState<Particle[]>([])
  const [animationKey, setAnimationKey] = useState(0)

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('HeroSection Lang context update:', lang)
    }
  }, [lang])

  useEffect(() => {
    setBackgroundParticles(createParticles(20))
  }, [])

  const handleClick = () => {
    // 애니메이션을 재시작하기 위해 키를 변경
    setAnimationKey((prev) => prev + 1)
    onClick?.()
  }

  const handleLanguageChange = (e: React.MouseEvent, language: "ko" | "en") => {
    e.preventDefault()
    e.stopPropagation() // 스플래시 클릭 이벤트 방지

    if (lang === language) return

    // 언어 상태 업데이트
    setLang(language)

    // 브라우저 주소창 URL 즉시 동기화 (pushState 사용하여 리마운트 방지)
    const currentPath = window.location.pathname
    let newPath = currentPath

    if (language === "en") {
      newPath = currentPath.startsWith("/en") ? currentPath : `/en${currentPath === "/" ? "" : currentPath}`
    } else {
      newPath = currentPath.startsWith("/en")
        ? currentPath.replace(/^\/en/, "") || "/"
        : currentPath
    }

    if (newPath !== currentPath) {
      window.history.pushState(null, "", newPath)
    }
  }

  return (
    <div className="min-h-screen flex flex-col cursor-pointer bg-[#0f172a]" onClick={handleClick}>
      <section className="relative bg-[#1a2332] min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {backgroundParticles.map((particle) => {
            const style: CSSProperties = {
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animation: `twinkle ${particle.duration}s infinite ${particle.delay}s`,
            }

            return (
              <div
                key={`particle-${particle.id}`}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                style={style}
              />
            )
          })}
        </div>

        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 z-50" onClick={(e) => e.stopPropagation()}>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tighter">GPLAN</h2>
          <p className="text-[10px] sm:text-xs text-blue-400 font-medium tracking-widest uppercase">We Make Bliss</p>
        </div>

        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-50 flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={(e) => handleLanguageChange(e, "ko")}
            className={`px-5 py-2.5 rounded-full text-[13px] font-bold transition-all cursor-pointer ${lang === "ko"
              ? "bg-white text-gray-900 shadow-[0_0_20px_rgba(255,255,255,0.6)] scale-105"
              : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"
              }`}
          >
            KO
          </button>
          <button
            onClick={(e) => handleLanguageChange(e, "en")}
            className={`px-5 py-2.5 rounded-full text-[13px] font-bold transition-all cursor-pointer ${lang === "en"
              ? "bg-white text-gray-900 shadow-[0_0_20px_rgba(255,255,255,0.6)] scale-105"
              : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"
              }`}
          >
            EN
          </button>
        </div>

        <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6">
          <div className="relative w-full aspect-square max-w-[200px] sm:max-w-[350px] md:max-w-[400px] mx-auto">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/30 via-blue-600/20 to-cyan-500/30 animate-pulse-ring-1 pointer-events-none" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/25 via-blue-600/15 to-cyan-500/25 animate-pulse-ring-2 pointer-events-none" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 via-blue-600/10 to-cyan-500/20 animate-pulse-ring-3 pointer-events-none" />

            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/40 via-blue-600/30 to-cyan-500/40 blur-3xl pointer-events-none" />

            <div className="absolute inset-[8%] rounded-full overflow-hidden border-2 border-blue-400/40 shadow-[0_0_60px_rgba(59,130,246,0.4)]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/70 via-cyan-600/60 to-emerald-600/70" />
              <div className="absolute inset-0">
                <div className="absolute top-[15%] right-[5%] w-[50%] h-[55%] bg-gradient-to-br from-teal-500/40 via-emerald-600/35 to-green-700/30 rounded-full blur-2xl" />
                <div className="absolute bottom-[10%] left-[10%] w-[45%] h-[40%] bg-gradient-to-tr from-green-500/35 via-teal-600/30 to-emerald-700/25 rounded-full blur-2xl" />
                <div className="absolute top-[35%] left-[20%] w-[30%] h-[25%] bg-gradient-to-br from-emerald-500/30 to-teal-600/25 rounded-full blur-xl" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div
                className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"
                style={{ clipPath: "circle(35% at 25% 25%)" }}
              />
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center z-30">
              {/* 네이버 SEO 최적화: h1 제거 (홈페이지 메인 콘텐츠에 h1 사용) */}
              <div className="text-xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold text-white mb-1 sm:mb-2 drop-shadow-[0_0_20px_rgba(0,0,0,0.9)] [text-shadow:_0_0_30px_rgb(255_255_255_/_80%),_0_4px_8px_rgb(0_0_0_/_100%)]">
                GPLAN
              </div>
              <p className="text-[9px] sm:text-xs md:text-sm lg:text-lg xl:text-xl text-white/95 tracking-wider font-bold drop-shadow-[0_0_15px_rgba(0,0,0,0.9)] [text-shadow:_0_0_20px_rgb(255_255_255_/_60%),_0_2px_6px_rgb(0_0_0_/_100%)]">
                BUSINESS PLATFORM
              </p>
            </div>

            <div className="absolute inset-0 z-10">
              {INNER_ICON_CONFIG.map((item, index) => {
                const iconBackground = item.iconColor.replace("text-", "bg-")
                const animationStyle: CSSProperties = {
                  left: "50%",
                  top: "50%",
                  animation: `float-free-${index + 1} ${8 + index * 0.8}s ease-in-out infinite`,
                  animationDelay: `${index * 0.5}s`,
                }

                return (
                  <div
                    key={`inner-icon-${index}-${animationKey}`}
                    className="absolute w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                    style={animationStyle}
                  >
                    <div
                      className={`relative w-full h-full rounded-full bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center border border-white/10 ${item.glowClass}`}
                      style={{ background: "rgba(15, 23, 42, 0.85)" }}
                    >
                      <div className={`absolute inset-2 rounded-full ${iconBackground}/15 blur-sm`} />
                      <item.Icon className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${item.iconColor} relative z-10`} />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-transparent to-transparent" />
                      <div className={`absolute inset-0 rounded-full ${iconBackground}/30 blur-xl -z-10`} />
                    </div>
                  </div>
                )
              })}
            </div>

            {OUTER_ICON_CONFIG.map((item, index) => {
              const backgroundColor = item.borderColor.replace("border-", "bg-")
              const animationStyle: CSSProperties = {
                left: "50%",
                top: "50%",
                animation: `float-outer-${index + 1} ${10 + index * 0.7}s ease-in-out infinite`,
                animationDelay: `${index * 0.6}s`,
              }

              return (
                <div
                  key={`outer-icon-${index}-${animationKey}`}
                  className="absolute z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                  style={animationStyle}
                >
                  <div
                    className="absolute w-px bg-gradient-to-b from-white/40 to-transparent origin-bottom"
                    style={{
                      height: "20px",
                      left: "50%",
                      bottom: "100%",
                      transform: "translateX(-50%)",
                    }}
                  />
                  <div
                    className="absolute h-px bg-white/30"
                    style={{ width: "30px", top: "-20px", left: "50%", transform: "translateX(-50%)" }}
                  />
                  <div
                    className={`relative w-full h-full rounded-full ${item.borderColor} border-2 flex items-center justify-center backdrop-blur-md ${item.glowClass}`}
                    style={{ background: "rgba(15, 23, 42, 0.6)" }}
                  >
                    <div className={`absolute inset-1 rounded-full ${backgroundColor}/20 blur-sm`} />
                    <item.Icon className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${item.iconColor} relative z-10`} />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-transparent to-transparent" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="absolute bottom-10 sm:bottom-12 md:bottom-16 left-0 right-0 text-center z-20 px-6" key={`tagline-${lang}`}>
          <h2 className={`font-bold text-white leading-tight mx-auto max-w-[95vw] sm:max-w-[90vw] drop-shadow-2xl ${lang === "en"
            ? "text-[14px] sm:text-lg md:text-2xl lg:text-3xl"
            : "text-[16px] sm:text-2xl md:text-3xl lg:text-4xl"
            }`}>
            <span className="hidden sm:inline">{t("hero.tagline")}</span>
            <span className="sm:hidden">{t("hero.taglineMobile")}</span>
          </h2>
        </div>

        <style jsx>{`
          @keyframes radiate-outward {
            0%,
            100% {
              transform: translate(-50%, -50%) scale(1);
              opacity: 1;
            }
            50% {
              transform: translate(-50%, -50%) scale(1.4);
              opacity: 0.8;
            }
          }

          @keyframes radiate-outer {
            0%,
            100% {
              transform: translate(-50%, -50%) scale(1);
              opacity: 1;
            }
            50% {
              transform: translate(-50%, -50%) scale(1.3);
              opacity: 0.7;
            }
          }

          @keyframes pulse-icon {
            0%,
            100% {
              transform: scale(1) rotate(0deg);
            }
            50% {
              transform: scale(1.1) rotate(5deg);
            }
          }

          @keyframes twinkle {
            0%,
            100% {
              opacity: 0.3;
            }
            50% {
              opacity: 1;
            }
          }

          @keyframes pulse-ring-1 {
            0% {
              transform: scale(1);
              opacity: 0.6;
            }
            50% {
              transform: scale(2.2);
              opacity: 0.3;
            }
            100% {
              transform: scale(3.5);
              opacity: 0;
            }
          }

          @keyframes pulse-ring-2 {
            0% {
              transform: scale(1);
              opacity: 0.5;
            }
            50% {
              transform: scale(2.6);
              opacity: 0.25;
            }
            100% {
              transform: scale(4);
              opacity: 0;
            }
          }

          @keyframes pulse-ring-3 {
            0% {
              transform: scale(1);
              opacity: 0.4;
            }
            50% {
              transform: scale(3);
              opacity: 0.2;
            }
            100% {
              transform: scale(4.5);
              opacity: 0;
            }
          }

          .animate-pulse-ring-1 {
            animation: pulse-ring-1 3s ease-out infinite;
          }

          .animate-pulse-ring-2 {
            animation: pulse-ring-2 3s ease-out infinite 1s;
          }

          .animate-pulse-ring-3 {
            animation: pulse-ring-3 3s ease-out infinite 2s;
          }

          @keyframes float-free-1 {
            0% {
              transform: translate(-50%, -50%) translate(-280px, -120px) rotate(0deg) scale(1);
            }
            20% {
              transform: translate(-50%, -50%) translate(-220px, -180px) rotate(25deg) scale(1.05);
            }
            40% {
              transform: translate(-50%, -50%) translate(-310px, -90px) rotate(50deg) scale(0.95);
            }
            60% {
              transform: translate(-50%, -50%) translate(-250px, -160px) rotate(75deg) scale(1.08);
            }
            80% {
              transform: translate(-50%, -50%) translate(-330px, -130px) rotate(100deg) scale(0.92);
            }
            100% {
              transform: translate(-50%, -50%) translate(-280px, -120px) rotate(120deg) scale(1);
            }
          }

          @keyframes float-free-2 {
            0% {
              transform: translate(-50%, -50%) translate(-260px, 140px) rotate(0deg) scale(1);
            }
            25% {
              transform: translate(-50%, -50%) translate(-200px, 90px) rotate(-30deg) scale(1.1);
            }
            50% {
              transform: translate(-50%, -50%) translate(-320px, 180px) rotate(-60deg) scale(0.9);
            }
            75% {
              transform: translate(-50%, -50%) translate(-240px, 120px) rotate(-90deg) scale(1.05);
            }
            100% {
              transform: translate(-50%, -50%) translate(-260px, 140px) rotate(-120deg) scale(1);
            }
          }

          @keyframes float-free-3 {
            0% {
              transform: translate(-50%, -50%) translate(240px, 160px) rotate(0deg) scale(1);
            }
            30% {
              transform: translate(-50%, -50%) translate(290px, 100px) rotate(40deg) scale(1.12);
            }
            60% {
              transform: translate(-50%, -50%) translate(210px, 200px) rotate(80deg) scale(0.88);
            }
            90% {
              transform: translate(-50%, -50%) translate(270px, 130px) rotate(115deg) scale(1.06);
            }
            100% {
              transform: translate(-50%, -50%) translate(240px, 160px) rotate(140deg) scale(1);
            }
          }

          @keyframes float-free-4 {
            0% {
              transform: translate(-50%, -50%) translate(310px, -90px) rotate(0deg) scale(1);
            }
            22% {
              transform: translate(-50%, -50%) translate(260px, -140px) rotate(-45deg) scale(0.92);
            }
            44% {
              transform: translate(-50%, -50%) translate(340px, -60px) rotate(-90deg) scale(1.15);
            }
            66% {
              transform: translate(-50%, -50%) translate(290px, -120px) rotate(-135deg) scale(0.9);
            }
            88% {
              transform: translate(-50%, -50%) translate(330px, -80px) rotate(-180deg) scale(1.07);
            }
            100% {
              transform: translate(-50%, -50%) translate(310px, -90px) rotate(-210deg) scale(1);
            }
          }

          @keyframes float-free-5 {
            0% {
              transform: translate(-50%, -50%) translate(270px, 210px) rotate(0deg) scale(1);
            }
            18% {
              transform: translate(-50%, -50%) translate(320px, 260px) rotate(35deg) scale(1.1);
            }
            36% {
              transform: translate(-50%, -50%) translate(230px, 180px) rotate(70deg) scale(0.88);
            }
            54% {
              transform: translate(-50%, -50%) translate(300px, 240px) rotate(105deg) scale(1.05);
            }
            72% {
              transform: translate(-50%, -50%) translate(250px, 200px) rotate(140deg) scale(0.93);
            }
            90% {
              transform: translate(-50%, -50%) translate(310px, 220px) rotate(170deg) scale(1.08);
            }
            100% {
              transform: translate(-50%, -50%) translate(270px, 210px) rotate(200deg) scale(1);
            }
          }

          @keyframes float-free-6 {
            0% {
              transform: translate(-50%, -50%) translate(-230px, -190px) rotate(0deg) scale(1);
            }
            28% {
              transform: translate(-50%, -50%) translate(-280px, -140px) rotate(-50deg) scale(0.9);
            }
            56% {
              transform: translate(-50%, -50%) translate(-200px, -230px) rotate(-100deg) scale(1.12);
            }
            84% {
              transform: translate(-50%, -50%) translate(-260px, -170px) rotate(-150deg) scale(0.95);
            }
            100% {
              transform: translate(-50%, -50%) translate(-230px, -190px) rotate(-180deg) scale(1);
            }
          }

          @keyframes float-free-7 {
            0% {
              transform: translate(-50%, -50%) translate(-290px, 100px) rotate(0deg) scale(1);
            }
            20% {
              transform: translate(-50%, -50%) translate(-240px, 150px) rotate(40deg) scale(1.08);
            }
            40% {
              transform: translate(-50%, -50%) translate(-320px, 80px) rotate(80deg) scale(0.92);
            }
            60% {
              transform: translate(-50%, -50%) translate(-270px, 130px) rotate(120deg) scale(1.1);
            }
            80% {
              transform: translate(-50%, -50%) translate(-310px, 90px) rotate(160deg) scale(0.88);
            }
            100% {
              transform: translate(-50%, -50%) translate(-290px, 100px) rotate(200deg) scale(1);
            }
          }

          @keyframes float-outer-1 {
            0% {
              transform: translate(-50%, -50%) translate(-420px, -280px) rotate(0deg) scale(1);
            }
            16% {
              transform: translate(-50%, -50%) translate(-360px, -340px) rotate(30deg) scale(1.08);
            }
            32% {
              transform: translate(-50%, -50%) translate(-480px, -230px) rotate(60deg) scale(0.92);
            }
            48% {
              transform: translate(-50%, -50%) translate(-400px, -310px) rotate(90deg) scale(1.12);
            }
            64% {
              transform: translate(-50%, -50%) translate(-450px, -260px) rotate(120deg) scale(0.88);
            }
            80% {
              transform: translate(-50%, -50%) translate(-380px, -290px) rotate(150deg) scale(1.05);
            }
            100% {
              transform: translate(-50%, -50%) translate(-420px, -280px) rotate(180deg) scale(1);
            }
          }

          @keyframes float-outer-2 {
            0% {
              transform: translate(-50%, -50%) translate(350px, -380px) rotate(0deg) scale(1);
            }
            25% {
              transform: translate(-50%, -50%) translate(410px, -320px) rotate(-40deg) scale(0.9);
            }
            50% {
              transform: translate(-50%, -50%) translate(320px, -420px) rotate(-80deg) scale(1.15);
            }
            75% {
              transform: translate(-50%, -50%) translate(380px, -350px) rotate(-120deg) scale(0.93);
            }
            100% {
              transform: translate(-50%, -50%) translate(350px, -380px) rotate(-160deg) scale(1);
            }
          }

          @keyframes float-outer-3 {
            0% {
              transform: translate(-50%, -50%) translate(460px, 240px) rotate(0deg) scale(1);
            }
            20% {
              transform: translate(-50%, -50%) translate(520px, 190px) rotate(45deg) scale(1.1);
            }
            40% {
              transform: translate(-50%, -50%) translate(420px, 280px) rotate(90deg) scale(0.88);
            }
            60% {
              transform: translate(-50%, -50%) translate(490px, 220px) rotate(135deg) scale(1.08);
            }
            80% {
              transform: translate(-50%, -50%) translate(440px, 260px) rotate(180deg) scale(0.92);
            }
            100% {
              transform: translate(-50%, -50%) translate(460px, 240px) rotate(225deg) scale(1);
            }
          }

          @keyframes float-outer-4 {
            0% {
              transform: translate(-50%, -50%) translate(480px, -160px) rotate(0deg) scale(1);
            }
            18% {
              transform: translate(-50%, -50%) translate(530px, -210px) rotate(-35deg) scale(1.12);
            }
            36% {
              transform: translate(-50%, -50%) translate(440px, -120px) rotate(-70deg) scale(0.85);
            }
            54% {
              transform: translate(-50%, -50%) translate(510px, -180px) rotate(-105deg) scale(1.05);
            }
            72% {
              transform: translate(-50%, -50%) translate(460px, -140px) rotate(-140deg) scale(0.9);
            }
            90% {
              transform: translate(-50%, -50%) translate(500px, -190px) rotate(-175deg) scale(1.1);
            }
            100% {
              transform: translate(-50%, -50%) translate(480px, -160px) rotate(-210deg) scale(1);
            }
          }

          @keyframes float-outer-5 {
            0% {
              transform: translate(-50%, -50%) translate(-380px, 300px) rotate(0deg) scale(1);
            }
            22% {
              transform: translate(-50%, -50%) translate(-430px, 350px) rotate(50deg) scale(0.92);
            }
            44% {
              transform: translate(-50%, -50%) translate(-340px, 270px) rotate(100deg) scale(1.15);
            }
            66% {
              transform: translate(-50%, -50%) translate(-400px, 320px) rotate(150deg) scale(0.88);
            }
            88% {
              transform: translate(-50%, -50%) translate(-360px, 290px) rotate(200deg) scale(1.08);
            }
            100% {
              transform: translate(-50%, -50%) translate(-380px, 300px) rotate(250deg) scale(1);
            }
          }

          @keyframes float-outer-6 {
            0% {
              transform: translate(-50%, -50%) translate(390px, 350px) rotate(0deg) scale(1);
            }
            28% {
              transform: translate(-50%, -50%) translate(450px, 300px) rotate(-45deg) scale(1.1);
            }
            56% {
              transform: translate(-50%, -50%) translate(350px, 390px) rotate(-90deg) scale(0.87);
            }
            84% {
              transform: translate(-50%, -50%) translate(420px, 330px) rotate(-135deg) scale(1.08);
            }
            100% {
              transform: translate(-50%, -50%) translate(390px, 350px) rotate(-180deg) scale(1);
            }
          }

          @keyframes float-outer-7 {
            0% {
              transform: translate(-50%, -50%) translate(-480px, -140px) rotate(0deg) scale(1);
            }
            17% {
              transform: translate(-50%, -50%) translate(-530px, -190px) rotate(40deg) scale(0.9);
            }
            34% {
              transform: translate(-50%, -50%) translate(-440px, -100px) rotate(80deg) scale(1.13);
            }
            51% {
              transform: translate(-50%, -50%) translate(-510px, -160px) rotate(120deg) scale(0.92);
            }
            68% {
              transform: translate(-50%, -50%) translate(-460px, -120px) rotate(160deg) scale(1.07);
            }
            85% {
              transform: translate(-50%, -50%) translate(-500px, -170px) rotate(200deg) scale(0.88);
            }
            100% {
              transform: translate(-50%, -50%) translate(-480px, -140px) rotate(240deg) scale(1);
            }
          }

          /* 모바일용 애니메이션 - 더 작은 범위 */
          @media (max-width: 767px) {
            @keyframes float-free-1 {
              0% {
                transform: translate(-50%, -50%) translate(-110px, -50px) rotate(0deg) scale(1);
              }
              20% {
                transform: translate(-50%, -50%) translate(-90px, -70px) rotate(25deg) scale(1.05);
              }
              40% {
                transform: translate(-50%, -50%) translate(-120px, -40px) rotate(50deg) scale(0.95);
              }
              60% {
                transform: translate(-50%, -50%) translate(-100px, -60px) rotate(75deg) scale(1.08);
              }
              80% {
                transform: translate(-50%, -50%) translate(-130px, -50px) rotate(100deg) scale(0.92);
              }
              100% {
                transform: translate(-50%, -50%) translate(-110px, -50px) rotate(120deg) scale(1);
              }
            }

            @keyframes float-free-2 {
              0% {
                transform: translate(-50%, -50%) translate(-100px, 60px) rotate(0deg) scale(1);
              }
              25% {
                transform: translate(-50%, -50%) translate(-80px, 40px) rotate(-30deg) scale(1.1);
              }
              50% {
                transform: translate(-50%, -50%) translate(-120px, 75px) rotate(-60deg) scale(0.9);
              }
              75% {
                transform: translate(-50%, -50%) translate(-95px, 50px) rotate(-90deg) scale(1.05);
              }
              100% {
                transform: translate(-50%, -50%) translate(-100px, 60px) rotate(-120deg) scale(1);
              }
            }

            @keyframes float-free-3 {
              0% {
                transform: translate(-50%, -50%) translate(95px, 65px) rotate(0deg) scale(1);
              }
              30% {
                transform: translate(-50%, -50%) translate(115px, 40px) rotate(40deg) scale(1.12);
              }
              60% {
                transform: translate(-50%, -50%) translate(85px, 80px) rotate(80deg) scale(0.88);
              }
              90% {
                transform: translate(-50%, -50%) translate(105px, 55px) rotate(115deg) scale(1.06);
              }
              100% {
                transform: translate(-50%, -50%) translate(95px, 65px) rotate(140deg) scale(1);
              }
            }

            @keyframes float-free-4 {
              0% {
                transform: translate(-50%, -50%) translate(120px, -40px) rotate(0deg) scale(1);
              }
              22% {
                transform: translate(-50%, -50%) translate(100px, -55px) rotate(-45deg) scale(0.92);
              }
              44% {
                transform: translate(-50%, -50%) translate(135px, -25px) rotate(-90deg) scale(1.15);
              }
              66% {
                transform: translate(-50%, -50%) translate(115px, -50px) rotate(-135deg) scale(0.9);
              }
              88% {
                transform: translate(-50%, -50%) translate(130px, -35px) rotate(-180deg) scale(1.07);
              }
              100% {
                transform: translate(-50%, -50%) translate(120px, -40px) rotate(-210deg) scale(1);
              }
            }

            @keyframes float-free-5 {
              0% {
                transform: translate(-50%, -50%) translate(105px, 85px) rotate(0deg) scale(1);
              }
              18% {
                transform: translate(-50%, -50%) translate(125px, 105px) rotate(35deg) scale(1.1);
              }
              36% {
                transform: translate(-50%, -50%) translate(90px, 75px) rotate(70deg) scale(0.88);
              }
              54% {
                transform: translate(-50%, -50%) translate(120px, 95px) rotate(105deg) scale(1.05);
              }
              72% {
                transform: translate(-50%, -50%) translate(100px, 85px) rotate(140deg) scale(0.93);
              }
              90% {
                transform: translate(-50%, -50%) translate(125px, 90px) rotate(170deg) scale(1.08);
              }
              100% {
                transform: translate(-50%, -50%) translate(105px, 85px) rotate(200deg) scale(1);
              }
            }

            @keyframes float-free-6 {
              0% {
                transform: translate(-50%, -50%) translate(-90px, -80px) rotate(0deg) scale(1);
              }
              28% {
                transform: translate(-50%, -50%) translate(-110px, -60px) rotate(-50deg) scale(0.9);
              }
              56% {
                transform: translate(-50%, -50%) translate(-80px, -95px) rotate(-100deg) scale(1.12);
              }
              84% {
                transform: translate(-50%, -50%) translate(-100px, -70px) rotate(-150deg) scale(0.95);
              }
              100% {
                transform: translate(-50%, -50%) translate(-90px, -80px) rotate(-180deg) scale(1);
              }
            }

            @keyframes float-free-7 {
              0% {
                transform: translate(-50%, -50%) translate(-115px, 40px) rotate(0deg) scale(1);
              }
              20% {
                transform: translate(-50%, -50%) translate(-95px, 60px) rotate(40deg) scale(1.08);
              }
              40% {
                transform: translate(-50%, -50%) translate(-125px, 35px) rotate(80deg) scale(0.92);
              }
              60% {
                transform: translate(-50%, -50%) translate(-105px, 55px) rotate(120deg) scale(1.1);
              }
              80% {
                transform: translate(-50%, -50%) translate(-120px, 40px) rotate(160deg) scale(0.88);
              }
              100% {
                transform: translate(-50%, -50%) translate(-115px, 40px) rotate(200deg) scale(1);
              }
            }

            @keyframes float-outer-1 {
              0% {
                transform: translate(-50%, -50%) translate(-165px, -115px) rotate(0deg) scale(1);
              }
              16% {
                transform: translate(-50%, -50%) translate(-140px, -135px) rotate(30deg) scale(1.08);
              }
              32% {
                transform: translate(-50%, -50%) translate(-190px, -95px) rotate(60deg) scale(0.92);
              }
              48% {
                transform: translate(-50%, -50%) translate(-160px, -125px) rotate(90deg) scale(1.12);
              }
              64% {
                transform: translate(-50%, -50%) translate(-180px, -105px) rotate(120deg) scale(0.88);
              }
              80% {
                transform: translate(-50%, -50%) translate(-150px, -115px) rotate(150deg) scale(1.05);
              }
              100% {
                transform: translate(-50%, -50%) translate(-165px, -115px) rotate(180deg) scale(1);
              }
            }

            @keyframes float-outer-2 {
              0% {
                transform: translate(-50%, -50%) translate(140px, -150px) rotate(0deg) scale(1);
              }
              25% {
                transform: translate(-50%, -50%) translate(165px, -130px) rotate(-40deg) scale(0.9);
              }
              50% {
                transform: translate(-50%, -50%) translate(130px, -170px) rotate(-80deg) scale(1.15);
              }
              75% {
                transform: translate(-50%, -50%) translate(150px, -140px) rotate(-120deg) scale(0.93);
              }
              100% {
                transform: translate(-50%, -50%) translate(140px, -150px) rotate(-160deg) scale(1);
              }
            }

            @keyframes float-outer-3 {
              0% {
                transform: translate(-50%, -50%) translate(185px, 95px) rotate(0deg) scale(1);
              }
              20% {
                transform: translate(-50%, -50%) translate(210px, 75px) rotate(45deg) scale(1.1);
              }
              40% {
                transform: translate(-50%, -50%) translate(170px, 110px) rotate(90deg) scale(0.88);
              }
              60% {
                transform: translate(-50%, -50%) translate(195px, 90px) rotate(135deg) scale(1.08);
              }
              80% {
                transform: translate(-50%, -50%) translate(175px, 105px) rotate(180deg) scale(0.92);
              }
              100% {
                transform: translate(-50%, -50%) translate(185px, 95px) rotate(225deg) scale(1);
              }
            }

            @keyframes float-outer-4 {
              0% {
                transform: translate(-50%, -50%) translate(190px, -65px) rotate(0deg) scale(1);
              }
              18% {
                transform: translate(-50%, -50%) translate(210px, -85px) rotate(-35deg) scale(1.12);
              }
              36% {
                transform: translate(-50%, -50%) translate(175px, -50px) rotate(-70deg) scale(0.85);
              }
              54% {
                transform: translate(-50%, -50%) translate(205px, -75px) rotate(-105deg) scale(1.05);
              }
              72% {
                transform: translate(-50%, -50%) translate(185px, -60px) rotate(-140deg) scale(0.9);
              }
              90% {
                transform: translate(-50%, -50%) translate(200px, -80px) rotate(-175deg) scale(1.1);
              }
              100% {
                transform: translate(-50%, -50%) translate(190px, -65px) rotate(-210deg) scale(1);
              }
            }

            @keyframes float-outer-5 {
              0% {
                transform: translate(-50%, -50%) translate(-150px, 120px) rotate(0deg) scale(1);
              }
              22% {
                transform: translate(-50%, -50%) translate(-170px, 140px) rotate(50deg) scale(0.92);
              }
              44% {
                transform: translate(-50%, -50%) translate(-135px, 110px) rotate(100deg) scale(1.15);
              }
              66% {
                transform: translate(-50%, -50%) translate(-160px, 130px) rotate(150deg) scale(0.88);
              }
              88% {
                transform: translate(-50%, -50%) translate(-145px, 115px) rotate(200deg) scale(1.08);
              }
              100% {
                transform: translate(-50%, -50%) translate(-150px, 120px) rotate(250deg) scale(1);
              }
            }

            @keyframes float-outer-6 {
              0% {
                transform: translate(-50%, -50%) translate(155px, 140px) rotate(0deg) scale(1);
              }
              28% {
                transform: translate(-50%, -50%) translate(180px, 120px) rotate(-45deg) scale(1.1);
              }
              56% {
                transform: translate(-50%, -50%) translate(140px, 155px) rotate(-90deg) scale(0.87);
              }
              84% {
                transform: translate(-50%, -50%) translate(170px, 130px) rotate(-135deg) scale(1.08);
              }
              100% {
                transform: translate(-50%, -50%) translate(155px, 140px) rotate(-180deg) scale(1);
              }
            }

            @keyframes float-outer-7 {
              0% {
                transform: translate(-50%, -50%) translate(-190px, -55px) rotate(0deg) scale(1);
              }
              17% {
                transform: translate(-50%, -50%) translate(-210px, -75px) rotate(40deg) scale(0.9);
              }
              34% {
                transform: translate(-50%, -50%) translate(-175px, -40px) rotate(80deg) scale(1.13);
              }
              51% {
                transform: translate(-50%, -50%) translate(-205px, -65px) rotate(120deg) scale(0.92);
              }
              68% {
                transform: translate(-50%, -50%) translate(-185px, -50px) rotate(160deg) scale(1.07);
              }
              85% {
                transform: translate(-50%, -50%) translate(-200px, -70px) rotate(200deg) scale(0.88);
              }
              100% {
                transform: translate(-50%, -50%) translate(-190px, -55px) rotate(240deg) scale(1);
              }
            }
          }

          @media (min-width: 768px) {
            @keyframes radiate-outward {
              0%,
              100% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
              }
              50% {
                transform: translate(-50%, -50%) scale(1.4);
                opacity: 0.8;
              }
            }
          }
        `}</style>
      </section>
    </div>
  )
}
