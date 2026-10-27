import { useState, useRef, useEffect } from 'react'

export default function ShaadipathHero({ isAudioPlaying = true, toggleAudio }) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [showCenterIcon, setShowCenterIcon] = useState(false)

  // Autoplay video safely on mount and unlock on first user gesture (critical for iOS Safari)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Explicitly enforce muted properties for iOS Safari WebKit engine
    video.muted = true
    video.defaultMuted = true
    video.setAttribute('muted', '')
    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', 'true')
    video.setAttribute('x5-playsinline', 'true')

    const startPlay = () => {
      if (!video) return
      video.muted = true
      video.defaultMuted = true
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
          })
          .catch((err) => {
            console.warn('Autoplay waiting for user gesture:', err)
            setIsPlaying(false)
          })
      }
    }

    // Attempt autoplay immediately
    startPlay()

    // iOS WebKit Fallback: Safari unlocks media on any touch / click / envelope unseal gesture
    const handleUserInteraction = () => {
      if (video && video.paused) {
        startPlay()
      }
    }

    window.addEventListener('royal-envelope-opened', handleUserInteraction, { passive: true })
    window.addEventListener('touchstart', handleUserInteraction, { passive: true, once: true })
    window.addEventListener('touchend', handleUserInteraction, { passive: true, once: true })
    window.addEventListener('click', handleUserInteraction, { passive: true, once: true })
    window.addEventListener('scroll', handleUserInteraction, { passive: true, once: true })

    return () => {
      window.removeEventListener('royal-envelope-opened', handleUserInteraction)
      window.removeEventListener('touchstart', handleUserInteraction)
      window.removeEventListener('touchend', handleUserInteraction)
      window.removeEventListener('click', handleUserInteraction)
      window.removeEventListener('scroll', handleUserInteraction)
    }
  }, [])

  const togglePlay = (e) => {
    if (e) e.stopPropagation()
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
      setShowCenterIcon(true)
      setTimeout(() => setShowCenterIcon(false), 900)
    } else {
      videoRef.current.muted = true
      videoRef.current.defaultMuted = true
      videoRef.current.play().then(() => {
        setIsPlaying(true)
        setShowCenterIcon(true)
        setTimeout(() => setShowCenterIcon(false), 900)
      }).catch(err => {
        console.warn('Video play error:', err)
      })
    }
  }

  const handleSoundToggle = (e) => {
    if (e) e.stopPropagation()
    if (toggleAudio) {
      toggleAudio()
    }
  }

  const scrollToContent = () => {
    const el = document.getElementById('invitation-details')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const pausedClass = isPlaying ? '' : 'walking-paused'

  // Volumetric god rays with calculated angles radiating from top center
  const godRays = [
    { rot: '-48deg', width: '90px', delay: '0s', left: '46%' },
    { rot: '-34deg', width: '130px', delay: '1.2s', left: '48%' },
    { rot: '-20deg', width: '110px', delay: '2.5s', left: '49%' },
    { rot: '-7deg', width: '150px', delay: '0.6s', left: '50%' },
    { rot: '7deg', width: '140px', delay: '1.8s', left: '50%' },
    { rot: '22deg', width: '120px', delay: '3.1s', left: '51%' },
    { rot: '36deg', width: '130px', delay: '0.9s', left: '52%' },
    { rot: '50deg', width: '95px', delay: '2.1s', left: '54%' },
  ]

  return (
    <section
      className="relative w-full h-screen min-h-[600px] max-h-[1080px] overflow-hidden flex flex-col justify-between items-center text-center select-none cursor-pointer"
      style={{ height: '100dvh' }}
      onClick={togglePlay}
    >
      {/* ── BACKGROUND: Authentic Couple Walking in Temple Corridor Video ── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#1f0b15]">
        <video
          ref={videoRef}
          src="/couple_walking.mp4"
          poster="/couple-walking.jpg"
          autoPlay
          loop
          muted
          defaultMuted
          playsInline
          webkit-playsinline="true"
          x5-playsinline="true"
          preload="auto"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className={`w-full h-full object-cover transition-transform duration-1000 ease-out will-change-transform ${isPlaying ? 'scale-105' : 'scale-100'
            }`}
        />

        {/* Cinematic Altar Warm Glow Gradients (Shaadipath Style) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a0e1c]/70 via-transparent to-[#1c0812]/85 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#15050e] via-[#15050e]/30 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* ── SHAADIPATH VOLUMETRIC GLOWING LIGHT RAYS ── */}
      <div className="god-rays-overlay pointer-events-none z-10">
        {/* Divine Sanctum Core Halo */}
        <div className="divine-sanctum-halo" />

        {/* Radiating God Ray Beams */}
        {godRays.map((ray, i) => (
          <div
            key={i}
            className="god-ray-beam h-[140vh]"
            style={{
              width: ray.width,
              left: ray.left,
              '--rot': ray.rot,
              transform: `rotate(${ray.rot})`,
              animationDelay: ray.delay,
            }}
          />
        ))}
      </div>

      {/* ── DIVINE FLOATING PETALS & TEMPLE SPARKLES ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        <div className={`cinematic-petal-fall-1 absolute -top-6 left-[15%] text-rose-300 text-xl drop-shadow-[0_2px_8px_rgba(244,63,94,0.6)] ${pausedClass}`}>🌸</div>
        <div className={`cinematic-petal-fall-2 absolute -top-8 left-[72%] text-pink-200 text-sm drop-shadow ${pausedClass}`}>🌸</div>
        <div className={`cinematic-jasmine-fall absolute -top-6 left-[38%] text-white text-base drop-shadow-[0_2px_10px_rgba(255,255,255,0.9)] ${pausedClass}`}>🤍</div>
        <div className={`cinematic-petal-fall-1 absolute -top-6 left-[85%] text-rose-200 text-lg ${pausedClass}`} style={{ animationDelay: '3.4s' }}>🌸</div>
        <div className={`cinematic-petal-fall-2 absolute -top-6 left-[28%] text-pink-100 text-xs ${pausedClass}`} style={{ animationDelay: '1.9s' }}>🤍</div>

        {/* Golden Divine Sparkles */}
        <div className="gold-sparkle-1 absolute top-[22%] left-[18%] w-2.5 h-2.5 bg-amber-200 rounded-full shadow-[0_0_12px_#fde047]" />
        <div className="gold-sparkle-2 absolute top-[38%] right-[20%] w-2 h-2 bg-yellow-100 rounded-full shadow-[0_0_10px_#fef08a]" />
        <div className="gold-sparkle-3 absolute top-[62%] left-[25%] w-2 h-2 bg-rose-200 rounded-full shadow-[0_0_8px_#fecdd3]" />
      </div>

      {/* ── CENTER PLAY/PAUSE FEEDBACK ICON ── */}
      {showCenterIcon && (
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
          <div className="w-20 h-20 rounded-full bg-black/60 backdrop-blur-md border border-amber-300/60 flex items-center justify-center text-white shadow-[0_0_40px_rgba(251,191,36,0.6)] animate-ping" style={{ animationIterationCount: 1, animationDuration: '0.6s' }}>
            <span className="material-symbols-outlined text-4xl text-amber-200">
              {isPlaying ? 'play_arrow' : 'pause'}
            </span>
          </div>
        </div>
      )}

      {/* ── TOP SECTION: SCRIPTURE & VEDIC BLESSING ── */}
      <header className="relative z-30 pt-10 sm:pt-14 px-4 max-w-2xl mx-auto flex flex-col items-center gap-2.5 pointer-events-none anim-fade">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-amber-300/40 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
          <span className="text-amber-300 text-xs">🪔</span>
          <span className="font-sans text-[10px] sm:text-xs tracking-[0.2em] uppercase text-amber-200 font-semibold drop-shadow">
            ॐ श्री गणेशाय नमः • சுபமுகூர்த்தம்
          </span>
          <span className="text-amber-300 text-xs">🪔</span>
        </div>

        {/* Sacred Sanskrit / Vedic Blessing */}
        <p className="font-serif italic text-white/95 text-xs sm:text-sm tracking-wide leading-relaxed max-w-lg drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] mt-1">
          "Where two souls unite in sacred Vedic harmony, bound by seven eternal steps under divine grace."
        </p>
      </header>

      {/* ── CENTER SECTION: ROYAL COUPLE TYPOGRAPHY ── */}
      <div className="relative z-30 px-3 sm:px-4 flex flex-col items-center gap-2.5 sm:gap-3 my-auto pointer-events-none anim-fade-2 w-full max-w-4xl mx-auto">
        {/* Grand Couple Names */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] max-w-full break-words">
          <span className="bg-gradient-to-r from-amber-100 via-rose-100 to-amber-200 bg-clip-text text-transparent">
            Arulraj
          </span>
          <span className="font-serif italic font-normal text-xl sm:text-3xl md:text-4xl text-amber-300/90 mx-2 sm:mx-3 drop-shadow">
            &amp;
          </span>
          <span className="bg-gradient-to-r from-amber-200 via-pink-100 to-amber-100 bg-clip-text text-transparent">
            Vijayalakshmi
          </span>
        </h1>

        {/* Sacred Ornament Divider */}
        <div className="flex items-center gap-3 my-0.5 sm:my-1">
          <div className="w-10 sm:w-20 h-px bg-gradient-to-r from-transparent via-amber-300/80 to-transparent" />
          <span className="text-amber-300 text-xs sm:text-base drop-shadow-[0_0_8px_#fde047]">✦ ☸ ✦</span>
          <div className="w-10 sm:w-20 h-px bg-gradient-to-r from-transparent via-amber-300/80 to-transparent" />
        </div>

        {/* Auspicious Date */}
        <p className="font-serif text-base sm:text-2xl md:text-3xl text-amber-100 tracking-[0.2em] sm:tracking-[0.25em] font-medium drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] uppercase">
          22nd  November  2026
        </p>

      </div>

      {/* ── BOTTOM SECTION: SCROLL DOWN INDICATOR & LIVE AISLE HUD ── */}
      <footer className="relative z-30 pb-7 sm:pb-12 px-4 flex flex-col items-center gap-3.5 sm:gap-4 w-full pointer-events-auto">

        {/* Scroll Down Button (Shaadipath Style) */}
        <button
          onClick={(e) => { e.stopPropagation(); scrollToContent(); }}
          className="flex flex-col items-center gap-1.5 text-white/90 hover:text-amber-200 transition-colors group cursor-pointer"
          aria-label="Scroll to invitation details"
        >
          <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-medium text-pink-100 group-hover:text-amber-200 drop-shadow">
            SCROLL TO EXPLORE
          </span>
          <span className="material-symbols-outlined text-2xl text-amber-300 scroll-indicator-arrow drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            keyboard_arrow_down
          </span>
        </button>
      </footer>

      {/* ── FLOATING CONTROLS (BOTTOM-RIGHT CORNER, SHAADIPATH PATTERN) ── */}
      <div
        className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-50 flex flex-col items-center gap-2.5 sm:gap-3 pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Play / Pause Toggle */}
        <button
          aria-label={isPlaying ? "Pause Video" : "Play Video"}
          title={isPlaying ? "Pause Video" : "Play Video"}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/65 hover:bg-black/90 backdrop-blur-xl border border-amber-300/60 flex items-center justify-center text-white shadow-[0_6px_25px_rgba(0,0,0,0.5)] active:scale-90 hover:scale-105 transition-all cursor-pointer"
          onClick={togglePlay}
          type="button"
        >
          <span className="material-symbols-outlined text-xl sm:text-2xl text-amber-200">
            {isPlaying ? 'pause' : 'play_arrow'}
          </span>
        </button>

        {/* Audio / Mute Toggle Button with Visualizer Wave Bars */}
        <button
          aria-label={isAudioPlaying ? "Mute Nadaswaram Sound" : "Play Nadaswaram Sound"}
          title={isAudioPlaying ? "Click to pause Nadaswaram sound" : "Click to play Nadaswaram sound"}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/65 hover:bg-black/90 backdrop-blur-xl border border-pink-300/60 flex flex-col items-center justify-center text-white shadow-[0_6px_25px_rgba(0,0,0,0.5)] active:scale-90 hover:scale-105 transition-all cursor-pointer"
          onClick={handleSoundToggle}
          type="button"
        >
          {!isAudioPlaying ? (
            <span className="material-symbols-outlined text-lg sm:text-xl text-pink-200">
              volume_off
            </span>
          ) : (
            <div className="flex items-center gap-0.5 h-4">
              <div className="w-0.5 bg-rose-300 rounded-full sound-wave-bar1" />
              <div className="w-0.5 bg-pink-200 rounded-full sound-wave-bar2" />
              <div className="w-0.5 bg-white rounded-full sound-wave-bar3" />
              <div className="w-0.5 bg-amber-300 rounded-full sound-wave-bar4" />
            </div>
          )}
        </button>
      </div>
    </section>
  )
}
