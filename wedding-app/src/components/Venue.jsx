import { useState } from 'react'

const VENUE_NAME     = "Senaithalaivar Kalyana Mandapam"
const VENUE_ADDRESS  = "Surandai, Tenkasi District"
const MAP_QUERY_URL  = "https://maps.google.com/maps?q=Senaithalaivar+Kalyana+Mandapam&t=&z=15&ie=UTF8&iwloc=&output=embed"
const GOOGLE_MAPS_LINK = "https://maps.app.goo.gl/wPLCnYeH51KLEmxb8"

// WhatsApp Share text generator
const WHATSAPP_SHARE_URL = (() => {
  const message = `💍 *Wedding Invitation: Arulraj & Vijayalakshmi* 🌸\n\nWith the divine blessings of Almighty, you are cordially invited to celebrate our sacred wedding ceremony!\n\n🗓️ *Date:* Sunday, 22nd November 2026\n⏰ *Muhurtham:* 07:45 AM - 08:45 AM\n📍 *Venue:* ${VENUE_NAME}, ${VENUE_ADDRESS}\n\n✨ View our wedding invitation & live video here:\n${window?.location?.href || 'http://localhost:5173/'}\n\nPlease grace us with your family's presence and blessings! 🪔`
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`
})()

// Google Calendar link
const CALENDAR_URL = (() => {
  const title    = encodeURIComponent("Arulraj & Vijayalakshmi's Wedding (Muhurtham)")
  const details  = encodeURIComponent(`Traditional South Indian Vedic wedding rituals at ${VENUE_NAME}, ${VENUE_ADDRESS}.`)
  const location = encodeURIComponent(`${VENUE_NAME}, ${VENUE_ADDRESS}`)
  const dates    = '20261122T021500Z/20261122T031500Z' // 07:45–08:45 AM IST
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`
})()


export default function Venue() {
  const [copiedLink, setCopiedLink] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 3000)
    })
  }

  return (
    <section className="flex flex-col p-5 sm:p-6 rounded-2xl bg-white/85 border border-pink-200/80 backdrop-blur-md shadow-[0_8px_30px_rgba(244,114,182,0.12)] anim-fade-4">
      {/* ── Section Header ── */}
      <div className="flex items-center justify-between pb-3 border-b border-pink-100">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-rose-500 text-2xl">temple_hindu</span>
          <h2 className="font-serif text-xl text-rosewood font-semibold tracking-wide">
            Sacred Mandapam &amp; Venue
          </h2>
        </div>
        <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-pink-200">
          Surandai, Tenkasi
        </span>
      </div>

      {/* Venue Description */}
      <div className="flex flex-col gap-1.5 mt-4">
        <h3 className="font-serif text-lg sm:text-xl font-bold text-rosewood">
          {VENUE_NAME}
        </h3>
        <p className="font-sans text-xs text-rosewood-light/90 leading-relaxed">
          {VENUE_ADDRESS} • Located in the heart of Surandai, Tenkasi District, equipped with traditional Vedic wedding halls and guest amenities.
        </p>
      </div>

      {/* ── INTERACTIVE GOOGLE MAPS EMBED ── */}
      <div className="mt-4 w-full h-56 sm:h-64 rounded-xl overflow-hidden border border-pink-200/80 shadow-inner relative group bg-rose-50">
        <iframe
          title="Wedding Venue Google Maps Location"
          src={MAP_QUERY_URL}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full filter saturate-[1.1] transition-all"
        />

        {/* Overlay map badge */}
        <div className="absolute top-2.5 left-2.5 pointer-events-none">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-pink-200 shadow-md text-[10px] font-sans font-bold text-rosewood">
            <span>📍</span>
            <span>Senaithalaivar Kalyana Mandapam</span>
          </div>
        </div>
      </div>

      {/* ── ACTION BUTTON: MAPS & DIRECTIONS ── */}
      <div className="mt-4">
        {/* Open in Google Maps App */}
        <a
          href={GOOGLE_MAPS_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-sans text-xs font-bold uppercase tracking-wider shadow-md active:scale-98 transition-all"
        >
          <span className="material-symbols-outlined text-base">directions</span>
          <span>Get Driving Directions</span>
        </a>
      </div>

      {/* Secondary calendar & copy row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2.5">
        <a
          href={CALENDAR_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-rose-50/70 hover:bg-rose-100/70 border border-pink-200 text-rose-800 text-xs font-semibold active:scale-98 transition-colors shadow-xs"
        >
          <span className="material-symbols-outlined text-rose-600 text-base">event</span>
          <span>Add to Google Calendar</span>
        </a>

        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-rose-50/70 hover:bg-rose-100/70 border border-pink-200 text-rose-800 text-xs font-semibold active:scale-98 transition-colors shadow-xs cursor-pointer"
        >
          <span className="material-symbols-outlined text-rose-600 text-base">
            {copiedLink ? 'check' : 'link'}
          </span>
          <span>{copiedLink ? 'Link Copied!' : 'Copy Invitation Link'}</span>
        </button>
      </div>

      {/* ── WHATSAPP SHARE CARD (PROMINENT LUXURY CTA) ── */}
      <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50 border border-emerald-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xl shadow-md shrink-0">
            💬
          </div>
          <div className="flex flex-col">
            <h4 className="font-serif text-sm font-bold text-emerald-950">
              Forward Invitation on WhatsApp
            </h4>
            <p className="font-sans text-[11px] text-emerald-800/85">
              Share the invitation card, video, and venue with family and relatives with 1 tap.
            </p>
          </div>
        </div>

        <a
          href={WHATSAPP_SHARE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-sans text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
        >
          <span>Share on WhatsApp</span>
          <span className="material-symbols-outlined text-sm">send</span>
        </a>
      </div>
    </section>
  )
}
