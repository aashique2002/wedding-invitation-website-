import { useState, useRef, useEffect } from 'react'

export default function RoyalEnvelopeIntro({ onOpen }) {
  const [phase, setPhase] = useState('idle') // idle | knock | opening | revealed | exit
  const [isExited, setIsExited] = useState(false)
  const videoRef = useRef(null)

  // Auto-play the couple video once doors start opening
  useEffect(() => {
    if ((phase === 'revealed' || phase === 'exit') && videoRef.current) {
      videoRef.current.play().catch(() => { })
    }
  }, [phase])

  // Handle door touch — completely silent, no sound effect as requested
  const handleTouch = () => {
    if (phase !== 'idle') return
    setPhase('knock')
    if (videoRef.current) {
      videoRef.current.muted = true
      videoRef.current.defaultMuted = true
      videoRef.current.play().catch(() => { })
    }
    if (onOpen) onOpen()
    setTimeout(() => setPhase('opening'), 450)
    setTimeout(() => setPhase('revealed'), 1800)
    setTimeout(() => setPhase('exit'), 3400)
    setTimeout(() => setIsExited(true), 4500)
  }

  // Allow scrolling the mouse wheel down on laptop to automatically unlock doors
  const handleWheel = (e) => {
    if (e.deltaY > 15 && phase === 'idle') {
      handleTouch()
    }
  }

  // Keyboard navigation for laptop/desktop (ArrowDown, PageDown, Space, Enter)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowDown', 'PageDown', 'Space', 'Enter'].includes(e.code) && phase === 'idle') {
        handleTouch()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [phase])

  if (isExited) return null

  const isOpening = phase === 'opening' || phase === 'revealed' || phase === 'exit'
  const isRevealed = phase === 'revealed' || phase === 'exit'
  const isExit = phase === 'exit'
  const isKnock = phase === 'knock'

  return (
    <div
      onWheel={handleWheel}
      className="fixed inset-0 z-50 overflow-hidden select-none"
      style={{
        background: '#040103',
        transition: isExit ? 'opacity 1.1s ease, transform 1.1s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none',
        opacity: isExit ? 0 : 1,
        transform: isExit ? 'scale(1.08)' : 'scale(1)',
        pointerEvents: isOpening ? 'none' : 'auto',
      }}
    >
      {/* ═════════════════════════════════════════════════════════
          1. REVEALED BACKGROUND: COUPLE CINEMATIC VIDEO & GLOW
         ═════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          opacity: isRevealed ? 1 : 0,
          transition: 'opacity 1.2s ease 0.2s',
          transform: isRevealed ? 'scale(1)' : 'scale(1.12)',
          transitionProperty: 'opacity, transform',
          transitionDuration: '1.4s',
        }}
      >
        <video
          ref={videoRef}
          src="/couple_walking.mp4"
          poster="/couple-walking.jpg"
          loop
          muted
          playsInline
          webkit-playsinline="true"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.68) saturate(1.22)', transform: 'scale(1.04)' }}
        />
        {/* Cinematic Vignette & Warm Golden Ambiance */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(0,0,0,0.15) 20%, rgba(10,2,6,0.78) 85%, rgba(4,1,3,0.95) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(8,1,5,0.45) 0%, transparent 40%, rgba(8,1,5,0.85) 100%)',
          }}
        />
      </div>

      {/* ═════════════════════════════════════════════════════════
          2. DIVINE SUNBEAMS & GOLDEN LIGHT BURST (Behind doors)
         ═════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          opacity: isOpening ? 1 : 0,
          transition: 'opacity 0.7s ease',
          zIndex: 12,
        }}
      >
        {/* Core bloom */}
        <div
          style={{
            width: isRevealed ? '260vw' : '40vw',
            height: isRevealed ? '260vw' : '40vw',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(255,245,180,0.98) 0%, rgba(251,191,36,0.75) 25%, rgba(217,119,6,0.35) 50%, transparent 75%)',
            filter: 'blur(35px)',
            transition: 'width 2.0s cubic-bezier(0.16, 1, 0.3, 1), height 2.0s cubic-bezier(0.16, 1, 0.3, 1)',
            position: 'absolute',
          }}
        />
        {/* God rays */}
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '4px',
              height: isRevealed ? '140vh' : '20vh',
              transformOrigin: 'center top',
              transform: `translate(-50%, -50%) rotate(${i * 22.5}deg)`,
              background: 'linear-gradient(to bottom, rgba(255,240,160,0.85), transparent)',
              filter: 'blur(7px)',
              transition: `height 1.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.03}s, opacity 0.6s ease`,
              opacity: isOpening ? 0.75 : 0,
            }}
          />
        ))}
      </div>

      {/* ═════════════════════════════════════════════════════════
          3. REALISTIC TEMPLE DOUBLE DOORS (The Centerpiece)
         ═════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 flex"
        style={{
          perspective: '1600px',
          WebkitPerspective: '1600px',
          perspectiveOrigin: '50% 50%',
          WebkitPerspectiveOrigin: '50% 50%',
          zIndex: 15,
        }}
        onClick={handleTouch}
      >
        {/* ── LEFT DOOR LEAF ── */}
        <div
          className="relative flex-1 h-full overflow-hidden"
          style={{
            transformOrigin: 'left center',
            transform: isOpening ? 'rotateY(-108deg)' : isKnock ? 'rotateY(-2.5deg)' : 'rotateY(0deg)',
            transition: isOpening
              ? 'transform 1.6s cubic-bezier(0.35, 0, 0.2, 1)'
              : isKnock
                ? 'transform 0.18s ease'
                : 'none',
            transformStyle: 'preserve-3d',
            WebkitTransformStyle: 'preserve-3d',
            cursor: phase === 'idle' ? 'pointer' : 'default',
            boxShadow: isOpening ? '15px 0 50px rgba(0,0,0,0.85)' : 'none',
          }}
        >
          {/* Photorealistic Left Half Image (Portrait on mobile, Landscape on desktop) */}
          <picture className="absolute inset-0 pointer-events-none">
            <source media="(max-width: 768px)" srcSet="/temple-doors-portrait.jpg" />
            <img
              src="/temple-doors.jpg"
              alt="Temple Sanctum Door"
              className="absolute h-full object-cover max-w-none"
              style={{
                width: '200%',
                left: 0,
                top: 0,
                filter: isKnock ? 'brightness(1.08)' : 'brightness(0.96) contrast(1.08)',
                transition: 'filter 0.3s ease',
              }}
            />
          </picture>

          {/* Depth shading on the inner edge of door */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, rgba(0,0,0,0.45) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.60) 100%)',
            }}
          />

          {/* Opening shadow darkening as it pivots away */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'black',
              opacity: isOpening ? 0.65 : 0,
              transition: 'opacity 1.6s ease',
            }}
          />
        </div>

        {/* ── CENTRAL GLOWING SEAM / CRACK (Mysterious Light from Sanctum) ── */}
        <div
          className="relative h-full pointer-events-none"
          style={{
            width: isOpening ? '0px' : '3px',
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(255,225,120,0.95) 20%, rgba(255,245,180,1) 50%, rgba(255,225,120,0.95) 80%, transparent 100%)',
            filter: 'blur(2.5px)',
            flexShrink: 0,
            transition: 'width 0.35s ease',
            boxShadow: '0 0 22px 6px rgba(251,191,36,0.75)',
            zIndex: 18,
          }}
        />

        {/* ── RIGHT DOOR LEAF ── */}
        <div
          className="relative flex-1 h-full overflow-hidden"
          style={{
            transformOrigin: 'right center',
            transform: isOpening ? 'rotateY(108deg)' : isKnock ? 'rotateY(2.5deg)' : 'rotateY(0deg)',
            transition: isOpening
              ? 'transform 1.6s cubic-bezier(0.35, 0, 0.2, 1)'
              : isKnock
                ? 'transform 0.18s ease'
                : 'none',
            transformStyle: 'preserve-3d',
            WebkitTransformStyle: 'preserve-3d',
            cursor: phase === 'idle' ? 'pointer' : 'default',
            boxShadow: isOpening ? '-15px 0 50px rgba(0,0,0,0.85)' : 'none',
          }}
        >
          {/* Photorealistic Right Half Image (Portrait on mobile, Landscape on desktop) */}
          <picture className="absolute inset-0 pointer-events-none">
            <source media="(max-width: 768px)" srcSet="/temple-doors-portrait.jpg" />
            <img
              src="/temple-doors.jpg"
              alt="Temple Sanctum Door"
              className="absolute h-full object-cover max-w-none"
              style={{
                width: '200%',
                right: 0,
                top: 0,
                filter: isKnock ? 'brightness(1.08)' : 'brightness(0.96) contrast(1.08)',
                transition: 'filter 0.3s ease',
              }}
            />
          </picture>

          {/* Depth shading on the inner edge of door */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(270deg, rgba(0,0,0,0.45) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.60) 100%)',
            }}
          />

          {/* Opening shadow darkening as it pivots away */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'black',
              opacity: isOpening ? 0.65 : 0,
              transition: 'opacity 1.6s ease',
            }}
          />
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════
          4. AMBIENT FLICKERING OIL LAMP GLOW (Front Overlays)
         ═════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 22,
          opacity: isOpening ? 0 : 1,
          transition: 'opacity 0.6s ease',
        }}
      >
        {/* Left lamp glow aura */}
        <div
          className="absolute left-[2%] sm:left-[8%] top-[55%] -translate-y-1/2 w-48 h-48 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(255,185,50,0.32) 0%, rgba(234,88,12,0.14) 45%, transparent 70%)',
            filter: 'blur(30px)',
            animation: 'lampFlicker 3s ease-in-out infinite alternate',
          }}
        />
        {/* Right lamp glow aura */}
        <div
          className="absolute right-[2%] sm:right-[8%] top-[55%] -translate-y-1/2 w-48 h-48 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(255,185,50,0.32) 0%, rgba(234,88,12,0.14) 45%, transparent 70%)',
            filter: 'blur(30px)',
            animation: 'lampFlicker 3s ease-in-out 1.2s infinite alternate',
          }}
        />
      </div>

      {/* ═════════════════════════════════════════════════════════
          5. TOUCH CTA & AESTHETIC HINTS (Bottom)
         ═════════════════════════════════════════════════════════ */}
      <div
        className="absolute bottom-6 sm:bottom-8 inset-x-0 z-30 flex flex-col items-center pointer-events-none"
        style={{
          opacity: isOpening ? 0 : 1,
          transition: 'opacity 0.4s ease',
        }}
      >
        <div
          className="flex items-center gap-2.5 px-5 py-2 rounded-full border border-amber-300/35 shadow-2xl backdrop-blur-md"
          style={{
            background: 'rgba(10,2,6,0.65)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.7), 0 0 20px rgba(251,191,36,0.22)',
            animation: 'pulseHint 2.4s ease-in-out infinite',
          }}
        >
          <span className="text-amber-400 text-xs sm:text-sm animate-bounce">👆</span>
          <span className="font-sans text-[9px] sm:text-[11px] uppercase tracking-[0.26em] font-bold text-amber-200">
            Touch the Temple Doors to Enter
          </span>
        </div>
        <p
          className="font-serif italic text-[9px] sm:text-[10px] tracking-wide mt-2"
          style={{ color: 'rgba(255,255,255,0.45)', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}
        >
          The Sacred Mandapam awaits
        </p>
      </div>

      {/* ═════════════════════════════════════════════════════════
          6. POST-REVEAL COUPLE TITLE OVERLAY (While transitioning)
         ═════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-end pb-16 sm:pb-24 pointer-events-none"
        style={{
          opacity: isRevealed ? 1 : 0,
          transition: 'opacity 1.0s ease 0.6s',
          zIndex: 25,
        }}
      >
        <div className="flex flex-col items-center gap-2 text-center px-6">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-300/40"
            style={{
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          >
            <span className="text-amber-400 text-xs">🪔</span>
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-amber-200">
              சுபமுகூர்த்த அழைப்பிதழ்
            </span>
            <span className="text-amber-400 text-xs">🪔</span>
          </div>
          <h1
            className="font-serif font-bold drop-shadow-2xl text-amber-100"
            style={{
              fontSize: 'clamp(2rem, 6vw, 4.2rem)',
              textShadow: '0 4px 35px rgba(0,0,0,0.95), 0 0 20px rgba(251,191,36,0.4)',
            }}
          >
            Arulraj &amp; Vijayalakshmi
          </h1>
          <div className="flex items-center gap-3">
            <div className="w-16 sm:w-24 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(251,191,36,0.9))' }} />
            <span style={{ color: 'rgba(251,191,36,0.95)', fontSize: '13px' }}>✦ ☸ ✦</span>
            <div className="w-16 sm:w-24 h-px" style={{ background: 'linear-gradient(90deg, rgba(251,191,36,0.9), transparent)' }} />
          </div>
          <p
            className="font-sans text-xs sm:text-sm font-semibold tracking-[0.24em] uppercase"
            style={{ color: 'rgba(255,200,210,0.88)', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
          >
            22 · 11 · 2026 · Surandai, Tenkasi
          </p>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════
          7. SKIP BUTTON (Top Right)
         ═════════════════════════════════════════════════════════ */}
      <button
        onClick={handleTouch}
        className="absolute z-50 top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/20 text-white/75 text-[10px] font-sans font-semibold tracking-wider transition-all hover:text-white hover:border-amber-300/50 hover:bg-black/60 active:scale-95 cursor-pointer"
        style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(12px)' }}
      >
        Skip <span className="material-symbols-outlined text-sm leading-none">arrow_forward</span>
      </button>

      {/* ═════════════════════════════════════════════════════════
          8. SCOPED ANIMATION STYLES
         ═════════════════════════════════════════════════════════ */}
      <style>{`
        @keyframes lampFlicker {
          0%   { opacity: 0.70; transform: translateY(-50%) scale(0.95); }
          50%  { opacity: 0.95; transform: translateY(-50%) scale(1.06); }
          100% { opacity: 0.65; transform: translateY(-50%) scale(0.92); }
        }
        @keyframes pulseHint {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  )
}