export default function CoupleSection() {
  return (
    <section className="flex flex-col rounded-2xl bg-white/80 border border-pink-200/75 backdrop-blur-md p-5 shadow-[0_8px_30px_rgba(244,114,182,0.12)] relative overflow-hidden anim-fade-2">
      <div className="absolute -top-10 -right-10 w-28 h-28 bg-pink-100/60 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center gap-2 pb-4 border-b border-pink-100">
        <span
          className="material-symbols-outlined text-rose-500 text-xl heartbeat-icon"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >favorite</span>
        <h2 className="font-serif text-xl text-rosewood font-semibold tracking-wide">The Couple</h2>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2.5">
        {/* Groom */}
        <PersonCard
          name="Arulraj"
          role="The Groom"
          roleClass="bg-rose-50 border-rose-200 text-[#831843]"
          profession="Software Engineer, Cognizant, Chennai"
          parents="Proud Son of Mr. Arumugasamy & Mrs. Aruna"
        />
        {/* Bride */}
        <PersonCard
          name="Vijayalakshmi"
          role="The Bride"
          roleClass="bg-pink-50 border-pink-300 text-rose-600"
          profession="Engineer, Conserve Consultants, Chennai"
          parents="Beloved Daughter of Mr. Ramakrishnan & Mrs. Maheshwari"
        />
      </div>
    </section>
  )
}

function PersonCard({ name, role, roleClass, profession, parents }) {
  return (
    <div className="p-3 sm:p-4 rounded-xl bg-white/90 border border-pink-200/60 shadow-[0_2px_12px_rgba(225,29,72,0.04)] flex flex-col justify-between">
      <div className="flex flex-col gap-1 mb-1.5">
        <div className="flex items-start justify-between gap-1 flex-wrap">
          <span className="font-serif text-lg text-rosewood font-semibold tracking-tight">{name}</span>
          <span className={`px-2 py-0.5 rounded-full border font-sans text-[10px] uppercase font-bold tracking-wider ${roleClass}`}>{role}</span>
        </div>
        <p className="font-sans text-xs font-medium text-rosewood-light leading-snug">{profession}</p>
      </div>
      <div>
        <div className="h-px w-full bg-gradient-to-r from-pink-200 via-rose-100 to-transparent my-2" />
        <p className="font-sans text-[11px] text-rosewood-light/90 flex items-start gap-1">
          <span className="material-symbols-outlined text-rose-500 text-sm mt-0.5">family_restroom</span>
          <span>{parents}</span>
        </p>
      </div>
    </div>
  )
}
