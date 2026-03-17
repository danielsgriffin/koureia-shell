// Root — only shown in local dev when no domain rewrite fires.
export default function DevIndex() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-950 text-stone-400">
      <div className="space-y-2 text-center font-mono text-sm">
        <p className="text-stone-200">koureia-shell</p>
        <p>Multi-tenant site renderer</p>
        <p className="text-xs text-stone-600">
          Requests are routed by hostname in production.
        </p>
      </div>
    </div>
  )
}
