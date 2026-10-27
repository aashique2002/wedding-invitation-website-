import { useState, useRef } from 'react'
import AmbientLayer from './components/AmbientLayer'
import RoyalEnvelopeIntro from './components/RoyalEnvelopeIntro'
import ShaadipathHero from './components/ShaadipathHero'
import Countdown from './components/Countdown'
import FormalInvitationCard from './components/FormalInvitationCard'
import Festivities from './components/Festivities'
import Venue from './components/Venue'
import Footer from './components/Footer'

export default function App() {
  const audioRef = useRef(null)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)

  // Called when the user unseals the Royal Envelope
  const handleEnvelopeOpen = () => {
    // Notify hero video to start playing synchronously within this active user touch gesture
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('royal-envelope-opened'))
    }

    if (audioRef.current) {
      audioRef.current.volume = 0
      audioRef.current.play().then(() => {
        setIsAudioPlaying(true)
        // Smoothly fade in volume over 1.5 seconds
        let vol = 0
        const fadeInterval = setInterval(() => {
          vol += 0.05
          if (vol >= 0.75) {
            audioRef.current.volume = 0.75
            clearInterval(fadeInterval)
          } else if (audioRef.current) {
            audioRef.current.volume = vol
          }
        }, 100)
      }).catch(err => {
        console.warn('Audio play request:', err)
      })
    }
  }

  // Toggle audio anytime from the floating pill
  const toggleAudio = () => {
    if (!audioRef.current) return
    if (isAudioPlaying) {
      audioRef.current.pause()
      setIsAudioPlaying(false)
    } else {
      audioRef.current.play().then(() => {
        setIsAudioPlaying(true)
      }).catch(err => console.warn(err))
    }
  }

  return (
    <div className="bg-gradient-to-b from-[#fff8fa] via-[#fff0f4] to-[#fde8ed] font-sans text-rosewood antialiased min-h-screen selection:bg-rose-200 selection:text-rose-900 overflow-x-hidden">
      {/* ── PERSISTENT NADASWARAM WEDDING AUDIO STREAM ── */}
      <audio
        ref={audioRef}
        src="/nadaswaram.mp3"
        loop
        preload="auto"
      />

      {/* ── 0. INTERACTIVE ROYAL SILK ENVELOPE INTRO ── */}
      <RoyalEnvelopeIntro onOpen={handleEnvelopeOpen} />

      {/* Fixed ambient background petals & glowing orbs */}
      <AmbientLayer />

      {/* ── 1. GRAND CINEMATIC HERO (Temple Corridor Video + Volumetric God Rays + Floating Audio Controls) ── */}
      <ShaadipathHero
        isAudioPlaying={isAudioPlaying}
        toggleAudio={toggleAudio}
      />

      {/* ── 2. INVITATION DETAILS & CELEBRATIONS ── */}
      <main id="invitation-details" className="relative w-full min-h-screen pt-10 pb-16">
        <div className="w-full max-w-5xl mx-auto px-4 flex flex-col gap-10 relative" style={{ zIndex: 2 }}>

          {/* 🌟 Hindu Tamil Sacred Wedding Card Book (Opens on scroll) */}
          <FormalInvitationCard />

          {/* Sacred Muhurtham Live Countdown */}
          <div className="w-full max-w-lg mx-auto">
            <Countdown />
          </div>

          {/* Festivities & Muhurtham Timeline (Inline 2-card scratch layout) */}
          <div className="w-full max-w-5xl mx-auto">
            <Festivities />
          </div>

          <div className="w-full max-w-lg mx-auto flex flex-col gap-8">
            {/* 🌟 Venue with Interactive Google Maps Embed + WhatsApp Share Button */}
            <Venue />

            {/* Traditional Footer */}
            <Footer />
          </div>
        </div>
      </main>
    </div>
  )
}
