// Multi-country tax calculation system
// Supports different tax structures for various countries

// ===== KENYA TAX STRUCTURE =====
const KENYA_TAX_CONFIG = {
  name: "Kenya",
  currency: "KES",
  payeBands: [
    { min: 0, max: 24000, rate: 0.1 },
    { min: 24000, max: 32333, rate: 0.25 },
    { min: 32333, max: 500000, rate: 0.3 },
    { min: 500000, max: 800000, rate: 0.325 },
    { min: 800000, max: Number.POSITIVE_INFINITY, rate: 0.35 },
  ],


  personalRelief: 2400,
  nssfRate: 0.06,
  nssfTierICeiling: 8000,
  nssfTierIICeiling: 72000,
  housingLevyRate: 0.015,
  shifRate: 0.0275,
}

// ===== TANZANIA TAX STRUCTURE =====
const TANZANIA_TAX_CONFIG = {
  name: "Tanzania",
  currency: "TZS",
  payeBands: [
    { min: 0, max: 270000, rate: 0 },
    { min: 270001, max: 520000, rate: 0.08 },
    { min: 520001, max: 760000, rate: 0.20 },
    { min: 760001, max: 1000000, rate: 0.25 },
    { min: 1000001, max: Number.POSITIVE_INFINITY, rate: 0.30 },
  ],
  personalRelief: 0, // Tanzania doesn't have personal relief
  nssfRate: 0.10, // 10% of gross pay
  // sdlRate: 0.035, // 3.5% Skills Development Levy (employer only)
  sdlRate: 0.0, // 3.5% Skills Development Levy (employer only)
  // wcfRate: 0.005, // 0.5% Workers Compensation Fund (employer only)
  wcfRate: 0.00, // 0.5% Workers Compensation Fund (employer only)
}

// ===== UGANDA TAX STRUCTURE =====
const UGANDA_TAX_CONFIG = {
  name: "Uganda",
  currency: "UGX",
  payeBands: [
    { min: 0, max: 235000, rate: 0 },
    { min: 235001, max: 335000, rate: 0.10 },
    { min: 335001, max: 410000, rate: 0.20 },
    { min: 410001, max: 10000000, rate: 0.30 },
    { min: 10000001, max: Number.POSITIVE_INFINITY, rate: 0.40 },
  ],
  personalRelief: 0,
  nssfRate: 0.05, // 5% of gross pay
  // nhifRate: 0.01, // 1% of gross pay
  nhifRate: 0.0, // 1% of gross pay
}

// ===== RWANDA TAX STRUCTURE =====
const RWANDA_TAX_CONFIG = {
  name: "Rwanda",
  currency: "RWF",
  payeBands: [
    { min: 0, max: 30000, rate: 0 },
    { min: 30001, max: 100000, rate: 0.20 },
    { min: 100001, max: 200000, rate: 0.25 },
    { min: 200001, max: Number.POSITIVE_INFINITY, rate: 0.30 },
  ],
  personalRelief: 0,
  nssfRate: 0.05, // 5% of gross pay
  rssbRate: 0.07, // 7% Rwanda Social Security Board
}

// ===== ETHIOPIA TAX STRUCTURE =====
const ETHIOPIA_TAX_CONFIG = {
  name: "Ethiopia",
  currency: "ETB",
  payeBands: [
    { min: 0, max: 600, rate: 0 },
    { min: 601, max: 1650, rate: 0.10 },
    { min: 1651, max: 3200, rate: 0.15 },
    { min: 3201, max: 5250, rate: 0.20 },
    { min: 5251, max: 7800, rate: 0.25 },
    { min: 7801, max: 109000, rate: 0.30 },
    { min: 109001, max: Number.POSITIVE_INFINITY, rate: 0.35 },
  ],
  personalRelief: 0,
  pensionRate: 0.07, // 7% pension contribution
  nhifRate: 0.01, // 1% health insurance
}

