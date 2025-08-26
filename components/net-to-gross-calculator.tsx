"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateGrossSalary } from "@/lib/tax-calculations";
import { formatCurrency } from "@/lib/utils";

interface NetToGrossCalculatorProps {
  selectedCountry: string;
}

export function NetToGrossCalculator({
  selectedCountry,
}: NetToGrossCalculatorProps) {
  const [netSalary, setNetSalary] = useState<number>(0);
  const [displayValue, setDisplayValue] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    if (netSalary > 0) {
      const calculationResults = calculateGrossSalary(
        netSalary,
        selectedCountry
      );
      setResults(calculationResults);
    } else {
      setResults(null);
    }
  }, [netSalary, selectedCountry]);

  const formatNumberWithCommas = (value: string): string => {
    // Remove all non-digit characters
    const numericValue = value.replace(/\D/g, "");
    // Add commas every 3 digits from right
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, "");

    if (numericValue === "") {
      setDisplayValue("");
      setNetSalary(0);
    } else {
      const number = parseInt(numericValue, 10);
      setNetSalary(number);
      setDisplayValue(formatNumberWithCommas(inputValue));
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="netSalary" className="text-gray-700">
            Net Monthly Salary (
            {selectedCountry === "kenya"
              ? "KSh"
              : selectedCountry === "uganda"
              ? "UGX"
              : selectedCountry === "tanzania"
              ? "TZS"
              : "KSh"}
            )
          </Label>
          <Input
            id="netSalary"
            type="text"
            inputMode="numeric"
            placeholder={`Enter your desired net monthly salary in ${
              results?.currency || "KES"
            }`}
            value={displayValue}
            onChange={handleInputChange}
            className="skillmind-input h-12 rounded-lg"
          />
        </div>
      </div>

      {results && (
        <div className="mt-6 space-y-4 p-5 rounded-lg bg-gray-50 border border-gray-100 relative">
          <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full opacity-10">
            <img
              src="skillmind-software.png"
              alt="SkillMind Software"
              className="w-30 h-30 object-contain"
            />
          </div>
          <div className="relative z-10">
            <h3 className="text-lg font-semibold text-primary-700">
              Calculation Results
            </h3>
            <table className="w-full text-sm table-fixed">
              <tbody>
                <tr>
                  <td className="font-medium text-gray-700 py-1 w-3/4">
                    Net Salary:
                  </td>
                  <td className="text-left font-semibold tabular-nums whitespace-nowrap w-1/4">
                    {formatCurrency(results.netSalary)}
                  </td>
                </tr>

                <tr>
                  <td className="font-medium text-gray-700 py-1 w-3/4">
                    PAYE (After Relief):
                  </td>
                  <td className="text-left text-red-600 tabular-nums whitespace-nowrap w-1/4">
                    {formatCurrency(results.payeAfterRelief)}
                  </td>
                </tr>

                {results.personalRelief > 0 && (
                  <tr>
                    <td className="font-medium text-gray-700 py-1 w-3/4">
                      Personal Relief:
                    </td>
                    <td className="text-left text-green-600 tabular-nums whitespace-nowrap w-1/4">
                      {formatCurrency(results.personalRelief)}
                    </td>
                  </tr>
                )}

                <tr>
                  <td className="font-medium text-gray-700 py-1 w-3/4">
                    PAYE (Before Relief):
                  </td>
                  <td className="text-left text-red-600 tabular-nums whitespace-nowrap w-1/4">
                    {formatCurrency(results.payeBeforeRelief)}
                  </td>
                </tr>

                {/* Dynamic deductions based on country */}
                {results.housingLevy && (
                  <tr>
                    <td className="font-medium text-gray-700 py-1 w-3/4">
                      Housing Levy (1.5%):
                    </td>
                    <td className="text-left text-red-600 tabular-nums whitespace-nowrap w-1/4">
                      {formatCurrency(results.housingLevy)}
                    </td>
                  </tr>
                )}

                {results.nhifDeduction && (
                  <tr>
                    <td className="font-medium text-gray-700 py-1 w-3/4">
                      NHIF Contribution:
                    </td>
                    <td className="text-left text-red-600 tabular-nums whitespace-nowrap w-1/4">
                      {formatCurrency(results.nhifDeduction)}
                    </td>
                  </tr>
                )}

                {results.nssfDeduction && (
                  <tr>
                    <td className="font-medium text-gray-700 py-1 w-3/4">
                      NSSF Contribution:
                    </td>
                    <td className="text-left text-red-600 tabular-nums whitespace-nowrap w-1/4">
                      {formatCurrency(results.nssfDeduction)}
                    </td>
                  </tr>
                )}

                {results.sdl && (
                  <tr>
                    <td className="font-medium text-gray-700 py-1 w-3/4">
                      SDL (Skills Development Levy):
                    </td>
                    <td className="text-left text-red-600 tabular-nums whitespace-nowrap w-1/4">
                      {formatCurrency(results.sdl)}
                    </td>
                  </tr>
                )}

                {results.wcf && (
                  <tr>
                    <td className="font-medium text-gray-700 py-1 w-3/4">
                      WCF (Workers Compensation Fund):
                    </td>
                    <td className="text-left text-red-600 tabular-nums whitespace-nowrap w-1/4">
                      {formatCurrency(results.wcf)}
                    </td>
                  </tr>
                )}

                {results.pension && (
                  <tr>
                    <td className="font-medium text-gray-700 py-1 w-3/4">
                      Pension Contribution:
                    </td>
                    <td className="text-left text-red-600 tabular-nums whitespace-nowrap w-1/4">
                      {formatCurrency(results.pension)}
                    </td>
                  </tr>
                )}

                {results.ssnit && (
                  <tr>
                    <td className="font-medium text-gray-700 py-1 w-3/4">
                      SSNIT Contribution:
                    </td>
                    <td className="text-left text-red-600 tabular-nums whitespace-nowrap w-1/4">
                      {formatCurrency(results.ssnit)}
                    </td>
                  </tr>
                )}

                {results.uif && (
                  <tr>
                    <td className="font-medium text-gray-700 py-1 w-3/4">
                      UIF Contribution:
                    </td>
                    <td className="text-left text-red-600 tabular-nums whitespace-nowrap w-1/4">
                      {formatCurrency(results.uif)}
                    </td>
                  </tr>
                )}

                <tr>
                  <td className="border-t border-gray-200 pt-2"></td>
                  <td className="border-t border-gray-200 pt-2"></td>
                </tr>

                <tr>
                  <td className="font-bold text-primary-800 text-base w-3/4">
                    Gross Salary:
                  </td>
                  <td className="text-left font-bold text-primary-800 text-base tabular-nums whitespace-nowrap w-1/4">
                    {formatCurrency(results.grossSalary)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
