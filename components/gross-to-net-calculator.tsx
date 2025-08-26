"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateNetSalary } from "@/lib/tax-calculations";
import { formatCurrency } from "@/lib/utils";

interface GrossToNetCalculatorProps {
  selectedCountry: string;
}

export function GrossToNetCalculator({
  selectedCountry,
}: GrossToNetCalculatorProps) {
  const [grossSalary, setGrossSalary] = useState<number>(0);
  const [displayValue, setDisplayValue] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  // Helper function to get currency abbreviation
  const getCurrencyAbbr = () => {
    switch (selectedCountry) {
      case "kenya":
        return "KSh";
      case "uganda":
        return "UGX";
      case "tanzania":
        return "TZS";
      default:
        return "KSh";
    }
  };

  useEffect(() => {
    if (grossSalary > 0) {
      const calculationResults = calculateNetSalary(
        grossSalary,
        selectedCountry
      );
      setResults(calculationResults);
    } else {
      setResults(null);
    }
  }, [grossSalary, selectedCountry]);

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
      setGrossSalary(0);
    } else {
      const number = parseInt(numericValue, 10);
      setGrossSalary(number);
      setDisplayValue(formatNumberWithCommas(inputValue));
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="grossSalary" className="text-gray-700">
            Gross Monthly Salary ({getCurrencyAbbr()})
          </Label>
          <Input
            id="grossSalary"
            type="text"
            inputMode="numeric"
            placeholder={`Enter your gross monthly salary in ${getCurrencyAbbr()}`}
            value={displayValue}
            onChange={handleInputChange}
            className="skillmind-input h-12 rounded-lg"
          />
        </div>
      </div>

      {results && (
        <div className="mt-6 space-y-4 p-5 rounded-lg bg-gray-50 border border-gray-100">
          <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full opacity-10">
            <img
              src="skillmind-software.png"
              alt="SkillMind Software"
              className="w-30 h-30 object-contain"
            />
          </div>
          <div className="relative z-10 w-full h-full space-y-4">
            <h3 className="text-lg font-semibold text-primary-700">
              Calculation Results
            </h3>
            <table className="w-full text-sm table-fixed">
              <tbody>
                <tr>
                  <td className="font-medium text-gray-700 py-1 w-3/4">
                    Gross Salary:
                  </td>
                  <td className="text-left font-semibold tabular-nums whitespace-nowrap w-1/4">
                    {formatCurrency(results.grossSalary, selectedCountry)}
                  </td>
                </tr>

                {/* Dynamic deductions based on country */}
                {results.nssfDeduction > 0 && (
                  <tr>
                    <td className="font-medium text-gray-700 py-1 w-3/4">
                      NSSF Contribution:
                    </td>
                    <td className="text-left text-red-600 tabular-nums whitespace-nowrap w-1/4">
                      {formatCurrency(results.nssfDeduction, selectedCountry)}
                    </td>
                  </tr>
                )}

                {results.nhifDeduction > 0 && (
                  <tr>
                    <td className="font-medium text-gray-700 py-1 w-3/4">
                      NHIF Contribution:
                    </td>
                    <td className="text-left text-red-600 tabular-nums whitespace-nowrap w-1/4">
                      {formatCurrency(results.nhifDeduction, selectedCountry)}
                    </td>
                  </tr>
                )}

                {results.shifDeduction > 0 && (
                  <tr>
                    <td className="font-medium text-gray-700 py-1 w-3/4">
                      SHIF Contribution:
                    </td>
                    <td className="text-left text-red-600 tabular-nums whitespace-nowrap w-1/4">
                      {formatCurrency(results.shifDeduction, selectedCountry)}
                    </td>
                  </tr>
                )}

                {results.housingLevy > 0 && (
                  <tr>
                    <td className="font-medium text-gray-700 py-1 w-3/4">
                      Housing Levy (1.5%):
                    </td>
                    <td className="text-left text-red-600 tabular-nums whitespace-nowrap w-1/4">
                      {formatCurrency(results.housingLevy, selectedCountry)}
                    </td>
                  </tr>
                )}

                {results.sdl > 0 && (
                  <tr>
                    <td className="font-medium text-gray-700 py-1 w-3/4">
                      SDL (Skills Development Levy):
                    </td>
                    <td className="text-left text-red-600 tabular-nums whitespace-nowrap w-1/4">
                      {formatCurrency(results.sdl, selectedCountry)}
                    </td>
                  </tr>
                )}

                {results.wcf > 0 && (
                  <tr>
                    <td className="font-medium text-gray-700 py-1 w-3/4">
                      WCF (Workers Compensation Fund):
                    </td>
                    <td className="text-left text-red-600 tabular-nums whitespace-nowrap w-1/4">
                      {formatCurrency(results.wcf, selectedCountry)}
                    </td>
                  </tr>
                )}

                {results.pension > 0 && (
                  <tr>
                    <td className="font-medium text-gray-700 py-1 w-3/4">
                      Pension Contribution:
                    </td>
                    <td className="text-left text-red-600 tabular-nums whitespace-nowrap w-1/4">
                      {formatCurrency(results.pension, selectedCountry)}
                    </td>
                  </tr>
                )}

                {results.ssnit > 0 && (
                  <tr>
                    <td className="font-medium text-gray-700 py-1 w-3/4">
                      SSNIT Contribution:
                    </td>
                    <td className="text-left text-red-600 tabular-nums whitespace-nowrap w-1/4">
                      {formatCurrency(results.ssnit, selectedCountry)}
                    </td>
                  </tr>
                )}

                {results.uif > 0 && (
                  <tr>
                    <td className="font-medium text-gray-700 py-1 w-3/4">
                      UIF Contribution:
                    </td>
                    <td className="text-left text-red-600 tabular-nums whitespace-nowrap w-1/4">
                      {formatCurrency(results.uif, selectedCountry)}
                    </td>
                  </tr>
                )}

                <tr>
                  <td className="font-medium text-gray-700 py-1 w-3/4">
                    Taxable Income:
                  </td>
                  <td className="text-left font-semibold tabular-nums whitespace-nowrap w-1/4">
                    {formatCurrency(results.taxableIncome, selectedCountry)}
                  </td>
                </tr>

                <tr>
                  <td className="font-medium text-gray-700 py-1 w-3/4">
                    PAYE (Before Relief):
                  </td>
                  <td className="text-left text-red-600 tabular-nums whitespace-nowrap w-1/4">
                    {formatCurrency(results.payeBeforeRelief, selectedCountry)}
                  </td>
                </tr>

                {results.personalRelief > 0 && (
                  <tr>
                    <td className="font-medium text-gray-700 py-1 w-3/4">
                      Personal Relief:
                    </td>
                    <td className="text-left text-green-600 tabular-nums whitespace-nowrap w-1/4">
                      {formatCurrency(results.personalRelief, selectedCountry)}
                    </td>
                  </tr>
                )}

                <tr>
                  <td className="font-medium text-gray-700 py-1 w-3/4">
                    PAYE (After Relief):
                  </td>
                  <td className="text-left text-red-600 tabular-nums whitespace-nowrap w-1/4">
                    {formatCurrency(results.payeAfterRelief, selectedCountry)}
                  </td>
                </tr>

                <tr>
                  <td className="border-t border-gray-200 pt-2"></td>
                  <td className="border-t border-gray-200 pt-2"></td>
                </tr>

                <tr>
                  <td className="font-bold text-primary-800 text-base w-3/4">
                    Net Salary:
                  </td>
                  <td className="text-left font-bold text-primary-800 text-base tabular-nums whitespace-nowrap w-1/4">
                    {formatCurrency(results.netSalary, selectedCountry)}
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
