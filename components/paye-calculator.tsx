"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GrossToNetCalculator } from "@/components/gross-to-net-calculator";
import { NetToGrossCalculator } from "@/components/net-to-gross-calculator";
import { EnquiryForm } from "@/components/enquiry-form";
import { BackgroundWatermark } from "@/components/background-watermark";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

export function PayeCalculator() {
  const [activeTab, setActiveTab] = useState("gross-to-net");
  const [selectedCountry, setSelectedCountry] = useState<string>("kenya");

  // Detect user's country based on timezone
  useEffect(() => {
    const detectCountry = () => {
      try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (timezone.includes("Africa/Nairobi") || timezone.includes("EAT")) {
          setSelectedCountry("kenya");
        } else if (timezone.includes("Africa/Kampala")) {
          setSelectedCountry("uganda");
        } else if (timezone.includes("Africa/Dar_es_Salaam")) {
          setSelectedCountry("tanzania");
        } else {
          // Fallback to Kenya if detection fails or other countries
          setSelectedCountry("kenya");
        }
      } catch (error) {
        // Fallback to Kenya if detection fails
        setSelectedCountry("kenya");
      }
    };

    detectCountry();
  }, []);

  return (
    <Card className="skillmind-card border-0 overflow-hidden rounded-xl max-w-3xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-primary-600 to-primary-500 text-white">
        <CardTitle className="text-2xl">PAYE Calculator</CardTitle>
        <CardDescription className="text-primary-100">
          Calculate your salary after tax (net) or before tax (gross) based on
          the current Kenyan tax rates.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Global Country Selection */}
        <div className="flex items-center justify-end gap-2 text-sm text-gray-600">
          <span>Country:</span>
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="h-8 w-32 border-gray-200 bg-white text-gray-700 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kenya">🇰🇪 Kenya</SelectItem>
              <SelectItem value="uganda">🇺🇬 Uganda</SelectItem>
              <SelectItem value="tanzania">🇹🇿 Tanzania</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tax Calculation Method - Commented Out
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-3">Tax Calculation Method</h4>
          <p className="text-gray-700 mb-3">This calculator follows the correct Kenyan tax calculation method:</p>
          <ol className="list-decimal list-inside text-gray-700 space-y-1 mb-4">
            <li>Calculate statutory deductions (NSSF, NHIF, Housing Levy) from gross salary</li>
            <li>Calculate taxable income by subtracting all statutory deductions from gross salary</li>
            <li>Apply progressive tax rates to the taxable income to get PAYE before relief</li>
            <li>Apply personal relief to get PAYE after relief</li>
            <li>Calculate net salary by subtracting all deductions from gross salary</li>
          </ol>
          
          <h4 className="font-semibold text-gray-800 mb-3">Tax Rates Information</h4>
          <p className="text-gray-700 mb-3">This calculator uses the following statutory deductions:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>PAYE: Progressive tax rates (10%, 25%, 30%, 32.5%, 35%)</li>
            <li>NHIF: 2.75% of gross pay (Social Health Insurance Fund)</li>
            <li>NSSF: 6% of gross pay (Tier I up to KES 6,000, Tier II up to KES 18,000)</li>
            <li>Housing Levy: 1.5% of gross pay</li>
            <li>Personal Relief: KES 2,400 per month</li>
          </ul>
        </div>
        */}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="skillmind-tabs-list w-full mb-6">
            <TabsTrigger value="gross-to-net" className="skillmind-tab flex-1">
              Gross to Net
            </TabsTrigger>
            <TabsTrigger value="net-to-gross" className="skillmind-tab flex-1">
              Net to Gross
            </TabsTrigger>
            <TabsTrigger value="enquiry" className="skillmind-tab flex-1">
              Enquiry
            </TabsTrigger>
          </TabsList>
          <TabsContent value="gross-to-net">
            <BackgroundWatermark>
              <GrossToNetCalculator selectedCountry={selectedCountry} />
            </BackgroundWatermark>
          </TabsContent>
          <TabsContent value="net-to-gross">
            <BackgroundWatermark>
              <NetToGrossCalculator selectedCountry={selectedCountry} />
            </BackgroundWatermark>
          </TabsContent>
          <TabsContent value="enquiry">
            <EnquiryForm />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
