import { useState, useRef, useEffect } from 'react'

export default function FormalInvitationCard() {
  const [isOpen, setIsOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  )
  const isDesktop = windowWidth >= 768
  // On mobile: 'both' (default full 2-page book spread), 'blessing' (zoom left), 'invitation' (zoom right)
  const [mobileViewMode, setMobileViewMode] = useState('both')
  const cardRef = useRef(null)

  // Track window resizing for desktop vs mobile
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Dynamic responsive card dimensions:
  // Base single-page dimensions
  const cardWidth = isDesktop ? 400 : Math.min(290, Math.max(250, Math.round(windowWidth * 0.72)))
  const cardHeight = isDesktop ? 590 : Math.round(cardWidth * 1.54)

  // On mobile, the two-page book spread width is 2 * cardWidth.
  // We calculate spreadScale so BOTH pages fit within the mobile viewport with gentle padding.
  const spreadScale = isDesktop ? 1 : Math.min(1, Math.max(0.48, (windowWidth - 28) / (cardWidth * 2)))

  // Bidirectional scroll-driven folding:
  // - Scrolling DOWN: Opens upon reaching this section, closes when crossing past it
  // - Scrolling UP: Re-opens upon entering this section, closes when scrolling back past it towards top
  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight || document.documentElement.clientHeight

      // In-section trigger zone:
      // - Reached from top: rect.top enters reading view (<= 70% of viewport)
      // - Not crossed past: rect.bottom has not scrolled out above (>= 22% of viewport)
      const shouldBeOpen = rect.top <= windowHeight * 0.70 && rect.bottom >= windowHeight * 0.22

      setIsOpen((prev) => {
        if (prev) {
          // If open, stay open until clearly leaving the section (with slight hysteresis)
          const stayOpen = rect.top <= windowHeight * 0.76 && rect.bottom >= windowHeight * 0.16
          return stayOpen
        } else {
          // If folded, open when entering section
          return shouldBeOpen
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate transform for the book assembly
  let bookTransform = 'translateX(0) scale(1) rotateY(0deg)'
  if (isOpen) {
    if (isDesktop) {
      bookTransform = 'translateX(50%) scale(1) rotateY(0deg)'
    } else {
      if (mobileViewMode === 'both') {
        bookTransform = `translateX(50%) scale(${spreadScale}) rotateY(0deg)`
      } else if (mobileViewMode === 'blessing') {
        bookTransform = 'translateX(100%) scale(1) rotateY(0deg)'
      } else {
        // 'invitation'
        bookTransform = 'translateX(0) scale(1) rotateY(0deg)'
      }
    }
  }

  // Stable stage height: constant so the document NEVER jumps or shifts up/down during scrolling
  const stageMinHeight = isDesktop ? 620 : 470

  return (
    <section ref={cardRef} className="relative w-full py-8 sm:py-10 flex flex-col items-center overflow-x-clip">
      {/* ── Section Title ── */}
      <div className="flex items-center gap-2 mb-4 sm:mb-6 pointer-events-none select-none">
        <span className="text-amber-600 text-xs">✦</span>
        <span className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.28em] font-bold text-amber-900/80">
          சுபமுகூர்த்த அழைப்பிதழ் • Sacred Wedding Card
        </span>
        <span className="text-amber-600 text-xs">✦</span>
      </div>

      {/* ── 3D BOOK STAGE ── */}
      <div
        className="relative w-full flex flex-col items-center justify-center py-2 sm:py-4 transition-all duration-500"
        style={{
          perspective: '2800px',
          WebkitPerspective: '2800px',
          perspectiveOrigin: '50% 50%',
          WebkitPerspectiveOrigin: '50% 50%',
          minHeight: `${stageMinHeight}px`,
        }}
      >
        {/* On mobile screens when open, provide luxury segmented pills & zoom guide */}
        {!isDesktop && isOpen && (
          <div className="flex flex-col items-center gap-1.5 mb-3 z-30 anim-fade">
            <div className="inline-flex items-center p-1 rounded-full bg-white/90 border border-amber-300/80 backdrop-blur-md shadow-xs">
              <button
                onClick={(e) => { e.stopPropagation(); setMobileViewMode('both'); }}
                className={`px-3 py-1 rounded-full text-[10px] font-sans font-bold transition-all cursor-pointer ${
                  mobileViewMode === 'both'
                    ? 'bg-amber-900 text-amber-50 shadow-xs'
                    : 'text-amber-900 hover:bg-amber-100/70'
                }`}
              >
                📖 Full Book
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setMobileViewMode('blessing'); }}
                className={`px-3 py-1 rounded-full text-[10px] font-sans font-bold transition-all cursor-pointer ${
                  mobileViewMode === 'blessing'
                    ? 'bg-amber-900 text-amber-50 shadow-xs'
                    : 'text-amber-900 hover:bg-amber-100/70'
                }`}
              >
                📜 Blessings
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setMobileViewMode('invitation'); }}
                className={`px-3 py-1 rounded-full text-[10px] font-sans font-bold transition-all cursor-pointer ${
                  mobileViewMode === 'invitation'
                    ? 'bg-amber-900 text-amber-50 shadow-xs'
                    : 'text-amber-900 hover:bg-amber-100/70'
                }`}
              >
                💍 Invitation
              </button>
            </div>
            <p className="text-[10px] text-amber-900/70 font-serif italic">
              {mobileViewMode === 'both'
                ? '✨ Both pages visible • Tap either page to zoom in'
                : '👆 Tap card to zoom out to both pages'}
            </p>
          </div>
        )}

        {/* The Book Assembly: Responsive size & gentle, graceful 2.0s opening transition */}
        <div
          onClick={() => {
            if (!isDesktop && isOpen) {
              // On mobile, tap toggles between zoom and full book
              setMobileViewMode((prev) => (prev === 'both' ? 'invitation' : 'both'))
            } else {
              setIsOpen((prev) => !prev)
            }
          }}
          className="relative cursor-pointer select-none"
          style={{
            width: `${cardWidth}px`,
            height: `${cardHeight}px`,
            transform: bookTransform,
            transformOrigin: '0% 50%',
            WebkitTransformOrigin: '0% 50%',
            transformStyle: 'preserve-3d',
            WebkitTransformStyle: 'preserve-3d',
            transition: 'transform 1.6s cubic-bezier(0.25, 0.9, 0.3, 1)',
            filter: 'drop-shadow(0 20px 40px rgba(120,80,40,0.20)) drop-shadow(0 6px 16px rgba(0,0,0,0.10))',
          }}
          title={isDesktop ? "Click to fold / unfold the invitation" : "Tap to zoom in or view full book"}
        >
          {/* ═══════════════════════════════════════════════════════
              1. RIGHT PAGE (The Base): Always lies flat underneath
                 Revealed when the cover turns open to the left!
             ═══════════════════════════════════════════════════════ */}
          <div
            onClick={(e) => {
              if (!isDesktop && isOpen) {
                e.stopPropagation()
                setMobileViewMode((prev) => (prev === 'invitation' ? 'both' : 'invitation'))
              }
            }}
            className="absolute inset-0 rounded-2xl p-4 sm:p-7 md:p-9 text-center flex flex-col items-center justify-between border border-amber-300/70 overflow-hidden cursor-pointer"
            style={{
              background: 'radial-gradient(ellipse at 50% 35%, #fffdf9 0%, #faf5ec 65%, #f4ecdc 100%)',
              boxShadow: 'inset 0 0 40px rgba(217,119,6,0.06), inset 0 2px 5px rgba(255,255,255,0.9)',
              zIndex: 1,
            }}
          >
            {/* Corner Filigree Lace */}
            <CornerFiligree position="top-left" />
            <CornerFiligree position="top-right" />
            <CornerFiligree position="bottom-left" />
            <CornerFiligree position="bottom-right" />

            {/* Traditional South Indian Floral Bouquets */}
            <FloralCorner position="top-right" />
            <FloralCorner position="bottom-left" />

            {/* 1. Common Invitation from Both Families & Elders */}
            <div className="relative z-10 pt-2 max-w-[320px] space-y-1 text-center">
              <p className="font-serif italic text-xs sm:text-[13px] text-amber-900/95 font-medium tracking-wide">
                Together with our families &amp; elders,
              </p>
              <p className="font-serif text-xs sm:text-[13px] text-rosewood-light leading-relaxed">
                we cordially invite you and your family to join in the sacred wedding celebration of
              </p>
            </div>

            {/* 2. THE GROOM & BRIDE (With family members' names placed under each) */}
            <div className="relative z-10 py-3 flex flex-col items-center gap-2 my-auto">
              {/* Groom */}
              <div className="flex flex-col items-center gap-0.5 text-center">
                <h2
                  className="font-serif text-2xl sm:text-3xl md:text-[38px] font-bold tracking-wide leading-tight"
                  style={{
                    color: '#6d1337',
                    textShadow: '0 1px 2px rgba(255,255,255,0.85)',
                  }}
                >
                  Arulraj
                </h2>
                <p className="font-serif italic text-xs sm:text-[12px] text-rosewood-light">
                  Son of <span className="font-semibold text-rosewood">Mr. Arumugasamy &amp; Mrs. Aruna</span>
                </p>
              </div>

              {/* Connector */}
              <div className="py-0.5 flex items-center gap-2.5">
                <div className="w-8 h-px bg-amber-300/70" />
                <span className="font-serif italic text-amber-800 text-xs sm:text-sm font-semibold">
                  with
                </span>
                <div className="w-8 h-px bg-amber-300/70" />
              </div>

              {/* Bride */}
              <div className="flex flex-col items-center gap-0.5 text-center">
                <h2
                  className="font-serif text-2xl sm:text-3xl md:text-[38px] font-bold tracking-wide leading-tight"
                  style={{
                    color: '#6d1337',
                    textShadow: '0 1px 2px rgba(255,255,255,0.85)',
                  }}
                >
                  Vijayalakshmi
                </h2>
                <p className="font-serif italic text-xs sm:text-[12px] text-rosewood-light">
                  Daughter of <span className="font-semibold text-rosewood">Mr. Ramakrishnan &amp; Mrs. Maheshwari</span>
                </p>
              </div>
            </div>

            {/* 3. Bottom Date & Flourish */}
            <div className="relative z-10 pb-2 flex flex-col items-center gap-1.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
                <span className="text-amber-600 text-xs">✦ ☸ ✦</span>
                <div className="w-10 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
              </div>
              <p className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.24em] font-semibold text-amber-900">
                Sunday, 22nd November 2026
              </p>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════
              2. FLIPPING COVER: Pivots on its LEFT edge in 3D!
                 - Opens slowly (2.2 seconds) with realistic ease
                 - Closed (0deg): sits on top of Right Page
                 - Opened (-180deg): flips out to become the Left Page!
             ═══════════════════════════════════════════════════════ */}
          <div
            className="absolute inset-0"
            style={{
              transformOrigin: 'left center',
              transformStyle: 'preserve-3d',
              WebkitTransformStyle: 'preserve-3d',
              transform: isOpen ? 'rotateY(-180deg)' : 'rotateY(0deg)',
              transition: 'transform 1.6s cubic-bezier(0.25, 0.9, 0.3, 1)',
              zIndex: isOpen ? 5 : 20,
            }}
          >
            {/* ─── 2A. FRONT OF COVER (Visible when book is CLOSED) ─── */}
            <div
              className="absolute inset-0 rounded-2xl p-4 sm:p-7 md:p-9 text-center flex flex-col items-center justify-between border border-amber-300/70 overflow-hidden"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                background: 'radial-gradient(ellipse at 50% 30%, #fffdf8 0%, #faf4ea 60%, #f3e9d8 100%)',
                boxShadow: 'inset 0 0 40px rgba(217,119,6,0.08), inset 0 2px 5px rgba(255,255,255,0.9)',
              }}
            >
              <CornerFiligree position="top-left" />
              <CornerFiligree position="top-right" />
              <CornerFiligree position="bottom-left" />
              <CornerFiligree position="bottom-right" />

              {/* Top Ganesha Crest */}
              <div className="pt-2 flex flex-col items-center">
                <GaneshaCrest size={76} />
                <p className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-[0.24em] text-amber-900 mt-3">
                  || ॐ ஸ்ரீ கணேஷாய நமஹ ||
                </p>
                <p className="font-serif italic text-xs sm:text-[13px] text-rosewood-light mt-1">
                  "எல்லாம் வல்ல இறைவன் திருவருளால்"
                </p>
              </div>

              {/* Couple Titles on Front Cover */}
              <div className="my-auto py-2">
                <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-semibold text-amber-800 mb-2">
                  Wedding Invitation
                </p>
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#831843] tracking-wide">
                  Arulraj
                </h3>
                <span className="font-serif italic text-amber-800 text-sm font-semibold my-1 block">
                  &amp;
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#831843] tracking-wide">
                  Vijayalakshmi
                </h3>
                <div className="flex items-center justify-center gap-2 pt-2.5">
                  <div className="w-10 h-px bg-amber-400" />
                  <span className="text-amber-600 text-xs">✦ ☸ ✦</span>
                  <div className="w-10 h-px bg-amber-400" />
                </div>
              </div>

              {/* Bottom Hint */}
              <div className="pb-1">
                <div
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-300/80 shadow-xs"
                  style={{ background: 'rgba(254,243,199,0.9)' }}
                >
                  <span className="text-xs animate-bounce">📖</span>
                  <span className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-amber-900">
                    Scroll down to open
                  </span>
                </div>
              </div>
            </div>

            {/* ─── 2B. INSIDE OF COVER (Visible when book is OPENED - Left Page!) ─── */}
            <div
              onClick={(e) => {
                if (!isDesktop && isOpen) {
                  e.stopPropagation()
                  setMobileViewMode((prev) => (prev === 'blessing' ? 'both' : 'blessing'))
                }
              }}
              className="absolute inset-0 rounded-2xl p-4 sm:p-7 md:p-9 text-center flex flex-col items-center justify-between border border-amber-300/70 overflow-hidden cursor-pointer"
              style={{
                transform: 'rotateY(180deg)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                background: 'radial-gradient(ellipse at 50% 35%, #fffdf9 0%, #faf5ec 65%, #f4ecdc 100%)',
                boxShadow: 'inset 0 0 40px rgba(217,119,6,0.06), inset 0 2px 5px rgba(255,255,255,0.9)',
              }}
            >
              <CornerFiligree position="top-left" />
              <CornerFiligree position="top-right" />
              <CornerFiligree position="bottom-left" />
              <CornerFiligree position="bottom-right" />

              {/* Watermark Kolam Art in Center */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.045] pointer-events-none select-none">
                <svg className="w-72 h-72" viewBox="0 0 100 100" fill="currentColor">
                  <circle cx="50" cy="50" r="44" stroke="#b45309" strokeWidth="1.8" fill="none" />
                  <path d="M50 6 L50 94 M6 50 L94 50 M18 18 L82 82 M18 82 L82 18" stroke="#b45309" strokeWidth="1.2" />
                  <circle cx="50" cy="50" r="24" stroke="#b45309" strokeWidth="1.4" fill="none" />
                </svg>
              </div>

              {/* Top Sacred Ganesha Crest */}
              <div className="relative z-10 pt-2 flex flex-col items-center">
                <GaneshaCrest size={72} />
                <p className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-[0.24em] text-amber-900 mt-2.5">
                  || ॐ ஸ்ரீ கணேஷாய நமஹ ||
                </p>
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent my-1" />
                <p className="font-serif italic text-xs sm:text-[13px] text-rosewood-light">
                  "எல்லாம் வல்ல இறைவன் திருவருளால்"
                </p>
              </div>

              {/* Auspicious Sloka / Ancestral Blessings */}
              <div className="relative z-10 py-3 max-w-[300px] space-y-2.5 my-auto">
                <p className="font-serif italic text-xs sm:text-sm text-rosewood-light leading-relaxed">
                  "With the divine grace of the Almighty and the heartfelt blessings of our beloved ancestors,
                  two souls unite in sacred Vedic harmony."
                </p>
                <div className="flex items-center justify-center gap-2 pt-1">
                  <div className="w-8 h-px bg-amber-300/80" />
                  <span className="text-[11px] text-amber-700">✦ ☸ ✦</span>
                  <div className="w-8 h-px bg-amber-300/80" />
                </div>
              </div>

              {/* Bottom Sacred Union Text */}
              <div className="relative z-10 pb-2">
                <p className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.24em] font-semibold text-amber-900/85">
                  மங்கல நாண் பூட்டுதல்
                </p>
                <p className="font-serif italic text-[11px] text-rosewood-light/80">
                  Sacred Kalyana Mahotsavam
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Subtle Click Toggle Hint ── */}
      <div className="flex justify-center mt-3">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/90 hover:bg-amber-50 text-amber-900 border border-amber-300/80 text-[10px] sm:text-[11px] font-sans font-semibold tracking-wider shadow-xs transition-all active:scale-95 cursor-pointer"
        >
          <span className="material-symbols-outlined text-xs text-amber-700">
            {isOpen ? 'unfold_less' : 'unfold_more'}
          </span>
          <span>{isOpen ? 'Fold Card' : 'Unfold Card'}</span>
        </button>
      </div>
    </section>
  )
}

