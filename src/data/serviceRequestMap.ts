import type { RequestType } from "../context/EnquiryContext"

// Maps each services-section card title to a request-type option in the contact form
export const serviceRequestMap: Record<string, RequestType> = {
  "Environmental Consultancy": "environmental",
  "HSE Training & Capacity Building": "training",
  "Chemical Laboratory Services": "laboratory",
  "Fire & Life Safety Systems": "fire-safety",
  "HAZOP & Risk Studies": "environmental",
  "Forklift, Crane & Rigging Operations": "training",
}
