// Sacred Kolam mandala SVG header
export default function Header() {
  return (
    <section className="flex flex-col items-center text-center pt-2 anim-fade">
      {/* Pill badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 border border-pink-200/80 backdrop-blur-md shadow-[0_4px_16px_rgba(244,114,182,0.15)] mb-5">
        <span className="text-rose-500 text-xs leading-none">✨</span>
        <span className="font-sans text-xs tracking-wider uppercase text-rose-800 font-semibold">
          🕉️ சுபமுகூர்த்தம் • A CELESTIAL UNION
        </span>
        <span className="text-rose-500 text-xs leading-none">✨</span>
      </div>

      {/* Kolam mandala */}
      <div className="w-16 h-16 mb-4 rounded-full flex items-center justify-center bg-gradient-to-br from-white via-rose-50 to-pink-100/90 border border-pink-300/70 shadow-[0_6px_20px_rgba(225,29,72,0.12)]">
        <svg
          className="w-9 h-9 text-[#b76e79] animate-pulse"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          style={{ animationDuration: '4s' }}
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
          <circle cx="12" cy="12" fill="#e11d48" fillOpacity="0.15" r="3.5" />
        </svg>
      </div>

      <h1 className="font-serif text-[28px] sm:text-3xl text-rosewood font-medium tracking-tight leading-snug drop-shadow-sm px-2">
        The Wedding of<br />
        <span className="name-shimmer font-bold">Arulraj &amp; Vijayalakshmi</span>
      </h1>
      <p className="font-sans text-sm sm:text-base text-rosewood-light/85 italic mt-3 max-w-xs">
        "Our forever begins suspended in love."
      </p>
    </section>
  )
}
