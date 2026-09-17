import fmenv from "../assets/accreditations/fmenv.jpg"
import nesrea from "../assets/accreditations/nesrea.jpg"
import abiaAsepa from "../assets/accreditations/abia-asepa.jpg"
import anambraMoe from "../assets/accreditations/anambra-moe.jpg"
import bayelsaMoe from "../assets/accreditations/bayelsa-moe.jpg"
import deltaDelsepaWaste from "../assets/accreditations/delta-delsepa-waste.jpg"
import deltaDelsepaAccreditation from "../assets/accreditations/delta-delsepa-accreditation.jpg"
import deltaMoe from "../assets/accreditations/delta-moe.jpg"
import enuguMoecc from "../assets/accreditations/enugu-moecc.jpg"
import imoMevns from "../assets/accreditations/imo-mevns.jpg"
import lasepa from "../assets/accreditations/lasepa.jpg"
import riversMoe from "../assets/accreditations/rivers-moe.jpg"
import ogunOgepa from "../assets/accreditations/ogun-ogepa.jpg"
import ogunMoeRenewal from "../assets/accreditations/ogun-moe-renewal.jpg"

export type Accreditation = {
  code: string
  name: string
  jurisdiction: string
  certNo?: string
  expiry?: string
  image: string
  extraDocs?: { label: string; image: string }[]
}

export const accreditations: Accreditation[] = [
  {
    code: "FMEnv",
    name: "Federal Ministry of Environment",
    jurisdiction: "Federal",
    certNo: "0005943",
    expiry: "29 Dec 2026",
    image: fmenv,
  },
  {
    code: "NESREA",
    name: "National Environmental Standards and Regulations Enforcement Agency",
    jurisdiction: "Federal",
    certNo: "LCS251010100246",
    expiry: "10 Oct 2026",
    image: nesrea,
  },
  {
    code: "LASEPA",
    name: "Lagos State Environmental Protection Agency",
    jurisdiction: "Lagos State",
    certNo: "221735438488",
    expiry: "31 Dec 2026",
    image: lasepa,
  },
  {
    code: "OGEPA",
    name: "Ogun State Environmental Protection Agency",
    jurisdiction: "Ogun State",
    certNo: "006",
    expiry: "31 Dec 2026",
    image: ogunOgepa,
    extraDocs: [{ label: "Ministry of Environment renewal letter", image: ogunMoeRenewal }],
  },
  {
    code: "DELSEPA",
    name: "Delta State Environmental Protection Agency",
    jurisdiction: "Delta State",
    certNo: "00123",
    expiry: "31 Dec 2026",
    image: deltaDelsepaAccreditation,
    extraDocs: [
      { label: "Waste Discharge Certificate", image: deltaDelsepaWaste },
      { label: "Ministry of Environment accreditation letter", image: deltaMoe },
    ],
  },
  {
    code: "RISEPA",
    name: "Rivers State Ministry of Environment",
    jurisdiction: "Rivers State",
    certNo: "B/ES/12/098",
    expiry: "31 Dec 2026",
    image: riversMoe,
  },
  {
    code: "ASEPA",
    name: "Abia State Environmental Protection Agency",
    jurisdiction: "Abia State",
    expiry: "31 Dec 2026",
    image: abiaAsepa,
  },
  {
    code: "ANAMBRA",
    name: "Anambra State Ministry of Environment",
    jurisdiction: "Anambra State",
    certNo: "MOENV/AN/PRS/26/03/03",
    expiry: "31 Dec 2026",
    image: anambraMoe,
  },
  {
    code: "BAYELSA",
    name: "Bayelsa State Ministry of Environment",
    jurisdiction: "Bayelsa State",
    certNo: "BYS/ENV.C/176",
    expiry: "10 Sep 2027",
    image: bayelsaMoe,
  },
  {
    code: "ENUGU",
    name: "Enugu State Ministry of Environment & Climate Change",
    jurisdiction: "Enugu State",
    certNo: "ENS/MOECC/COMM/vol.II/169",
    image: enuguMoecc,
  },
  {
    code: "IMO",
    name: "Imo State Ministry of Environment and Sanitation",
    jurisdiction: "Imo State",
    certNo: "MEVNS/ESR/EIAA/VOL.1/26/003",
    image: imoMevns,
  },
]

// Professional memberships / additional recognitions without a scanned certificate on file
export const memberships = ["NOSDRA", "ITF", "NIPEX", "NUPRC", "CMD", "OGTAN"]
