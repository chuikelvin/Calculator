"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GrossToNetCalculator } from "@/components/gross-to-net-calculator"
import { NetToGrossCalculator } from "@/components/net-to-gross-calculator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export function PayeCalculator() {
  const [activeTab, setActiveTab] = useState("gross-to-net")

  return (
    <Card className="skillmind-card border-0 overflow-hidden rounded-xl max-w-3xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-primary-600 to-primary-500 text-white">
        <CardTitle className="text-2xl">PAYE Calculator</CardTitle>
        <CardDescription className="text-primary-100">
          Calculate your salary after tax (net) or before tax (gross) based on the current Kenyan tax rates.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <Alert variant="default" className="bg-blue-50 border-blue-100 text-primary-800">
          <InfoIcon className="h-4 w-4 text-primary-500" />
          <AlertDescription>
            This calculator includes all statutory deductions: PAYE, NHIF, NSSF, and the 1.5% Housing Levy. PAYE is
            calculated after deducting all statutory deductions from gross salary.
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
          </TabsList>
          <TabsContent value="gross-to-net">
            <GrossToNetCalculator />
          </TabsContent>
          <TabsContent value="net-to-gross">
            <NetToGrossCalculator />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
