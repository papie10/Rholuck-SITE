import { useState } from "react"
import { Play, Clock, Quote } from "lucide-react"
import { videoTestimonials } from "../data/videoTestimonials"
import Tilt3D from "./Tilt3D"
import Reveal3D from "./Reveal3D"

export default function VideoTestimonials() {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)

  return (
    <section id="feedback" className="bg-navy-950 text-white py-24">
      <div className="mx-auto max-w-7xl 2xl:max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <Reveal3D>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-400 mb-4">
            Customer Feedback
          </p>
          <h2 className="font-display text-4xl md:text-5xl 2xl:text-6xl uppercase leading-tight mb-4">
            Hear it from
            <br />
            the people we work with
          </h2>
          <p className="text-steel-200 text-lg max-w-2xl mb-12">
            Short video feedback from the teams we've delivered training, audits and
            fire safety installations for.
          </p>
        </Reveal3D>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoTestimonials.map((v, i) => (
            <Reveal3D key={v.name + i} delay={i * 0.08}>
              <Tilt3D intensity={8}>
                <div className="bg-navy-900/60 border border-white/10 overflow-hidden h-full flex flex-col">
                  <div className="relative aspect-video bg-navy-950">
                    {v.youtubeId ? (
                      playingIndex === i ? (
                        <iframe
                          className="absolute inset-0 w-full h-full"
                          src={`https://www.youtube.com/embed/${v.youtubeId}?autoplay=1`}
                          title={`${v.name} video testimonial`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() => setPlayingIndex(i)}
                          className="group absolute inset-0 w-full h-full"
                          aria-label={`Play ${v.name} video testimonial`}
                        >
                          <img
                            src={`https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                          />
                          <span className="absolute inset-0 bg-navy-950/30 group-hover:bg-navy-950/10 transition-colors" />
                          <span className="absolute inset-0 flex items-center justify-center">
                            <span className="h-14 w-14 rounded-full bg-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Play size={22} className="text-navy-950 ml-0.5" fill="currentColor" />
                            </span>
                          </span>
                        </button>
                      )
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
                        <Clock size={22} className="text-steel-500" />
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-steel-500">
                          Video coming soon
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <Quote size={18} className="text-amber-500 mb-3" aria-hidden="true" />
                    <p className="text-steel-200 text-sm leading-relaxed mb-4 flex-1">"{v.quote}"</p>
                    <div>
                      <p className="font-display text-sm text-white">{v.role}</p>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-steel-400 mt-0.5">
                        {v.company}
                      </p>
                    </div>
                  </div>
                </div>
              </Tilt3D>
            </Reveal3D>
          ))}
        </div>
      </div>
    </section>
  )
}
