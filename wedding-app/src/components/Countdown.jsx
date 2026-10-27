import { useCountdown } from '../hooks/useCountdown'

function Digit({ value, flipped, label }) {
  return (
    <div className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white/95 border border-pink-100 shadow-[0_2px_8px_rgba(225,29,72,0.06)]">
      <span
        key={value} // forces re-render for animation
        className={`font-serif text-2xl text-[#831843] font-semibold inline-block transition-transform ${flipped ? 'digit-flip' : ''}`}
      >
        {String(value).padStart(2, '0')}
      </span>
      <span className="font-sans uppercase tracking-wider text-[10px] text-rose-500 font-medium">{label}</span>
    </div>
  )
}

export default function Countdown() {
  const { time, flipped } = useCountdown()

  return (
    <div className="w-full mt-7 p-4 sm:p-5 rounded-2xl bg-white/85 border border-pink-200/80 backdrop-blur-md shadow-[0_8px_30px_rgba(244,114,182,0.14)]">
      <div className="flex items-center justify-center gap-1.5 mb-3">
        <span className="material-symbols-outlined text-[#b76e79] text-sm">schedule</span>
        <p className="font-sans text-xs uppercase tracking-widest text-[#831843] font-semibold">Sacred Muhurtham Countdown</p>
      </div>
      <div className="grid grid-cols-4 gap-2.5">
        <Digit value={time.d} flipped={flipped.d} label="Days" />
        <Digit value={time.h} flipped={flipped.h} label="Hours" />
        <Digit value={time.m} flipped={flipped.m} label="Mins" />
        <Digit value={time.s} flipped={flipped.s} label="Secs" />
      </div>
      <p className="font-sans text-xs text-rosewood-light/80 text-center mt-3 font-medium">
        November 22, 2026 • 07:45 AM IST
      </p>
    </div>
  )
}
