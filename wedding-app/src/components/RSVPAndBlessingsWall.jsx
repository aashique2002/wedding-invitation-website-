import { useState } from 'react'

const INITIAL_BLESSINGS = [
  {
    id: 1,
    name: 'K. Senthil Nathan & Family',
    relation: "Groom's Uncle",
    message: 'May Lord Murugan shower endless health, prosperity, and eternal happiness on Arulraj & Vijayalakshmi! Hearty congratulations on this divine union. 🌸',
    time: '2 hours ago'
  },
  {
    id: 2,
    name: 'Priya & Vignesh',
    relation: 'College Friends',
    message: 'Super excited to witness the sacred Kalyanam! Wishing our dear Arulraj & Viji a blissful lifetime of love, laughter, and endless adventures together! 💍✨',
    time: '5 hours ago'
  },
  {
    id: 3,
    name: 'Meenakshi Sundaram',
    relation: "Bride's Grand Aunt",
    message: 'எல்லாம் வல்ல இறைவன் அருளால் இருவரும் பல்லாண்டு காலம் நலமுடன் வாழ இறைவனைப் பிரார்த்திக்கிறேன். வாழ்க வளமுடன்! 🪔',
    time: '1 day ago'
  }
]

export default function RSVPAndBlessingsWall() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [blessings, setBlessings] = useState(INITIAL_BLESSINGS)
  const [submitted, setSubmitted] = useState(false)

  // Form State
  const [name, setName] = useState('')
  const [guestCount, setGuestCount] = useState('2')
  const [attendingMuhurtham, setAttendingMuhurtham] = useState(true)
  const [attendingReception, setAttendingReception] = useState(true)
  const [mealPreference, setMealPreference] = useState('Traditional South Indian Veg Feast (இலை சாப்பாடு)')
  const [blessingText, setBlessingText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return

    // If guest left a blessing message, add it to the Live Wall
    if (blessingText.trim()) {
      const newBlessing = {
        id: Date.now(),
        name: name.trim(),
        relation: `Attending with ${guestCount} Guest(s)`,
        message: blessingText.trim(),
        time: 'Just now • Verified Guest'
      }
      setBlessings([newBlessing, ...blessings])
    }

    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setIsModalOpen(false)
      // Reset form
      setName('')
      setBlessingText('')
    }, 2800)
  }

  return (
    <section className="flex flex-col gap-6 anim-fade-3">
      {/* ── 1. RSVP HERO BANNER CARD ── */}
      <div className="relative w-full rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-rose-500 via-pink-600 to-rose-700 text-white shadow-[0_12px_40px_rgba(225,29,72,0.3)] overflow-hidden">
        {/* Decorative corner glow */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-amber-300/25 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-pink-300/20 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div className="flex flex-col gap-1.5 max-w-sm">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md self-center sm:self-start text-[10px] uppercase font-sans font-bold tracking-widest text-amber-200">
              <span>💌</span>
              <span>GUEST RSVP &amp; CELEBRATION</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight">
              Grace Us with Your Presence
            </h3>
            <p className="font-sans text-xs text-rose-100/90 leading-relaxed">
              Kindly confirm your attendance to help us arrange the sacred rituals and traditional Kalyana Virundhu (Feast) for your family.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-amber-50 active:scale-95 text-rose-800 font-sans text-xs font-bold uppercase tracking-wider shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-base text-rose-600">event_available</span>
            <span>Confirm RSVP / Send Blessing</span>
          </button>
        </div>
      </div>

      {/* ── 2. LIVE BLESSINGS WALL ── */}
      <div className="flex flex-col rounded-2xl bg-white/85 border border-pink-200/80 backdrop-blur-md p-5 shadow-[0_8px_30px_rgba(244,114,182,0.12)]">
        {/* Wall Header */}
        <div className="flex items-center justify-between pb-3 border-b border-pink-100">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-rose-500 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              volunteer_activism
            </span>
            <h2 className="font-serif text-xl text-rosewood font-semibold tracking-wide">
              Live Blessings Wall
            </h2>
          </div>
          <span className="text-[10px] font-sans uppercase tracking-widest text-pink-700 bg-pink-100/80 px-2.5 py-1 rounded-full font-bold">
            {blessings.length} Blessings
          </span>
        </div>

        {/* Blessings List */}
        <div className="flex flex-col gap-3 mt-4">
          {blessings.map((b) => (
            <div
              key={b.id}
              className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-rose-50/80 via-white to-pink-50/60 border border-pink-200/60 shadow-xs flex flex-col gap-1.5 transition-all hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />
                  <span className="font-serif text-sm font-bold text-rosewood">
                    {b.name}
                  </span>
                  <span className="text-[10px] font-sans text-rose-700 bg-rose-100/70 px-2 py-0.5 rounded-full font-medium">
                    {b.relation}
                  </span>
                </div>
                <span className="text-[9px] font-sans text-rosewood-light/70">
                  {b.time}
                </span>
              </div>
              <p className="font-serif italic text-xs text-rosewood-light/95 leading-relaxed pl-3.5 border-l-2 border-pink-300">
                "{b.message}"
              </p>
            </div>
          ))}
        </div>

        {/* Quick Blessing Trigger */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 w-full py-2.5 rounded-xl bg-rose-50 hover:bg-pink-100/70 text-rose-800 text-xs font-sans font-semibold border border-pink-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm text-rose-500">edit_note</span>
          <span>Add Your Blessing on the Wall</span>
        </button>
      </div>

      {/* ── 3. INTERACTIVE RSVP & BLESSING MODAL ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm anim-fade">
          <div className="relative w-full max-w-md rounded-2xl bg-white border border-pink-200 shadow-2xl p-6 sm:p-7 max-h-[90vh] overflow-y-auto">
            
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-rose-50 hover:bg-rose-100 text-rosewood-light flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close Modal"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>

            {/* Modal Content */}
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Modal Title */}
                <div className="flex flex-col gap-1 pr-6">
                  <div className="flex items-center gap-1.5 text-xs text-amber-700 font-bold uppercase tracking-wider">
                    <span>🕉️</span>
                    <span>Confirm Attendance &amp; Blessings</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-rosewood">
                    Arulraj &amp; Vijayalakshmi's Kalyanam
                  </h3>
                  <p className="text-xs text-rosewood-light">
                    Kindly share your details so our family can welcome you with warmth.
                  </p>
                </div>

                <div className="w-full h-px bg-pink-100 my-1" />

                {/* Name Field */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-xs font-semibold text-rosewood">
                    Your Full Name / Family Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. S. Ramanathan & Family"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 text-sm font-sans text-rosewood outline-none transition-all"
                  />
                </div>

                {/* Guest Count */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-xs font-semibold text-rosewood">
                    Number of Attendees (including family)
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {['1', '2', '3', '4', '5+'].map((cnt) => (
                      <button
                        key={cnt}
                        type="button"
                        onClick={() => setGuestCount(cnt)}
                        className={`py-2 rounded-xl text-xs font-sans font-bold border transition-all cursor-pointer ${
                          guestCount === cnt
                            ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                            : 'bg-rose-50/60 text-rosewood border-pink-200 hover:bg-rose-100'
                        }`}
                      >
                        {cnt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ceremonies Attending */}
                <div className="flex flex-col gap-2">
                  <label className="font-sans text-xs font-semibold text-rosewood">
                    Ceremonies You Plan to Attend
                  </label>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-rose-50/70 border border-pink-200 cursor-pointer text-xs font-sans text-rosewood">
                      <input
                        type="checkbox"
                        checked={attendingMuhurtham}
                        onChange={(e) => setAttendingMuhurtham(e.target.checked)}
                        className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
                      />
                      <div>
                        <span className="font-bold">Sacred Muhurtham</span> — Sunday, Nov 22 (07:45 AM)
                      </div>
                    </label>

                    <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-rose-50/70 border border-pink-200 cursor-pointer text-xs font-sans text-rosewood">
                      <input
                        type="checkbox"
                        checked={attendingReception}
                        onChange={(e) => setAttendingReception(e.target.checked)}
                        className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
                      />
                      <div>
                        <span className="font-bold">Engagement / Reception</span> — Friday, Nov 20 (06:30 PM)
                      </div>
                    </label>
                  </div>
                </div>

                {/* Feast Preference */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-xs font-semibold text-rosewood">
                    Kalyana Virundhu (Traditional Feast)
                  </label>
                  <select
                    value={mealPreference}
                    onChange={(e) => setMealPreference(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 focus:border-rose-500 text-xs font-sans text-rosewood outline-none bg-white"
                  >
                    <option>Traditional South Indian Veg Feast (இலை சாப்பாடு)</option>
                    <option>Jain Vegetarian (No onion, No garlic)</option>
                    <option>Attending rituals only</option>
                  </select>
                </div>

                {/* Blessing Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-xs font-semibold text-rosewood">
                    Heartfelt Blessing for Arulraj &amp; Vijayalakshmi 🌸
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Write your wishes or blessings for the couple to display on the live wall..."
                    value={blessingText}
                    onChange={(e) => setBlessingText(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-pink-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 text-xs font-sans text-rosewood outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 active:scale-98 text-white font-sans text-xs font-bold uppercase tracking-wider shadow-lg transition-all cursor-pointer mt-1"
                >
                  Confirm RSVP &amp; Send Blessings 🪔
                </button>
              </form>
            ) : (
              /* Success confirmation state */
              <div className="flex flex-col items-center text-center py-6 gap-3 anim-fade">
                <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 text-3xl shadow-inner animate-bounce">
                  🌸
                </div>
                <h3 className="font-serif text-2xl font-bold text-rosewood">
                  நன்றி! Thank You, {name}!
                </h3>
                <p className="font-sans text-xs text-rosewood-light max-w-xs leading-relaxed">
                  Your presence and blessings mean the world to Arulraj, Vijayalakshmi, and our families. We look forward to welcoming you at the mandapam!
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-pink-200 text-rose-700 text-[10px] font-bold uppercase tracking-wider">
                  <span>✨</span>
                  <span>Blessing Recorded on Live Wall</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
