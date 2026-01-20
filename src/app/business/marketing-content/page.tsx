import { permanentRedirect } from "next/navigation"

// /business/marketing-content를 /business/marketing-support로 영구 리다이렉트 (301)
// Google Search Console에서 발견된 URL을 올바른 canonical URL로 리다이렉트
export default function MarketingContentRedirectPage() {
  permanentRedirect("/business/marketing-support")
}

