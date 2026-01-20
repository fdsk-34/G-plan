import { NextResponse } from 'next/server'

// 네이버 서치어드바이저용 RSS 2.0 피드 생성
// 네이버 서치어드바이저에서 RSS 피드를 제출하면 더 빠르게 색인됩니다
// RSS 피드 URL: https://www.gplanworld.com/rss
export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.gplanworld.com"
  const currentDate = new Date().toUTCString()

  // RSS 피드에 포함할 주요 페이지들
  // 네이버 서치어드바이저는 최신 콘텐츠를 우선적으로 색인합니다
  const feedItems = [
    {
      title: "지플랜(GPLAN) - 행복한 일터를 만드는 기업",
      link: baseUrl,
      description: "지플랜(GPLAN)은 장애인 표준사업장으로, 함께 성장하고 행복을 나누는 일터를 만들어갑니다.",
      pubDate: new Date().toUTCString(),
    },
    {
      title: "비즈니스 서비스 - 지플랜",
      link: `${baseUrl}/business`,
      description: "사무업무지원, IT업무지원, 홍보콘텐츠지원 등 다양한 비즈니스 서비스를 제공합니다.",
      pubDate: new Date().toUTCString(),
    },
    {
      title: "사무업무지원 서비스",
      link: `${baseUrl}/business/office-support`,
      description: "장애인 표준사업장의 전문 사무업무지원 서비스를 제공합니다.",
      pubDate: new Date().toUTCString(),
    },
    {
      title: "IT업무지원 서비스",
      link: `${baseUrl}/business/it-support`,
      description: "RPA 및 IT 업무지원 서비스를 통해 업무 효율성을 높입니다.",
      pubDate: new Date().toUTCString(),
    },
    {
      title: "홍보콘텐츠지원 서비스",
      link: `${baseUrl}/business/marketing-support`,
      description: "마케팅 및 홍보콘텐츠 제작 지원 서비스를 제공합니다.",
      pubDate: new Date().toUTCString(),
    },
    {
      title: "표준사업장 설립 컨설팅",
      link: `${baseUrl}/business/consulting`,
      description: "장애인 표준사업장 설립을 위한 전문 컨설팅 서비스를 제공합니다.",
      pubDate: new Date().toUTCString(),
    },
    {
      title: "인재상 - 지플랜",
      link: `${baseUrl}/talent`,
      description: "지플랜의 인재상과 함께 성장할 인재를 모집합니다.",
      pubDate: new Date().toUTCString(),
    },
    {
      title: "연락처 - 지플랜",
      link: `${baseUrl}/contact`,
      description: "지플랜과 연락하실 수 있는 연락처 정보입니다.",
      pubDate: new Date().toUTCString(),
    },
    {
      title: "문의하기 - 지플랜",
      link: `${baseUrl}/inquiry`,
      description: "지플랜에 문의사항을 남기실 수 있는 문의 페이지입니다.",
      pubDate: new Date().toUTCString(),
    },
  ]

  // RSS 2.0 XML 형식 생성
  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>지플랜(GPLAN) - 행복한 일터를 만드는 기업</title>
    <link>${baseUrl}</link>
    <description>지플랜(GPLAN)은 장애인 표준사업장으로, 함께 성장하고 행복을 나누는 일터를 만들어갑니다.</description>
    <language>ko-KR</language>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <pubDate>${currentDate}</pubDate>
    <managingEditor>GPLAN</managingEditor>
    <webMaster>GPLAN</webMaster>
    <generator>Next.js RSS Generator</generator>
    <atom:link href="${baseUrl}/rss" rel="self" type="application/rss+xml"/>
    ${feedItems
      .map(
        (item) => `    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.link}</link>
      <description><![CDATA[${item.description}]]></description>
      <pubDate>${item.pubDate}</pubDate>
      <guid isPermaLink="true">${item.link}</guid>
    </item>`
      )
      .join('\n')}
  </channel>
</rss>`

  return new NextResponse(rssXml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}

