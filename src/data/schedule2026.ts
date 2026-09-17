// 2026 scheduled dates per course, in the same order as `courses` in content.ts
export type ScheduleEntry = { month: string; dates: string }

export const schedule2026: ScheduleEntry[][] = [
  [{ month: "JAN", dates: "8-9th" }, { month: "FEB", dates: "2nd-3rd" }, { month: "MAY", dates: "1st-2nd" }, { month: "AUG", dates: "3rd-4th" }, { month: "OCT", dates: "1st-2nd" }], // Building an Effective Health, Safety & Environment Managemen
  [{ month: "MAR", dates: "2nd-3rd" }, { month: "APR", dates: "1-2nd" }, { month: "JUL", dates: "1-2nd" }, { month: "SEP", dates: "2-3rd" }, { month: "NOV", dates: "4-5th" }], // Scaffolding Safety Course
  [{ month: "JAN", dates: "9-10th" }, { month: "FEB", dates: "5-6th" }, { month: "JUN", dates: "3rd-4th" }], // Industrial Fire Fighting Course
  [{ month: "MAR", dates: "4-5th" }, { month: "MAY", dates: "6-7th" }, { month: "JUL", dates: "3-4th" }], // Managing Occupational Health & Safety Mgt. for Senior Manage
  [{ month: "FEB", dates: "7th" }, { month: "JUN", dates: "5th" }, { month: "OCT", dates: "3rd" }, { month: "DEC", dates: "2nd" }], // Basic Fire Prevention & Fire Fighting Course
  [{ month: "FEB", dates: "9th" }, { month: "MAR", dates: "6th" }, { month: "MAY", dates: "4th" }, { month: "JUL", dates: "6th" }, { month: "AUG", dates: "5th" }], // Forklift Safety Course for Operators (Refresher)
  [{ month: "JAN", dates: "RUNS THROUGHOUT THE YEAR" }, { month: "FEB", dates: "RUNS THROUGHOUT THE YEAR" }, { month: "MAR", dates: "RUNS THROUGHOUT THE YEAR" }, { month: "APR", dates: "RUNS THROUGHOUT THE YEAR" }, { month: "MAY", dates: "RUNS THROUGHOUT THE YEAR" }, { month: "JUN", dates: "RUNS THROUGHOUT THE YEAR" }, { month: "JUL", dates: "RUNS THROUGHOUT THE YEAR" }, { month: "AUG", dates: "RUNS THROUGHOUT THE YEAR" }, { month: "SEP", dates: "RUNS THROUGHOUT THE YEAR" }, { month: "OCT", dates: "RUNS THROUGHOUT THE YEAR" }, { month: "NOV", dates: "RUNS THROUGHOUT THE YEAR" }, { month: "DEC", dates: "RUNS THROUGHOUT THE YEAR" }], // Forklift Safety Course for Beginners
  [{ month: "APR", dates: "8th" }, { month: "JUL", dates: "8th" }, { month: "AUG", dates: "6th" }, { month: "SEP", dates: "4th" }, { month: "OCT", dates: "5th" }, { month: "DEC", dates: "3rd" }], // Crane Safety Course for Operators (Refresher)
  [{ month: "JAN", dates: "RUNS THROUGHOUT THE YEAR" }, { month: "FEB", dates: "RUNS THROUGHOUT THE YEAR" }, { month: "MAR", dates: "RUNS THROUGHOUT THE YEAR" }, { month: "APR", dates: "RUNS THROUGHOUT THE YEAR" }, { month: "MAY", dates: "RUNS THROUGHOUT THE YEAR" }, { month: "JUN", dates: "RUNS THROUGHOUT THE YEAR" }, { month: "JUL", dates: "RUNS THROUGHOUT THE YEAR" }, { month: "AUG", dates: "RUNS THROUGHOUT THE YEAR" }, { month: "SEP", dates: "RUNS THROUGHOUT THE YEAR" }, { month: "OCT", dates: "RUNS THROUGHOUT THE YEAR" }, { month: "NOV", dates: "RUNS THROUGHOUT THE YEAR" }, { month: "DEC", dates: "RUNS THROUGHOUT THE YEAR" }], // Crane Safety Course for Beginners
  [{ month: "FEB", dates: "13-14th" }, { month: "MAY", dates: "8-9th" }, { month: "JUL", dates: "9-10th" }, { month: "SEP", dates: "4th-5th" }], // Basic First Aid Training
  [{ month: "MAY", dates: "8th-9th" }], // Behavioural Based Safety (BBS)Course
  [{ month: "APR", dates: "9th" }, { month: "NOV", dates: "7th" }], // Electrical Safety Course
  [{ month: "MAR", dates: "7th" }, { month: "JUL", dates: "11th" }, { month: "AUG", dates: "7th" }, { month: "SEP", dates: "9th" }], // Working at a Height Safety Course
  [{ month: "FEB", dates: "16th" }, { month: "APR", dates: "10th" }, { month: "SEP", dates: "10th" }], // 5-S Principles of Housekeeping Practice
  [{ month: "JUN", dates: "6th" }, { month: "DEC", dates: "4th" }], // Managing Stress in the Workplace
  [{ month: "JAN", dates: "15-16th" }, { month: "APR", dates: "10th-11th" }, { month: "OCT", dates: "7-8th" }], // Defensive Driving /Logistics/ Fleet Mgt Safety Course
  [{ month: "MAY", dates: "13th" }, { month: "SEP", dates: "11th" }, { month: "NOV", dates: "9th" }], // Emergency Response and Preparedness
  [{ month: "FEB", dates: "19th" }, { month: "MAR", dates: "9th" }, { month: "AUG", dates: "7-8th" }], // Food Safety and Personal Hygiene Course
  [{ month: "APR", dates: "15-16th" }, { month: "JUL", dates: "10th-11th" }, { month: "SEP", dates: "11th-12th" }, { month: "OCT", dates: "8-9th" }], // HSE Risk Assessment, Analysis & Hazard communication (HAZCOM
  [{ month: "JAN", dates: "16th-17th" }, { month: "MAY", dates: "14th" }], // Managing Occupational Health, Security, Safety & Environment
  [{ month: "AUG", dates: "10th" }, { month: "NOV", dates: "11th" }], // Introduction to Quality Management System (QMS)
  [{ month: "MAR", dates: "11-12th" }, { month: "JUN", dates: "8th" }], // Fundamentals of Process Safety Management (PSM)
  [{ month: "APR", dates: "17th" }], // Hand and Power Tools Safety Course
  [{ month: "MAY", dates: "15th" }, { month: "AUG", dates: "6th" }, { month: "OCT", dates: "10th" }], // Managing Ergonomics/Repititive Strain Injuries in the workpl
  [{ month: "FEB", dates: "21st" }, { month: "JUN", dates: "10th" }, { month: "NOV", dates: "16th" }], // Permit to work (PTW) System Course
  [{ month: "APR", dates: "18th" }, { month: "JUL", dates: "13th" }, { month: "SEP", dates: "16th" }], // Lock Out & Tag out (LOTO) safety procedure as a means of acc
  [{ month: "MAR", dates: "13-14th" }, { month: "JUN", dates: "11-12th" }, { month: "SEP", dates: "16-17th" }], // Rigging Safety Course
  [{ month: "FEB", dates: "23rd" }, { month: "JUL", dates: "15th" }, { month: "NOV", dates: "18th" }], // Accident, Prevention, Reporting & Investigation
  [{ month: "AUG", dates: "12th" }], // Confined Space Entry Safety Course
  [{ month: "APR", dates: "22-23rd" }, { month: "NOV", dates: "19-20th" }], // Construction Safety Course
  [{ month: "JUL", dates: "16-17th" }], // Hydrogen Sulphide (H2S) Safety Course
  [{ month: "MAY", dates: "15th-16th" }, { month: "OCT", dates: "9th-10th" }, { month: "DEC", dates: "9-10th" }], // Loss Prevention & Process Safety Mgt Course
  [{ month: "JAN", dates: "22-23rd" }, { month: "APR", dates: "23-25th" }], // Hazards & Operability Studies Course
  [{ month: "JUN", dates: "12th-13th" }, { month: "JUL", dates: "17th-18th" }, { month: "SEP", dates: "18-19th" }, { month: "NOV", dates: "20th-21st" }], // Environmental Impact Assessment (EIA) Course
  [{ month: "MAR", dates: "18-19th" }, { month: "MAY", dates: "20-21st" }, { month: "DEC", dates: "11-12th" }], // Introduction to Environmental & Waste Management System (EMS
  [{ month: "MAR", dates: "20th" }, { month: "JUN", dates: "22nd" }, { month: "OCT", dates: "14th" }], // Spill Prevention & Countercontrol Measures (SPCC) as a means
  [{ month: "JAN", dates: "24th" }, { month: "APR", dates: "27th" }, { month: "JUN", dates: "24-25th" }, { month: "AUG", dates: "13-14th" }], // Chemical & Laboratory Safety Course
  [{ month: "FEB", dates: "14th" }, { month: "MAR", dates: "21st" }, { month: "JUL", dates: "22nd" }, { month: "SEP", dates: "21st" }], // Abrasive Wheels Safety Course
  [{ month: "APR", dates: "29-30th" }, { month: "AUG", dates: "14th-15th" }, { month: "OCT", dates: "14-15th" }], // Radio Frequency (RF) Radiation Safety Course for Telecoms In
  [{ month: "FEB", dates: "20-21st" }, { month: "JUL", dates: "23-24th" }, { month: "NOV", dates: "25-26th" }], // Boiler Safety Course
  [{ month: "APR", dates: "22-23rd" }, { month: "SEP", dates: "23-24th" }, { month: "DEC", dates: "16-17th" }], // Risk Assessment & Business Impact Analysis
  [{ month: "JAN", dates: "19th-20th" }, { month: "MAR", dates: "20th-21st" }, { month: "AUG", dates: "19th" }], // Building and effective Safety Management System in the Hospi
  [{ month: "APR", dates: "29th" }, { month: "JUN", dates: "26th" }, { month: "AUG", dates: "20th" }, { month: "SEP", dates: "25th" }, { month: "NOV", dates: "27th" }], // Aviation Fuelling Safety Course
  [{ month: "MAR", dates: "25th" }], // Security & Crime Prevention & Mgt Course
  [{ month: "JAN", dates: "29-30th" }, { month: "FEB", dates: "23rd-24th" }, { month: "JUL", dates: "29-30th" }, { month: "OCT", dates: "16-17th" }], // Tower Climbing Safety Course
  [{ month: "MAR", dates: "27-28th" }, { month: "JUN", dates: "26-27th" }, { month: "SEP", dates: "26th" }], // Total Preventive Maintenance (TPM) Course
  [{ month: "MAR", dates: "25-28th" }, { month: "JUN", dates: "24th-27th" }, { month: "AUG", dates: "19th-22nd" }, { month: "SEP", dates: "23rd-26th" }], // Professional skills for HR, office admin Mgrs & Administrato
  [{ month: "FEB", dates: "27-28th" }, { month: "MAY", dates: "22nd" }, { month: "SEP", dates: "2-3rd" }], // Improving Managerial Effectiveness
  [{ month: "MAR", dates: "4-5th" }, { month: "JUN", dates: "11-12th" }], // Quality Improvement, Measurement, & Process Capability Cours
  [], // Improving Technical Supervisory Skills In Technical Operatio
]