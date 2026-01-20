export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white text-foreground">
      <span className="sr-only">로딩 중입니다...</span>
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-slate-500" />
    </div>
  )
}