// ===== GHANA TAX STRUCTURE =====
const GHANA_TAX_CONFIG = {
  name: "Ghana",
  currency: "GHS",
  payeBands: [
    { min: 0, max: 402, rate: 0 },
    { min: 403, max: 110, rate: 0.05 },
    { min: 111, max: 130, rate: 0.10 },
    { min: 131, max: 150, rate: 0.175 },
    { min: 151, max: 450, rate: 0.25 },
    { min: 451, max: Number.POSITIVE_INFINITY, rate: 0.30 },
  ],
  personalRelief: 0,
  ssnitRate: 0.055, // 5.5% Social Security
  nhilRate: 0.025, // 2.5% National Health Insurance
  getfundRate: 0.025, // 2.5% GETFund
}

// ===== NIGERIA TAX STRUCTURE =====
const NIGERIA_TAX_CONFIG = {
  name: "Nigeria",
  currency: "NGN",
  payeBands: [
    { min: 0, max: 300000, rate: 0.07 },
    { min: 300001, max: 600000, rate: 0.11 },
    { min: 600001, max: 1100000, rate: 0.15 },
    { min: 1100001, max: 1600000, rate: 0.19 },
    { min: 1600001, max: 3200000, rate: 0.21 },
    { min: 3200001, max: Number.POSITIVE_INFINITY, rate: 0.24 },
  ],
  personalRelief: 0,
  pensionRate: 0.08, // 8% pension contribution
  nhisRate: 0.015, // 1.5% National Health Insurance
}

// ===== SOUTH AFRICA TAX STRUCTURE =====
const SOUTH_AFRICA_TAX_CONFIG = {
  name: "South Africa",
  currency: "ZAR",
  payeBands: [
    { min: 0, max: 237100, rate: 0.18 },
    { min: 237101, max: 370500, rate: 0.26 },
    { min: 370501, max: 512800, rate: 0.31 },
    { min: 512801, max: 673000, rate: 0.36 },
    { min: 673001, max: 857900, rate: 0.39 },
    { min: 857901, max: 1817000, rate: 0.41 },
    { min: 1817001, max: Number.POSITIVE_INFINITY, rate: 0.45 },
  ],
  personalRelief: 0,
  uifRate: 0.01, // 1% Unemployment Insurance Fund
  sdlRate: 0.01, // 1% Skills Development Levy
}

// Country configuration mapping
const COUNTRY_CONFIGS = {
  kenya: KENYA_TAX_CONFIG,
  tanzania: TANZANIA_TAX_CONFIG,
  uganda: UGANDA_TAX_CONFIG,
  rwanda: RWANDA_TAX_CONFIG,
  ethiopia: ETHIOPIA_TAX_CONFIG,
  ghana: GHANA_TAX_CONFIG,
  nigeria: NIGERIA_TAX_CONFIG,
  "south-africa": SOUTH_AFRICA_TAX_CONFIG,
}

// Generic PAYE calculation function
function calculatePAYE(taxableIncome: number, payeBands: Array<{ min: number, max: number, rate: number }>): number {
  let tax = 0
  let remainingIncome = taxableIncome

  for (const band of payeBands) {
    if (remainingIncome > 0) {
      const taxableAmountInBand = Math.min(remainingIncome, band.max - band.min)
      tax += taxableAmountInBand * band.rate
      remainingIncome -= taxableAmountInBand
    } else {
      break
    }
  }

  return tax
}



// Generic NSSF calculation for Kenya
function calculateKenyaNSSF(grossSalary: number): number {
  const config = KENYA_TAX_CONFIG
  const tierIContribution = Math.min(grossSalary, config.nssfTierICeiling) * config.nssfRate
  let tierIIContribution = 0

  if (grossSalary > config.nssfTierICeiling) {
    const tierIIContributableAmount = Math.min(
      grossSalary - config.nssfTierICeiling,
      config.nssfTierIICeiling - config.nssfTierICeiling,
    )
    tierIIContribution = tierIIContributableAmount * config.nssfRate
  }

  return tierIContribution + tierIIContribution
}

