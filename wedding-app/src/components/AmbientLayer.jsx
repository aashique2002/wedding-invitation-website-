// Ambient floating petals + glow blobs fixed in background
export default function AmbientLayer() {
  return (
    <>
      {/* Glow blobs */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute -top-32 -left-20 w-80 h-80 bg-rose-200/50 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-96 h-96 bg-pink-100/70 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-rose-200/40 rounded-full blur-3xl" />
      </div>

      {/* Floating petals */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
        <div className="floating-petal-1 absolute -top-8 left-[10%] text-rose-300/80 text-xl">🌸</div>
        <div className="floating-petal-2 absolute -top-10 left-[75%] text-pink-300/80 text-2xl">🤍</div>
        <div className="floating-petal-3 absolute -top-8 left-[45%] text-rose-300/70 text-base">🌸</div>
        <div className="floating-petal-4 absolute -top-12 left-[85%] text-rose-400/60 text-lg">✨</div>
        <div className="absolute top-1/4 left-[8%] w-2 h-2 bg-rose-300/70 rounded-full blur-[0.5px] animate-pulse" />
        <div className="absolute top-1/2 right-[12%] w-2 h-2 bg-pink-300/80 rounded-full blur-[0.5px] animate-ping" style={{ animationDuration: '4s' }} />
        <div className="absolute top-3/4 left-[20%] w-1.5 h-1.5 bg-rose-300/70 rounded-full blur-[0.5px] animate-pulse" />
      </div>
    </>
  )
}
