import { useState, useRef, useEffect } from 'react'

export default function Festivities() {
  const [revealed, setRevealed] = useState({
    engagement: false,
    muhurtham: false,
  })
  const [showConfetti, setShowConfetti] = useState(false)

  const allRevealed = revealed.engagement && revealed.muhurtham

  // Trigger celebratory confetti when both ceremonies are revealed
  useEffect(() => {
    if (allRevealed) {
      setShowConfetti(true)
      const t = setTimeout(() => setShowConfetti(false), 4000)
      return () => clearTimeout(t)
    }
  }, [allRevealed])

  const revealAll = () => {
    setRevealed({ engagement: true, muhurtham: true })
  }

  return (
    <section className="relative flex flex-col gap-5 py-6 w-full overflow-hidden">
      {/* ── Section Title ── */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-amber-600 text-xs">🪔</span>
            <h2 className="font-serif text-xl sm:text-2xl text-rosewood font-bold tracking-wide">
              The Auspicious Festivities
            </h2>
          </div>
          <p className="font-sans text-[11px] text-amber-900/80 uppercase tracking-widest font-semibold mt-0.5">
            திருமண நிகழ்வுகள் • Scratch to Reveal Ceremonies
          </p>
        </div>

        {/* Scratch All Button */}
        {!allRevealed ? (
          <button
            onClick={revealAll}
            className="px-3 py-1 rounded-full bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-900 text-[10px] font-sans font-bold uppercase tracking-wider transition-all cursor-pointer active:scale-95 shadow-xs"
          >
            Reveal Both ✨
          </button>
        ) : (
          <span className="px-3 py-1 rounded-full bg-rose-100 border border-rose-300 text-rose-800 text-[10px] font-sans font-bold uppercase tracking-wider">
            Revealed 🎉
          </span>
        )}
      </div>

      {/* Helper Scratch Hint */}
      {!allRevealed && (
        <div className="flex items-center justify-center gap-1.5 text-center text-xs text-amber-900/70 italic font-serif">
          <span>👆</span>
          <span>Scratch or tap each golden card below to reveal the ceremony timings!</span>
        </div>
      )}

      {/* ── Inline Cards Grid (Side-by-Side) ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch w-full">
        {/* ══════════════════════════════════════════════════════════
            CARD 1: ENGAGEMENT CEREMONY (SCRATCH CARD)
           ══════════════════════════════════════════════════════════ */}
        <CeremonyScratchCard
          title="Engagement Ceremony"
          tamilTitle="நிச்சயதார்த்தம்"
          icon="💍"
          isRevealed={revealed.engagement}
          onReveal={() => setRevealed((prev) => ({ ...prev, engagement: true }))}
        >
          <div className="flex flex-col justify-between h-full min-h-[390px] sm:min-h-[460px] p-5 sm:p-7 md:p-8 rounded-2xl bg-white/95 border border-pink-200/90 backdrop-blur-md shadow-[0_12px_38px_rgba(244,114,182,0.18)]">
            <div className="flex flex-col gap-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-50 to-pink-100 border border-pink-200 flex items-center justify-center shadow-xs">
                    <span className="material-symbols-outlined text-2xl text-rose-600" style={{ fontVariationSettings: "'FILL' 1" }}>
                      diamond
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl text-rosewood font-bold">
                      Engagement Ceremony
                    </h3>
                    <p className="font-sans text-xs sm:text-[13px] text-rose-600 tracking-wider uppercase font-semibold mt-0.5">
                      நிச்சயதார்த்தம் • Twilight Rituals
                    </p>
                  </div>
                </div>
                <span className="text-3xl">💍</span>
              </div>

              {/* Decorative Divider */}
              <div className="flex items-center gap-3 my-1">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-pink-200 to-transparent" />
                <span className="text-pink-400 text-xs">✦ 🌸 ✦</span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-pink-200 to-transparent" />
              </div>

              {/* Timing & Details Box */}
              <div className="p-4 sm:p-5 rounded-xl bg-pink-50/70 border border-pink-200/80 flex flex-col gap-3">
                <div className="flex items-center gap-2.5 text-rosewood">
                  <span className="material-symbols-outlined text-xl text-rose-500">calendar_month</span>
                  <span className="font-sans text-sm sm:text-base font-bold">
                    Friday, Nov 20, 2026 • 6:30 PM onwards
                  </span>
                </div>

                <div className="pl-7 flex flex-col gap-2">
                  <p className="font-sans text-xs text-rose-700 font-semibold uppercase tracking-wider">
                    மாலை 6:30 மணி முதல் • Twilight Auspicious Hours
                  </p>
                  <p className="font-sans text-xs sm:text-sm text-rosewood-light leading-relaxed">
                    Vibe: Ring exchange, auspicious family dinner, and musical celebration with close kin.
                  </p>
                  <p className="font-sans text-xs sm:text-sm text-rosewood font-medium">
                    Venue: Kothali Mandapam, Surandai, Tenkasi
                  </p>
                </div>
              </div>
            </div>

            {/* Add to calendar button */}
            <div className="mt-6 flex justify-end">
              <a
                href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Arulraj+%26+Vijayalakshmi+Engagement&dates=20261120T123000Z/20261120T163000Z&details=Engagement+Ceremony+of+Arulraj+and+Vijayalakshmi&location=Senaithalaivar+Kalyana+Mandapam,+Surandai,+Tenkasi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-pink-50 hover:bg-pink-100 border border-pink-200 text-rose-700 text-xs sm:text-sm font-sans font-semibold transition-all active:scale-95 shadow-xs"
              >
                <span className="material-symbols-outlined text-base">event</span>
                <span>Add Engagement to Calendar</span>
              </a>
            </div>
          </div>
        </CeremonyScratchCard>

        {/* ══════════════════════════════════════════════════════════
            CARD 2: THE MARRIAGE / MUHURTHAM (SCRATCH CARD)
           ══════════════════════════════════════════════════════════ */}
        <CeremonyScratchCard
          title="The Marriage (Muhurtham)"
          tamilTitle="சுபமுகூர்த்தம் • மாங்கல்யதாரணம்"
          icon="🪔"
          isRevealed={revealed.muhurtham}
          onReveal={() => setRevealed((prev) => ({ ...prev, muhurtham: true }))}
          isPrimary
        >
          <div className="flex flex-col justify-between h-full min-h-[390px] sm:min-h-[460px] p-5 sm:p-7 md:p-8 rounded-2xl bg-white/95 border-2 border-amber-400/90 backdrop-blur-md shadow-[0_16px_45px_rgba(251,191,36,0.26)] relative overflow-hidden">
            <div className="flex flex-col gap-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-300 flex items-center justify-center shadow-xs">
                    <span className="material-symbols-outlined text-2xl text-amber-700" style={{ fontVariationSettings: "'FILL' 1" }}>
                      notifications_active
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl text-rosewood font-bold">
                      The Marriage (Muhurtham)
                    </h3>
                    <p className="font-sans text-xs sm:text-[13px] text-amber-700 tracking-wider uppercase font-semibold mt-0.5">
                      மாங்கல்யதாரணம் • Sacred Vedic Wedding
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-rose-600 text-white font-sans text-[11px] font-bold uppercase tracking-wider shadow-sm whitespace-nowrap self-start">
                  சுபமுகூர்த்தம்
                </span>
              </div>

              {/* Decorative Divider */}
              <div className="flex items-center gap-3 my-1">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
                <span className="text-amber-600 text-xs">✦ 🪔 ✦</span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
              </div>

              {/* Timing & Details Box */}
              <div className="p-4 sm:p-5 rounded-xl bg-amber-50/70 border border-amber-200/80 flex flex-col gap-3">
                <div className="flex items-center gap-2.5 text-rosewood">
                  <span className="material-symbols-outlined text-xl text-amber-600">alarm</span>
                  <span className="font-sans text-sm sm:text-base font-bold">
                    Sunday, Nov 22, 2026 • 7:45 AM – 8:45 AM IST
                  </span>
                </div>

                <div className="pl-7 flex flex-col gap-2">
                  <p className="font-sans text-xs sm:text-sm text-amber-900 font-semibold">
                    Auspicious Lagnam: விருச்சிக லக்னம் (Vrischika Lagnam)
                  </p>
                  <p className="font-sans text-xs sm:text-sm text-rosewood-light leading-relaxed">
                    Venue: Senaithalaivar Kalyana Mandapam, Surandai, Tenkasi.
                  </p>
                  <p className="font-sans text-xs sm:text-sm text-amber-800 font-medium">
                    Sacred Rituals: Kanyadanam, Mangalya Dharanam, and Saptapadi.
                  </p>
                </div>
              </div>
            </div>

            {/* Add to calendar button */}
            <div className="mt-6 flex justify-end">
              <a
                href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Arulraj+%26+Vijayalakshmi+Wedding+(Muhurtham)&dates=20261122T021500Z/20261122T031500Z&details=Auspicious+Muhurtham+of+Arulraj+and+Vijayalakshmi&location=Senaithalaivar+Kalyana+Mandapam,+Surandai,+Tenkasi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs sm:text-sm font-sans font-semibold transition-all active:scale-95 shadow-xs"
              >
                <span className="material-symbols-outlined text-base">event</span>
                <span>Add Muhurtham to Calendar</span>
              </a>
            </div>
          </div>
        </CeremonyScratchCard>
      </div>

      {/* Confetti Animation when both are scratched */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 40 }).map((_, i) => (
            <span
              key={i}
              className="absolute text-base select-none"
              style={{
                left: `${(i * 5 + 3) % 96}%`,
                top: '-20px',
                animation: `ceremonyConfetti 3.2s ease-in ${i * 0.06}s infinite`,
                color: ['#f59e0b', '#ec4899', '#fde047', '#a855f7', '#fb7185'][i % 5],
              }}
            >
              {['✨', '🌸', '✦', '🎉', '💛', '🎊', '💍'][i % 7]}
            </span>
          ))}
        </div>
      )}

      {/* Keyframes */}
      <style>{`
        @keyframes ceremonyConfetti {
          0% {
            transform: translate(0, 0) scale(0.6) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(${Math.random() > 0.5 ? 60 : -60}px, 100vh) scale(1.1) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  )
}

/* ═════════════════════════════════════════════════════════
   CEREMONY SCRATCH CARD WRAPPER
   Wraps any ceremony card with a scratchable gold foil layer!
   ═════════════════════════════════════════════════════════ */
function CeremonyScratchCard({
  title,
  tamilTitle,
  icon,
  isRevealed,
  onReveal,
  isPrimary,
  children,
}) {
  const canvasRef = useRef(null)
  const isDrawing = useRef(false)
  const clearedRef = useRef(false)

  // Paint the shimmering gold foil overlay
  const renderFoil = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const width = (canvas.width = canvas.offsetWidth * 2)
    const height = (canvas.height = canvas.offsetHeight * 2)

    if (isRevealed) {
      ctx.clearRect(0, 0, width, height)
      return
    }

    // Metallic Gold Foil Gradient
    const grad = ctx.createLinearGradient(0, 0, width, height)
    if (isPrimary) {
      grad.addColorStop(0, '#fef08a')
      grad.addColorStop(0.25, '#d97706')
      grad.addColorStop(0.5, '#fef9c3')
      grad.addColorStop(0.75, '#b45309')
      grad.addColorStop(1, '#fde047')
    } else {
      grad.addColorStop(0, '#ffe4e6')
      grad.addColorStop(0.3, '#f472b6')
      grad.addColorStop(0.55, '#fbcfe8')
      grad.addColorStop(0.8, '#db2777')
      grad.addColorStop(1, '#fdf2f8')
    }
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, width, height)

    // Sparkle flecks
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)'
    for (let i = 0; i < 50; i++) {
      ctx.beginPath()
      ctx.arc((i * 41) % width, (i * 67) % height, (i % 3) + 1.2, 0, Math.PI * 2)
      ctx.fill()
    }

    // Outer decorative border on foil
    ctx.strokeStyle = isPrimary ? 'rgba(120, 53, 15, 0.4)' : 'rgba(157, 23, 77, 0.4)'
    ctx.lineWidth = 4
    ctx.strokeRect(8, 8, width - 16, height - 16)

    // Top icon & text
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // Responsive Title
    const titleSize = Math.max(16, Math.min(24, width * 0.045))
    ctx.font = `bold ${titleSize}px sans-serif`
    ctx.fillStyle = isPrimary ? '#78350f' : '#831843'
    ctx.fillText(`✨ SCRATCH TO REVEAL ✨`, width / 2, height / 2 - 30)

    // Ceremony Name
    const nameSize = Math.max(15, Math.min(22, width * 0.04))
    ctx.font = `bold ${nameSize}px serif`
    ctx.fillStyle = isPrimary ? '#451a03' : '#500724'
    ctx.fillText(`${icon} ${title}`, width / 2, height / 2 + 6)

    // Subtitle
    const subSize = Math.max(11, Math.min(14, width * 0.026))
    ctx.font = `${subSize}px sans-serif`
    ctx.fillStyle = isPrimary ? '#92400e' : '#9d174d'
    ctx.fillText(`${tamilTitle} • Tap or Swipe to Uncover`, width / 2, height / 2 + 40)
  }

  useEffect(() => {
    renderFoil()
    const handleResize = () => {
      if (!isRevealed) renderFoil()
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isRevealed, isPrimary, title, tamilTitle, icon])

  // Check how much has been scratched
  const checkScratchPercentage = () => {
    if (clearedRef.current) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let transparentCount = 0
    const total = imgData.data.length / 4

    // Sample pixels for speed
    for (let i = 3; i < imgData.data.length; i += 16) {
      if (imgData.data[i] === 0) transparentCount++
    }
    const sampleTotal = total / 4

    if (transparentCount / sampleTotal > 0.22) {
      clearedRef.current = true
      onReveal()
    }
  }

  // Scratch action
  const scratchAt = (clientX, clientY) => {
    const canvas = canvasRef.current
    if (!canvas || isRevealed) return
    const rect = canvas.getBoundingClientRect()
    const x = (clientX - rect.left) * 2
    const y = (clientY - rect.top) * 2

    const ctx = canvas.getContext('2d')
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, 40, 0, Math.PI * 2)
    ctx.fill()

    checkScratchPercentage()
  }

  return (
    <div
      onClick={() => onReveal()}
      className="relative rounded-2xl overflow-hidden cursor-pointer select-none group h-full flex flex-col"
    >
      {/* ── THE CEREMONY CARD (Revealed underneath) ── */}
      <div className={`h-full flex flex-col ${!isRevealed ? 'pointer-events-none' : ''}`}>
        {children}
      </div>

      {/* ── THE FOIL OVERLAY CANVAS (Scratchable – scroll locked while scratching) ── */}
      <canvas
        ref={canvasRef}
        style={{ touchAction: 'none' }}
        onPointerDown={(e) => {
          isDrawing.current = true
          e.currentTarget.setPointerCapture(e.pointerId)
          document.body.style.overflow = 'hidden'
          scratchAt(e.clientX, e.clientY)
        }}
        onPointerMove={(e) => {
          if (!isDrawing.current) return
          e.preventDefault()
          scratchAt(e.clientX, e.clientY)
        }}
        onPointerUp={(e) => {
          isDrawing.current = false
          document.body.style.overflow = ''
        }}
        onPointerLeave={(e) => {
          isDrawing.current = false
          document.body.style.overflow = ''
        }}
        className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
      />
    </div>
  )
}
