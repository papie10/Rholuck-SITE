// Video customer feedback — add real entries here closer to launch.
//
// To go live with a video: paste the YouTube video ID (the part after
// "v=" in the URL, e.g. https://youtube.com/watch?v=XXXXXXXXXXX -> "XXXXXXXXXXX")
// into `youtubeId` below. Upload as "Unlisted" on YouTube if you don't want
// it publicly searchable — unlisted videos still embed and play fine here.
// Entries without a youtubeId automatically render as a "Coming Soon" card.

export type VideoTestimonial = {
  name: string
  role: string
  company: string
  quote: string
  youtubeId?: string
}

export const videoTestimonials: VideoTestimonial[] = [
  {
    name: "Client Testimonial",
    role: "Facility / HSE Manager",
    company: "Manufacturing Sector",
    quote: "Their expertise in health, safety and environmental matters is unparalleled.",
  },
  {
    name: "Client Testimonial",
    role: "Operations Manager",
    company: "Oil & Gas Sector",
    quote: "Attention to detail and in-depth HSE knowledge invaluable to our risk management.",
  },
  {
    name: "Client Testimonial",
    role: "Site Manager",
    company: "Construction Sector",
    quote: "A consultancy we trust to get compliance right, every time.",
  },
]
