"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { calculateGrossSalary } from "@/lib/tax-calculations"
import { formatCurrency } from "@/lib/utils"

export function NetToGrossCalculator() {
  const [netSalary, setNetSalary] = useState<number>(0)
  const [results, setResults] = useState<any>(null)

  useEffect(() => {
    if (netSalary > 0) {
      const calculationResults = calculateGrossSalary(netSalary)
      setResults(calculationResults)
    } else {
      setResults(null)
    }
  }, [netSalary])

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="netSalary" className="text-gray-700">
            Net Monthly Salary (KES)
          </Label>
          <Input
            id="netSalary"
            type="number"
            placeholder="Enter your desired net monthly salary"
            value={netSalary || ""}
            onChange={(e) => setNetSalary(Number(e.target.value))}
            className="skillmind-input h-12 rounded-lg"
          />
        </div>
      </div>

      {results && (
        <div className="mt-6 space-y-4 p-5 rounded-lg bg-gray-50 border border-gray-100">
          <h3 className="text-lg font-semibold text-primary-700">Calculation Results</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="font-medium text-gray-700">Net Salary:</div>
            <div className="text-right font-semibold">{formatCurrency(results.netSalary)}</div>

            <div className="font-medium text-gray-700">PAYE (After Relief):</div>
            <div className="text-right text-red-600">+ {formatCurrency(results.payeAfterRelief)}</div>

            <div className="font-medium text-gray-700">Personal Relief:</div>
            <div className="text-right text-green-600">- {formatCurrency(results.personalRelief)}</div>

            <div className="font-medium text-gray-700">PAYE (Before Relief):</div>
            <div className="text-right text-red-600">+ {formatCurrency(results.payeBeforeRelief)}</div>

            <div className="font-medium text-gray-700">Housing Levy (1.5%):</div>
            <div className="text-right text-red-600">+ {formatCurrency(results.housingLevy)}</div>

            <div className="font-medium text-gray-700">NHIF Contribution:</div>
            <div className="text-right text-red-600">+ {formatCurrency(results.nhifDeduction)}</div>

            <div className="font-medium text-gray-700">NSSF Contribution:</div>
            <div className="text-right text-red-600">+ {formatCurrency(results.nssfDeduction)}</div>

            <div className="col-span-2 border-t my-2 border-gray-200"></div>

            <div className="font-bold text-primary-800 text-base">Gross Salary:</div>
            <div className="text-right font-bold text-primary-800 text-base">{formatCurrency(results.grossSalary)}</div>
          </div>
        </div>
      )}
    </div>
  )
}
