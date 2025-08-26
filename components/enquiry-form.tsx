"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Mail,
  Phone,
  User,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export function EnquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      // Here you would typically send the data to your backend API
      // For now, we'll simulate the API call
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", mobile: "", email: "" });
      } else {
        throw new Error("Failed to submit enquiry");
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage("Failed to submit enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValidForm =
    formData.name.trim() && formData.mobile.trim() && formData.email.trim();

  return (
    <Card className="skillmind-card border-0 overflow-hidden rounded-xl max-w-md mx-auto">
      <CardHeader className="bg-gradient-to-r from-primary-600 to-primary-500 text-white">
        <CardTitle className="text-xl flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Enquiry Form
        </CardTitle>
        <CardDescription className="text-primary-100">
          Get in touch with us for any questions or support
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {submitStatus === "success" && (
          <Alert className="bg-green-50 border-green-200 text-green-800">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription>
              Thank you! Your enquiry has been submitted successfully. We'll get
              back to you soon.
            </AlertDescription>
          </Alert>
        )}

        {submitStatus === "error" && (
          <Alert className="bg-red-50 border-red-200 text-red-800">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-gray-700 flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              Full Name *
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="skillmind-input h-12 rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="mobile"
              className="text-gray-700 flex items-center gap-2"
            >
              <Phone className="h-4 w-4" />
              Mobile Number *
            </Label>
            <Input
              id="mobile"
              name="mobile"
              type="tel"
              placeholder="Enter your mobile number"
              value={formData.mobile}
              onChange={handleInputChange}
              required
              className="skillmind-input h-12 rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-gray-700 flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              Email Address *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="skillmind-input h-12 rounded-lg"
            />
          </div>

          <Button
            type="submit"
            disabled={!isValidForm || isSubmitting}
            className="w-full h-12 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Submit Enquiry
              </>
            )}
          </Button>
        </form>

        <div className="text-xs text-gray-500 text-center">
          By submitting this form, you agree to our privacy policy and consent
          to being contacted regarding your enquiry.
        </div>
      </CardContent>
    </Card>
  );
}
