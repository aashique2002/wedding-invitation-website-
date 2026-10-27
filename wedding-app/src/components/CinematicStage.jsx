import { useState, useRef, useEffect } from 'react'

export default function CinematicStage() {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [showCenterIcon, setShowCenterIcon] = useState(false)

  // Ensure autoplay on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.warn('Autoplay prevented or waiting for interaction:', err)
        setIsPlaying(false)
      })
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
      videoRef.current.play().then(() => {
        setIsPlaying(true)
        setShowCenterIcon(true)
        setTimeout(() => setShowCenterIcon(false), 900)
      }).catch(err => {
        console.warn('Play error:', err)
      })
    }
  }

  const toggleSound = (e) => {
    if (e) e.stopPropagation()
    if (!videoRef.current) return

    const nextMuted = !isMuted
    videoRef.current.muted = nextMuted
    setIsMuted(nextMuted)
  }

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const pct = (videoRef.current.currentTime / videoRef.current.duration) * 100
      setProgress(pct)
    }
  }

  const pausedClass = isPlaying ? '' : 'walking-paused'

  return (
    <div className="w-full mt-6 rounded-[28px] p-2 sm:p-2.5 bg-gradient-to-b from-rose-200/90 via-pink-100/80 to-pink-200/90 shadow-[0_16px_45px_rgba(225,29,72,0.25)] border border-pink-300/80 backdrop-blur-md relative group transition-all duration-300 hover:shadow-[0_20px_50px_rgba(225,29,72,0.32)]">
      {/* 9:16 frame */}
      <div 
        className="relative w-full aspect-[9/16] rounded-[22px] overflow-hidden bg-[#1e0814] shadow-[inset_0_2px_12px_rgba(0,0,0,0.6)] cursor-pointer select-none"
        onClick={togglePlay}
      >
        {/* Real MP4 Video */}
        <video
          ref={videoRef}
          src="/couple_walking.mp4"
          poster="/couple-walking.jpg"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out will-change-transform ${isPlaying ? 'scale-[1.02]' : 'scale-100'}`}
        />

        {/* Cinematic Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/55 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-[circle_at_center] from-transparent via-rose-950/20 to-black/50 pointer-events-none" />

        {/* Falling Petals & Gold Sparkles Overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          <div className={`cinematic-petal-fall-1 absolute -top-4 left-[18%] text-rose-300/95 text-base drop-shadow-[0_2px_6px_rgba(244,63,94,0.4)] ${pausedClass}`}>🌸</div>
          <div className={`cinematic-petal-fall-2 absolute -top-6 left-[68%] text-pink-200/90 text-sm drop-shadow ${pausedClass}`}>🌸</div>
          <div className={`cinematic-jasmine-fall absolute -top-4 left-[42%] text-white text-xs drop-shadow-[0_2px_8px_rgba(255,255,255,0.9)] ${pausedClass}`}>🤍</div>
          <div className={`cinematic-petal-fall-1 absolute -top-6 left-[84%] text-rose-200/85 text-lg ${pausedClass}`} style={{ animationDelay: '3.2s' }}>🌸</div>
          <div className={`cinematic-petal-fall-2 absolute -top-5 left-[8%] text-pink-100/80 text-xs ${pausedClass}`} style={{ animationDelay: '1.8s' }}>🤍</div>

          {/* Golden Divine Sparkles */}
          <div className="gold-sparkle-1 absolute top-[26%] left-[14%] w-2 h-2 bg-amber-300 rounded-full shadow-[0_0_8px_#fcd34d]" />
          <div className="gold-sparkle-2 absolute top-[44%] right-[12%] w-2 h-2 bg-yellow-200 rounded-full shadow-[0_0_10px_#fef08a]" />
          <div className="gold-sparkle-3 absolute top-[68%] left-[20%] w-1.5 h-1.5 bg-rose-200 rounded-full shadow-[0_0_8px_#fecdd3]" />
        </div>

        {/* Center Flash Icon on Play/Pause */}
        {showCenterIcon && (
          <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md border border-pink-300/60 flex items-center justify-center text-white shadow-[0_0_30px_rgba(244,114,182,0.5)] animate-ping" style={{ animationIterationCount: 1, animationDuration: '0.6s' }}>
              <span className="material-symbols-outlined text-3xl text-pink-200">
                {isPlaying ? 'play_arrow' : 'pause'}
              </span>
            </div>
          </div>
        )}

        {/* Top HUD */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 z-20 pointer-events-auto">
          {/* Live Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-rose-300/40 text-[10px] font-sans font-bold uppercase tracking-wider text-white shadow-lg">
            <span className="live-glow w-2 h-2 rounded-full bg-rose-500 inline-block shadow-[0_0_6px_#f43f5e]" />
            <span className="drop-shadow-sm">🔴 LIVE CINEMA • THE SACRED AISLE WALK</span>
          </div>

          {/* Sound / Nadaswaram Interactive Pill */}
          <button
            onClick={toggleSound}
            aria-label={isMuted ? "Unmute Nadaswaram sound" : "Mute Nadaswaram sound"}
            title={isMuted ? "Click to enable sound" : "Click to mute sound"}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/65 hover:bg-black/85 backdrop-blur-md border border-pink-300/40 shadow-md transition-all active:scale-95 cursor-pointer text-white"
          >
            {/* Visualizer bars */}
            <div className="flex items-center gap-0.5 h-3">
              <div className={`w-0.5 bg-rose-300 rounded-full sound-wave-bar1 ${pausedClass || isMuted ? 'h-1' : ''}`} />
              <div className={`w-0.5 bg-pink-200 rounded-full sound-wave-bar2 ${pausedClass || isMuted ? 'h-1.5' : ''}`} />
              <div className={`w-0.5 bg-white rounded-full sound-wave-bar3 ${pausedClass || isMuted ? 'h-2' : ''}`} />
              <div className={`w-0.5 bg-amber-300 rounded-full sound-wave-bar4 ${pausedClass || isMuted ? 'h-1' : ''}`} />
            </div>
            <span className="text-[9px] uppercase tracking-wider text-pink-200 font-sans font-semibold">
              {isMuted ? 'MUTE 🔇' : 'AUDIO 🔊'}
            </span>
          </button>
        </div>

        {/* Right-Side Floating Actions */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3 pointer-events-auto">
          {/* Play/Pause Button */}
          <div className="flex flex-col items-center gap-1">
            <button
              aria-label={isPlaying ? "Pause Wedding Walk Video" : "Play Wedding Walk Video"}
              className="w-11 h-11 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-pink-300/70 flex items-center justify-center text-white shadow-[0_4px_20px_rgba(0,0,0,0.5)] active:scale-90 hover:scale-105 transition-all"
              onClick={togglePlay}
              type="button"
            >
              <span className="material-symbols-outlined text-xl text-pink-200">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>
            <span className="text-[9px] uppercase font-sans tracking-widest text-pink-100 font-semibold bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-sm shadow">
              {isPlaying ? 'Pause' : 'Play'}
            </span>
          </div>

          {/* Sound Toggle Button */}
          <div className="flex flex-col items-center gap-1">
            <button
              aria-label={isMuted ? "Unmute Sound" : "Mute Sound"}
              className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-amber-300/60 flex items-center justify-center text-white shadow-[0_4px_16px_rgba(0,0,0,0.4)] active:scale-90 hover:scale-105 transition-all"
              onClick={toggleSound}
              type="button"
            >
              <span className="material-symbols-outlined text-base text-amber-200">
                {isMuted ? 'volume_off' : 'volume_up'}
              </span>
            </button>
            <span className="text-[8px] uppercase font-sans tracking-wider text-amber-200/90 font-medium bg-black/50 px-1.5 py-0.5 rounded-full backdrop-blur-sm">
              Sound
            </span>
          </div>
        </div>

        {/* Bottom Glass Information Card */}
        <div className="absolute bottom-3 inset-x-3 z-20 pointer-events-auto">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-black/65 backdrop-blur-xl border border-pink-300/40 shadow-2xl flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-amber-300 text-sm animate-pulse">🪔</span>
                <span className="text-[10px] uppercase font-sans tracking-widest text-amber-200 font-bold">
                  Mangala Vadhyam Ceremony
                </span>
              </div>
              <span className="text-[10px] font-sans text-pink-200/90 font-semibold bg-white/10 px-2 py-0.5 rounded-full">
                08:45 AM IST
              </span>
            </div>
            
            <p className="font-serif italic text-white text-sm leading-snug drop-shadow-md">
              "Arulraj &amp; Vijayalakshmi • Walking Hand in Hand Towards Our Kalyanam"
            </p>
            
            {/* Live Progress Bar synced to video */}
            <div className="flex items-center gap-2 pt-1">
              <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-pink-400 via-rose-300 to-amber-300 rounded-full transition-all duration-200 ease-linear"
                  style={{ width: `${Math.max(progress, 3)}%` }}
                />
              </div>
              <span className="text-[9px] font-sans font-medium text-pink-200 whitespace-nowrap flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping inline-block" />
                Live Aisle
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
