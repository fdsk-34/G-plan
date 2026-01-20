import { redirect } from "next/navigation"

// /business/marketing을 서버 사이드에서 /business/marketing-support로 리다이렉트
export default function MarketingRedirectPage() {
  redirect("/business/marketing-support")
}

