"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { calculateNetSalary } from "@/lib/tax-calculations"
import { formatCurrency } from "@/lib/utils"

export function GrossToNetCalculator() {
  const [grossSalary, setGrossSalary] = useState<number>(0)
  const [results, setResults] = useState<any>(null)

  useEffect(() => {
    if (grossSalary > 0) {
      const calculationResults = calculateNetSalary(grossSalary)
      setResults(calculationResults)
    } else {
      setResults(null)
    }
  }, [grossSalary])

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="grossSalary" className="text-gray-700">
            Gross Monthly Salary (KES)
          </Label>
          <Input
            id="grossSalary"
            type="number"
            placeholder="Enter your gross monthly salary"
            value={grossSalary || ""}
            onChange={(e) => setGrossSalary(Number(e.target.value))}
            className="skillmind-input h-12 rounded-lg"
          />
        </div>
      </div>

      {results && (
        <div className="mt-6 space-y-4 p-5 rounded-lg bg-gray-50 border border-gray-100">
          <h3 className="text-lg font-semibold text-primary-700">Calculation Results</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="font-medium text-gray-700">Gross Salary:</div>
            <div className="text-right font-semibold">{formatCurrency(results.grossSalary)}</div>

            <div className="font-medium text-gray-700">NSSF Contribution:</div>
            <div className="text-right text-red-600">- {formatCurrency(results.nssfDeduction)}</div>

            <div className="font-medium text-gray-700">NHIF Contribution:</div>
            <div className="text-right text-red-600">- {formatCurrency(results.nhifDeduction)}</div>

            <div className="font-medium text-gray-700">Housing Levy (1.5%):</div>
            <div className="text-right text-red-600">- {formatCurrency(results.housingLevy)}</div>

            <div className="font-medium text-gray-700">Taxable Income:</div>
            <div className="text-right font-semibold">{formatCurrency(results.taxableIncome)}</div>

            <div className="font-medium text-gray-700">PAYE (Before Relief):</div>
            <div className="text-right text-red-600">{formatCurrency(results.payeBeforeRelief)}</div>

            <div className="font-medium text-gray-700">Personal Relief:</div>
            <div className="text-right text-green-600">+ {formatCurrency(results.personalRelief)}</div>

            <div className="font-medium text-gray-700">PAYE (After Relief):</div>
            <div className="text-right text-red-600">- {formatCurrency(results.payeAfterRelief)}</div>

            <div className="col-span-2 border-t my-2 border-gray-200"></div>

            <div className="font-bold text-primary-800 text-base">Net Salary:</div>
            <div className="text-right font-bold text-primary-800 text-base">{formatCurrency(results.netSalary)}</div>
          </div>
        </div>
      )}
    </div>
  )
}