// Main calculation function that handles all countries
export function calculateNetSalary(grossSalary: number, country: string = "kenya") {
  const config = COUNTRY_CONFIGS[country as keyof typeof COUNTRY_CONFIGS]

  if (!config) {
    throw new Error(`Unsupported country: ${country}`)
  }

  let deductions: any = {}
  let taxableIncome = grossSalary

  // Calculate country-specific deductions
  switch (country) {
    case "kenya":
      deductions.nssfDeduction = calculateKenyaNSSF(grossSalary)
      deductions.shifDeduction = grossSalary * config.shifRate
      deductions.housingLevy = grossSalary * config.housingLevyRate
      taxableIncome -= deductions.nssfDeduction + deductions.shifDeduction + deductions.housingLevy
      break

    case "tanzania":
      deductions.nssfDeduction = grossSalary * config.nssfRate
      deductions.sdl = grossSalary * config.sdlRate
      deductions.wcf = grossSalary * config.wcfRate
      taxableIncome -= deductions.nssfDeduction
      break

    case "uganda":
      deductions.nssfDeduction = grossSalary * config.nssfRate
      deductions.nhifDeduction = grossSalary * config.nhifRate
      taxableIncome -= deductions.nssfDeduction + deductions.nhifDeduction
      break

    case "rwanda":
      deductions.nssfDeduction = grossSalary * config.nssfRate
      deductions.rssb = grossSalary * config.rssbRate
      taxableIncome -= deductions.nssfDeduction + deductions.rssb
      break

    case "ethiopia":
      deductions.pension = grossSalary * config.pensionRate
      deductions.nhifDeduction = grossSalary * config.nhifRate
      taxableIncome -= deductions.pension + deductions.nhifDeduction
      break

    case "ghana":
      deductions.ssnit = grossSalary * config.ssnitRate
      deductions.nhil = grossSalary * config.nhilRate
      deductions.getfund = grossSalary * config.getfundRate
      taxableIncome -= deductions.ssnit + deductions.nhil + deductions.getfund
      break

    case "nigeria":
      deductions.pension = grossSalary * config.pensionRate
      deductions.nhis = grossSalary * config.nhisRate
      taxableIncome -= deductions.pension + deductions.nhis
      break

    case "south-africa":
      deductions.uif = grossSalary * config.uifRate
      deductions.sdl = grossSalary * config.sdlRate
      taxableIncome -= deductions.uif + deductions.sdl
      break

    default:
      throw new Error(`Unsupported country: ${country}`)
  }

  // Calculate PAYE
  const payeBeforeRelief = calculatePAYE(taxableIncome, config.payeBands)
  const payeAfterRelief = Math.max(0, payeBeforeRelief - (config.personalRelief || 0))

  // Calculate net salary
  const netSalary = grossSalary - Object.values(deductions).reduce((sum: number, val: any) => sum + val, 0) - payeAfterRelief

  return {
    grossSalary,
    ...deductions,
    taxableIncome,
    payeBeforeRelief,
    personalRelief: config.personalRelief || 0,
    payeAfterRelief,
    netSalary,
    country: config.name,
    currency: config.currency,
  }
}

// Calculate gross salary from net (using iterative approach)
export function calculateGrossSalary(targetNetSalary: number, country: string = "kenya") {
  let lowGross = targetNetSalary
  let highGross = targetNetSalary * 2.5
  let midGross = 0
  let resultNet = 0
  let iterations = 0
  const MAX_ITERATIONS = 30
  const TOLERANCE = 1

  while (iterations < MAX_ITERATIONS) {
    midGross = (lowGross + highGross) / 2
    const result = calculateNetSalary(midGross, country)
    resultNet = result.netSalary

    if (Math.abs(resultNet - targetNetSalary) < TOLERANCE) {
      return {
        netSalary: targetNetSalary,
        ...result,
      }
    }

    if (resultNet < targetNetSalary) {
      lowGross = midGross
    } else {
      highGross = midGross
    }

    iterations++
  }

  const finalResult = calculateNetSalary(midGross, country)
  return {
    netSalary: targetNetSalary,
    ...finalResult,
  }
}

// Get available countries
export function getAvailableCountries() {
  return Object.keys(COUNTRY_CONFIGS).map(key => ({
    code: key,
    name: COUNTRY_CONFIGS[key as keyof typeof COUNTRY_CONFIGS].name,
    currency: COUNTRY_CONFIGS[key as keyof typeof COUNTRY_CONFIGS].currency,
  }))
}

// Get country configuration
export function getCountryConfig(country: string) {
  return COUNTRY_CONFIGS[country as keyof typeof COUNTRY_CONFIGS]
}