/* ═════════════════════════════════════════════════════════
   HELPER 1: Embossed Golden Lord Ganesha Crest
   ═════════════════════════════════════════════════════════ */
function GaneshaCrest({ size = 72 }) {
  return (
    <div
      className="rounded-full flex items-center justify-center p-2 border-2 border-amber-300/70"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: 'radial-gradient(circle, rgba(254,243,199,0.9) 0%, rgba(251,191,36,0.3) 75%, transparent 100%)',
        boxShadow: '0 4px 15px rgba(217,119,6,0.20), inset 0 2px 4px rgba(255,255,255,0.8)',
      }}
    >
      <svg viewBox="0 0 60 60" className="w-full h-full text-amber-800 drop-shadow-xs">
        <path
          d="M30 8 C22 8 16 14 16 22 C16 32 20 38 27 42 C27 47 25 50 20 52 C26 53 32 50 33 44 C34 44 35 44 36 43 C42 41 46 34 46 26 C46 16 39 8 30 8 Z"
          fill="rgba(251,191,36,0.25)"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M27 34 Q30 42 35 41 Q39 40 37 34"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path d="M30 11 L30 17 M27 14 L33 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="34" cy="20" r="1.4" fill="currentColor" />
        <circle cx="24" cy="38" r="1.2" fill="currentColor" />
      </svg>
    </div>
  )
}

