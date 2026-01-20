/**
 * 언어별 이미지 경로를 반환하는 함수
 * @param locale - 언어 코드 ('ko' | 'en')
 * @returns 언어별 이미지 경로 객체
 */
export function getImagePaths(locale: 'ko' | 'en' = 'ko') {
  return {
    brand: {
      logoColor: "/images/design-mode/gplan-ci-color_1.png",
      logoWhite: "/images/design-mode/gplan-ci-white.png",
      ciVariations: "/images/design-mode/ci-logo-variations.png",
    },
    sections: {
      mission: locale === 'en' 
        ? "/images/sections/미션_영문.png"
        : "/images/sections/mission-statement.png",
      vision: "/images/sections/vision-we-make-bliss.png",
    },
    services: {
      officeSupport: {
        rpaAutomation: locale === 'en'
          ? "/images/design-mode/RPA 모식도_사례 종합.png"
          : "/images/design-mode/office-support-rpa-automation.png",
        rpaCase: locale === 'en'
          ? "/images/design-mode/RPA 모식도_사례 종합.png"
          : "/images/design-mode/office-support-rpa-case.png",
        rpaOverview: "/images/design-mode/rpa-overview.png",
        rpaAutomationExamples: "/images/design-mode/rpa-automation-examples.png",
      },
    },
  } as const
}

/**
 * 기본 이미지 경로 (하위 호환성을 위해 유지)
 * @deprecated getImagePaths()를 사용하세요
 */
export const imagePaths = getImagePaths('ko')
