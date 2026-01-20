# GPLAN Official Website

지플랜(GPLAN) 공식 웹사이트 프로젝트입니다. 장애인 표준사업장으로서 함께 성장하고 행복을 나누는 일터를 지향합니다.

## 🚀 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Internationalization**: i18next (Korean/English)
- **Deployment**: Vercel
- **UI Components**: Radix UI, Lucide React

## 🛠 주요 기능 및 최적화

### 1. 검색엔진 최적화 (SEO)
- **다국어 SEO**: 한국어와 영어 페이지 간의 `hreflang` 설정을 통해 구글 검색 결과에서 사용자 언어에 맞는 페이지 노출을 지원합니다.
- **고유 메타데이터**: 인재상, 사업영역, 오시는 길, 고객문의 등 모든 독립 페이지에 고유한 Title과 Description을 설정하여 가시성을 높였습니다.
- **Canonical URL**: 중복 콘텐츠 문제를 방지하기 위해 각 페이지마다 고유한 절대 경로를 대표 주소로 설정했습니다.
- **사이트맵 & 로봇 설정**: 모든 페이지가 색인화될 수 있도록 `sitemap.xml`과 `robots.txt`를 자동으로 생성합니다.

### 2. 프리미엄 UI/UX
- **쇼플래시(Splash Screen)**: 사용자에게 강렬한 첫인상을 주는 인터랙티브 애니메이션과 한/영 전환 기능을 포함합니다.
- **메가 메뉴**: 모든 서비스를 한눈에 볼 수 있는 와이드형 메가 메뉴를 통해 편리한 탐색 기능을 제공합니다.
- **모바일 최적화**: 모든 섹션과 버튼, 텍스트 크기가 모바일 기기에 맞게 최적화되어 있습니다.

### 3. 글로벌 대응
- **URL 기반 언어 전환**: `/en` 경로를 통해 검색엔진과 사용자가 언어 버전을 쉽게 구분할 수 있습니다.
- **구글 지도 다국어**: 사용자가 선택한 언어에 맞춰 구글 지도 표기도 자동으로 한글 또는 영어로 변경됩니다.

## 📦 설치 및 개발

### 사전 요구사항
- Node.js 20.x 이상
- pnpm

### 로컬 실행
```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm run dev

# 프로덕션 빌드 및 검증
pnpm run build
```

## 🌐 배포 (Vercel)

본 프로젝트는 GitHub 저장소와 연동되어 작동합니다. `main` 브랜치에 코드가 푸시되면 Vercel을 통해 자동으로 업데이트된 버전이 배포됩니다.

**주의**: v0.app과의 자동 동기화 기능은 정교한 수동 최적화 작업을 덮어쓸 수 있으므로, 안정적인 운영을 위해 GitHub 직접 관리 방식을 권장합니다.

## 📄 라이선스
Copyright © GPLAN. All rights reserved.