/* ═════════════════════════════════════════════════════════
   HELPER 2: Traditional South Indian Wedding Floral Corner
   (Delicate white Jasmine / Malligai blossoms & gold leaves)
   ═════════════════════════════════════════════════════════ */
function FloralCorner({ position }) {
  const isTopRight = position === 'top-right'
  return (
    <div
      className="absolute pointer-events-none select-none z-10"
      style={{
        [isTopRight ? 'top' : 'bottom']: '4px',
        [isTopRight ? 'right' : 'left']: '4px',
        transform: isTopRight ? 'none' : 'rotate(180deg)',
        width: '90px',
        height: '90px',
      }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs">
        <path
          d="M95 10 Q70 25 45 60 Q30 75 10 95"
          fill="none"
          stroke="#d4af37"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <path
          d="M80 18 Q65 10 58 24 Q72 26 80 18 Z"
          fill="rgba(212,175,55,0.35)"
          stroke="#b8860b"
          strokeWidth="0.8"
        />
        <path
          d="M60 40 Q46 32 40 48 Q54 48 60 40 Z"
          fill="rgba(212,175,55,0.30)"
          stroke="#b8860b"
          strokeWidth="0.8"
        />

        {/* Jasmine Flower 1 */}
        <g transform="translate(75, 25)">
          <circle cx="0" cy="0" r="3" fill="#f59e0b" />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <ellipse
              key={deg}
              cx="0"
              cy="-7.5"
              rx="3.2"
              ry="6"
              fill="#fffdf8"
              stroke="#e2d4be"
              strokeWidth="0.5"
              transform={`rotate(${deg})`}
            />
          ))}
        </g>

        {/* Jasmine Flower 2 */}
        <g transform="translate(48, 52)">
          <circle cx="0" cy="0" r="3.2" fill="#f59e0b" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <ellipse
              key={deg}
              cx="0"
              cy="-8.5"
              rx="3.8"
              ry="6.5"
              fill="#fffbf2"
              stroke="#e8dbca"
              strokeWidth="0.5"
              transform={`rotate(${deg})`}
            />
          ))}
        </g>

        {/* Lavender buds */}
        <circle cx="88" cy="12" r="2.2" fill="#c084fc" opacity="0.8" />
        <circle cx="82" cy="8" r="1.8" fill="#e9d5ff" opacity="0.9" />
        <circle cx="94" cy="18" r="2.0" fill="#a855f7" opacity="0.75" />
      </svg>
    </div>
  )
}

/* ═════════════════════════════════════════════════════════
   HELPER 3: Embossed Corner Filigree Lace (All 4 Corners)
   ═════════════════════════════════════════════════════════ */
function CornerFiligree({ position }) {
  const isTop = position.startsWith('top')
  const isLeft = position.endsWith('left')

  return (
    <div
      className="absolute pointer-events-none select-none"
      style={{
        top: isTop ? '8px' : 'auto',
        bottom: !isTop ? '8px' : 'auto',
        left: isLeft ? '8px' : 'auto',
        right: !isLeft ? '8px' : 'auto',
        transform: `${!isTop ? 'scaleY(-1)' : ''} ${!isLeft ? 'scaleX(-1)' : ''}`,
        width: '32px',
        height: '32px',
      }}
    >
      <svg viewBox="0 0 40 40" className="w-full h-full text-amber-600/40">
        <path
          d="M2 38 L2 6 Q2 2 6 2 L38 2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M6 34 L6 8 Q6 6 8 6 L34 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeDasharray="2,2"
        />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <path d="M12 6 Q12 12 18 12 Q12 12 12 18 Q12 12 6 12 Q12 12 12 6 Z" fill="currentColor" opacity="0.6" />
      </svg>
    </div>
  )
}
