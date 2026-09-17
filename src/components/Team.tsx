import oderhohwoLucky from "../assets/leadership/oderhohwo-lucky.jpg"
import rosemaryOderhohwo from "../assets/leadership/rosemary-oderhohwo.jpg"
import Tilt3D from "./Tilt3D"
import Reveal3D from "./Reveal3D"

const team = [
  {
    name: "Lucky Oderhohwo",
    suffix: "Ph.D.",
    role: "Chairman, Rholuck Group",
    photo: oderhohwoLucky,
    bio: "An Environmental and Sustainability Professional with over 28 years of practice in environmental consultancy, HSE management and sustainability advisory across oil & gas, manufacturing, infrastructure, telecoms, power and financial services. Holds a Ph.D. in Environmental Technology & Management from Universidad Azteca, Mexico, an M.Sc. in Environmental Management and a B.Sc. in Industrial Chemistry. A Governing Board Member of the Institute of Safety Professionals of Nigeria (ISPON), Fellow of the World Safety Organization and the Nigerian Environmental Society, and a Certified Lead Auditor in ISO 14001, ISO 9001, ISO 22000 and ISO 45001 management systems.",
  },
  {
    name: "Mrs. Rosemary Lucky O.",
    suffix: "",
    role: "Executive Director, HR, Finance & Admin",
    photo: rosemaryOderhohwo,
    bio: "Holds a Master's in Business Administration and brings over ten years of professional experience in administration and human resources management, with a wider portfolio in business management.",
  },
]

export default function Team() {
  return (
    <section className="bg-navy-950 text-white py-24">
      <div className="mx-auto max-w-7xl 2xl:max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-400 mb-4">Management Team</p>
        <h2 className="font-display text-4xl md:text-5xl 2xl:text-6xl uppercase leading-tight mb-14">
          The people behind
          <br />
          every engagement
        </h2>

        <div className="grid md:grid-cols-2 gap-10 max-w-4xl">
          {team.map((t, i) => (
            <Reveal3D key={t.name} delay={i * 0.1} axis="y">
            <div className="flex flex-col">
              <Tilt3D intensity={12} className="self-start">
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-amber-500 mb-6">
                  <img src={t.photo} alt={t.name} className="w-full h-full object-cover object-top" />
                </div>
              </Tilt3D>
              <h3 className="font-display text-xl uppercase">
                {t.name}
                {t.suffix && <>, <span className="normal-case">{t.suffix}</span></>}
              </h3>
              <p className="font-mono text-xs uppercase tracking-widest text-amber-400 mt-1 mb-4">
                {t.role}
              </p>
              <p className="text-steel-200 text-sm leading-relaxed">{t.bio}</p>
            </div>
            </Reveal3D>
          ))}
        </div>
      </div>
    </section>
  )
}
