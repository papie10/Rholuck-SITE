import { createContext, useContext, useState, type ReactNode } from "react"

export type RequestType = "" | "environmental" | "training" | "fire-safety" | "laboratory" | "other"
export type DeliveryMode = "" | "online" | "in-person"

interface EnquiryState {
  requestType: RequestType
  course: string
  deliveryMode: DeliveryMode
  setEnquiry: (requestType: RequestType, course?: string, deliveryMode?: DeliveryMode) => void
}

const EnquiryContext = createContext<EnquiryState | null>(null)

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [requestType, setRequestType] = useState<RequestType>("")
  const [course, setCourse] = useState("")
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>("")

  const setEnquiry = (type: RequestType, courseTitle = "", mode: DeliveryMode = "") => {
    setRequestType(type)
    setCourse(courseTitle)
    setDeliveryMode(mode)
  }

  return (
    <EnquiryContext.Provider value={{ requestType, course, deliveryMode, setEnquiry }}>
      {children}
    </EnquiryContext.Provider>
  )
}

export function useEnquiry() {
  const ctx = useContext(EnquiryContext)
  if (!ctx) throw new Error("useEnquiry must be used within EnquiryProvider")
  return ctx
}
