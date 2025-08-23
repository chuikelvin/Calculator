// Current Kenyan tax rates and deductions based on https://www.aren.co.ke/payroll/taxrates.htm

// PAYE Tax Bands (Monthly)
const PAYE_TAX_BANDS = [
  { min: 0, max: 24000, rate: 0.1 },
  { min: 24000, max: 32333, rate: 0.25 },
  { min: 32333, max: 500000, rate: 0.3 },
  { min: 500000, max: 800000, rate: 0.325 },
  { min: 800000, max: Number.POSITIVE_INFINITY, rate: 0.35 },
]

// NHIF Rates (Monthly) - Based on gross pay
const NHIF_RATES = [
  { min: 0, max: 5999, amount: 150 },
  { min: 6000, max: 7999, amount: 300 },
  { min: 8000, max: 11999, amount: 400 },
  { min: 12000, max: 14999, amount: 500 },
  { min: 15000, max: 19999, amount: 600 },
  { min: 20000, max: 24999, amount: 750 },
  { min: 25000, max: 29999, amount: 850 },
  { min: 30000, max: 34999, amount: 900 },
  { min: 35000, max: 39999, amount: 950 },
  { min: 40000, max: 44999, amount: 1000 },
  { min: 45000, max: 49999, amount: 1100 },
  { min: 50000, max: 59999, amount: 1200 },
  { min: 60000, max: 69999, amount: 1300 },
  { min: 70000, max: 79999, amount: 1400 },
  { min: 80000, max: 89999, amount: 1500 },
  { min: 90000, max: 99999, amount: 1600 },
  { min: 100000, max: Number.POSITIVE_INFINITY, amount: 1700 },
]

// Constants
const PERSONAL_RELIEF = 2400 // Monthly personal relief (28,800 annually)
const NSSF_TIER_I_CEILING = 8000 // Tier I ceiling
const NSSF_TIER_II_CEILING = 72000 // Tier II ceiling
const NSSF_RATE = 0.06 // 6% of gross pay
const HOUSING_LEVY_RATE = 0.015 // 1.5% Housing Levy on gross pay
const SHIF_RATE = 0.0275 // 2.75% Social Health Insurance Fund

// Calculate NHIF deduction based on gross salary
export function calculateNHIF(grossSalary: number): number {
  return grossSalary * SHIF_RATE
}

// Calculate NSSF deduction based on gross salary
export function calculateNSSF(grossSalary: number): number {
  // Tier I contribution (mandatory)
  const tierIContribution = Math.min(grossSalary, NSSF_TIER_I_CEILING) * NSSF_RATE

  // Tier II contribution (on income above Tier I ceiling, up to Tier II ceiling)
  let tierIIContribution = 0
  if (grossSalary > NSSF_TIER_I_CEILING) {
    const tierIIContributableAmount = Math.min(
      grossSalary - NSSF_TIER_I_CEILING,
      NSSF_TIER_II_CEILING - NSSF_TIER_I_CEILING,
    )
    tierIIContribution = tierIIContributableAmount * NSSF_RATE
  }

  return tierIContribution + tierIIContribution
}

// Calculate Housing Levy
export function calculateHousingLevy(grossSalary: number): number {
  return grossSalary * HOUSING_LEVY_RATE
}

// Calculate PAYE before relief
export function calculatePAYE(taxableIncome: number): number {
  let tax = 0
  let remainingIncome = taxableIncome

  for (const band of PAYE_TAX_BANDS) {
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

// Calculate net salary from gross
export function calculateNetSalary(grossSalary: number) {
  // Calculate deductions
  const nssfDeduction = calculateNSSF(grossSalary)
  const nhifDeduction = calculateNHIF(grossSalary)
  const housingLevy = calculateHousingLevy(grossSalary)

  // Calculate taxable income (gross minus all statutory deductions)
  const taxableIncome = grossSalary - nssfDeduction - nhifDeduction - housingLevy

  // Calculate PAYE
  const payeBeforeRelief = calculatePAYE(taxableIncome)
  const payeAfterRelief = Math.max(0, payeBeforeRelief - PERSONAL_RELIEF)

  // Calculate net salary
  const netSalary = grossSalary - nssfDeduction - nhifDeduction - housingLevy - payeAfterRelief

  return {
    grossSalary,
    nssfDeduction,
    nhifDeduction,
    housingLevy,
    taxableIncome,
    payeBeforeRelief,
    personalRelief: PERSONAL_RELIEF,
    payeAfterRelief,
    netSalary,
  }
}

// Calculate gross salary from net (using iterative approach)
export function calculateGrossSalary(targetNetSalary: number) {
  let lowGross = targetNetSalary
  let highGross = targetNetSalary * 2.5 // Start with a reasonable upper bound
  let midGross = 0
  let resultNet = 0
  let iterations = 0
  const MAX_ITERATIONS = 30
  const TOLERANCE = 1 // KES tolerance

  // Binary search to find the gross salary
  while (iterations < MAX_ITERATIONS) {
    midGross = (lowGross + highGross) / 2
    const result = calculateNetSalary(midGross)
    resultNet = result.netSalary

    if (Math.abs(resultNet - targetNetSalary) < TOLERANCE) {
      // We found a close enough match
      return {
        netSalary: targetNetSalary,
        grossSalary: midGross,
        nssfDeduction: result.nssfDeduction,
        nhifDeduction: result.nhifDeduction,
        housingLevy: result.housingLevy,
        payeBeforeRelief: result.payeBeforeRelief,
        personalRelief: result.personalRelief,
        payeAfterRelief: result.payeAfterRelief,
      }
    }

    if (resultNet < targetNetSalary) {
      lowGross = midGross
    } else {
      highGross = midGross
    }

    iterations++
  }

  // Return the best approximation after max iterations
  const finalResult = calculateNetSalary(midGross)
  return {
    netSalary: targetNetSalary,
    grossSalary: midGross,
    nssfDeduction: finalResult.nssfDeduction,
    nhifDeduction: finalResult.nhifDeduction,
    housingLevy: finalResult.housingLevy,
    payeBeforeRelief: finalResult.payeBeforeRelief,
    personalRelief: finalResult.personalRelief,
    payeAfterRelief: finalResult.payeAfterRelief,
  }
}
