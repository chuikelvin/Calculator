import { PayeCalculator } from "@/components/paye-calculator";
import { BackgroundWatermark } from "@/components/background-watermark";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-100 pt-2">
        <div className="container max-w-6xl mx-auto px-4 flex justify-center md:justify-start items-center">
          <div className="flex items-center gap-2">
            <div className="relative" style={{ width: "80px", height: "80px" }}>
              {/* <div className="absolute inset-0 bg-primary-500 transform rotate-45"></div>
              <div className="absolute inset-0 bg-primary-300 transform rotate-45 scale-75"></div> */}
              <img
                src="skillmind-software.png"
                alt="SkillMind Software Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-primary-800 font-semibold tracking-wider text-lg">
              SKILLMIND SOFTWARE
            </span>
          </div>
        </div>
      </header>

      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-primary-800">
            PAYE Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Calculate your net salary from gross or gross salary from net with
            our real-time PAYE calculator. Updated with the latest{" "}
            {new Date().getFullYear()} tax rates and statutory deductions.
          </p>
        </div>

        {/* Calculator with Background Watermark */}
        <BackgroundWatermark>
          <PayeCalculator />
        </BackgroundWatermark>

        {/* Disclaimer */}
        <div className="mt-8 text-center">
          <div className="inline-block p-4 bg-red-50 border border-red-200 rounded-lg max-w-2xl">
            <p className="text-red-700 text-sm font-medium mb-2">
              ⚠️ Disclaimer
            </p>
            <p className="text-red-600 text-xs leading-relaxed">
              This payroll calculator is for informational purposes only. We are
              not liable for any errors or decisions made based on these
              calculations.
            </p>
          </div>
        </div>

        <div className="mt-12 text-sm text-gray-600 p-6 rounded-lg bg-gray-50 border border-gray-100">
          <h2 className="font-semibold text-primary-700 mb-3 text-lg">
            Tax Calculation Method
          </h2>
          <p className="mb-2">
            This calculator follows the correct Kenyan tax calculation method:
          </p>
          <ol className="list-decimal pl-5 mb-4 space-y-1">
            <li>
              Calculate statutory deductions (NSSF, NHIF, Housing Levy) from
              gross salary
            </li>
            <li>
              Calculate taxable income by subtracting all statutory deductions
              from gross salary
            </li>
            <li>
              Apply progressive tax rates to the taxable income to get PAYE
              before relief
            </li>
            <li>Apply personal relief to get PAYE after relief</li>
            <li>
              Calculate net salary by subtracting all deductions from gross
              salary
            </li>
          </ol>

          <h2 className="font-semibold text-primary-700 mb-3 text-lg">
            Tax Rates Information
          </h2>
          <p>This calculator uses the following statutory deductions:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>PAYE: Progressive tax rates (10%, 25%, 30%, 32.5%, 35%)</li>
            <li>NHIF: 2.75% of gross pay (Social Health Insurance Fund)</li>
            <li>
              NSSF: 6% of gross pay (Tier I up to KES 6,000, Tier II up to KES
              18,000)
            </li>
            <li>Housing Levy: 1.5% of gross pay</li>
            <li>Personal Relief: KES 2,400 per month</li>
          </ul>
          {/* <p className="mt-3">
            Data source:{" "}
            <a
              href="https://www.aren.co.ke/payroll/taxrates.htm"
              className="text-primary-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kenya Tax Rates
            </a>
          </p> */}
        </div>
      </div>

      <footer className="bg-gray-50 border-t border-gray-100 py-6 mt-12">
        <div className="container max-w-6xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} Skillmind Software. All rights
            reserved.
          </p>
          <p className="mt-1">
            The calculator is for informational purposes only and should not be
            considered as financial advice.
          </p>
        </div>
      </footer>
    </main>
  );
}
