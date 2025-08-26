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
        } else if (timezone.includes("Africa/Kigali")) {
          setSelectedCountry("rwanda");
        } else if (timezone.includes("Africa/Addis_Ababa")) {
          setSelectedCountry("ethiopia");
        } else if (timezone.includes("Africa/Accra")) {
          setSelectedCountry("ghana");
        } else if (timezone.includes("Africa/Lagos")) {
          setSelectedCountry("nigeria");
        } else if (timezone.includes("Africa/Johannesburg")) {
          setSelectedCountry("south-africa");
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
        <div className="flex items-center justify-end gap-2 text-xs text-gray-400">
          <span>Country:</span>
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="h-6 w-24 border-gray-200 bg-transparent text-gray-400 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kenya">🇰🇪 Kenya</SelectItem>
              <SelectItem value="uganda">🇺🇬 Uganda</SelectItem>
              <SelectItem value="tanzania">🇹🇿 Tanzania</SelectItem>
              <SelectItem value="rwanda">🇷🇼 Rwanda</SelectItem>
              <SelectItem value="ethiopia">🇪🇹 Ethiopia</SelectItem>
              <SelectItem value="ghana">🇬🇭 Ghana</SelectItem>
              <SelectItem value="nigeria">🇳🇬 Nigeria</SelectItem>
              <SelectItem value="south-africa">🇿🇦 South Africa</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Alert
          variant="default"
          className="bg-blue-50 border-blue-100 text-primary-800"
        >
          <InfoIcon className="h-4 w-4 text-primary-500" />
          <AlertDescription>
            This calculator includes all statutory deductions: PAYE, NHIF, NSSF,
            and the 1.5% Housing Levy. PAYE is calculated after deducting all
            statutory deductions from gross salary.
          </AlertDescription>
        </Alert>

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
