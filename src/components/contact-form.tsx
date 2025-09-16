"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface FormData {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  serviceArea: string;
  numberOfRooms: number;
  estimatedLinens: number;
  message: string;
}

interface FormErrors {
  fullName?: string;
  businessName?: string;
  email?: string;
  phone?: string;
  serviceArea?: string;
  numberOfRooms?: string;
  estimatedLinens?: string;
}

const serviceAreas = [
  "Cape Town CBD",
  "Sea Point",
  "Green Point",
  "Camps Bay",
  "Bantry Bay",
  "Clifton",
  "Fresnaye",
  "Mouille Point",
  "V&A Waterfront",
  "De Waterkant",
];

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    serviceArea: "",
    numberOfRooms: 0,
    estimatedLinens: 0,
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.serviceArea) {
      newErrors.serviceArea = "Service area is required";
    }

    if (!formData.numberOfRooms || formData.numberOfRooms < 1) {
      newErrors.numberOfRooms = "Number of rooms must be at least 1";
    }

    if (!formData.estimatedLinens || formData.estimatedLinens < 1) {
      newErrors.estimatedLinens = "Estimated linens must be at least 1";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form');
      }

      setIsSubmitted(true);
      toast.success("Quote request submitted successfully!");
      console.log("Form submitted:", formData);
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to submit form");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      businessName: "",
      email: "",
      phone: "",
      serviceArea: "",
      numberOfRooms: 0,
      estimatedLinens: 0,
      message: "",
    });
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-4xl mx-auto rounded-2xl border border-gray-200 shadow-lg">
        <CardContent className="p-12 text-center">
          <div className="flex flex-col items-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-900">Thank You!</h3>
              <p className="text-gray-600 max-w-md">
                Your quote request has been submitted successfully. We'll get back to you within 24 hours with your custom quote.
              </p>
            </div>
            <Button onClick={resetForm} variant="outline" className="mt-4">
              Submit Another Request
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto rounded-2xl border border-gray-200 shadow-lg">
      <CardHeader className="text-center pb-8">
        <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
          Get Your Custom Quote
        </CardTitle>
        <CardDescription className="text-lg text-gray-600">
          Fill out the form below and we'll get back to you within 24 hours
        </CardDescription>
      </CardHeader>
      
      <CardContent className="px-8 pb-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className={`rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
                    errors.fullName ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                  }`}
                  placeholder="Enter your full name"
                  aria-describedby={errors.fullName ? "fullName-error" : undefined}
                />
                {errors.fullName && (
                  <p id="fullName-error" className="text-sm text-red-600" role="alert">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessName" className="text-sm font-medium text-gray-700">
                  Business Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="businessName"
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange("businessName", e.target.value)}
                  className={`rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
                    errors.businessName ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                  }`}
                  placeholder="Enter your business name"
                  aria-describedby={errors.businessName ? "businessName-error" : undefined}
                />
                {errors.businessName && (
                  <p id="businessName-error" className="text-sm text-red-600" role="alert">
                    {errors.businessName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
                    errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                  }`}
                  placeholder="Enter your email address"
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-sm text-red-600" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={`rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
                    errors.phone ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                  }`}
                  placeholder="Enter your phone number"
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
                {errors.phone && (
                  <p id="phone-error" className="text-sm text-red-600" role="alert">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Service Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="serviceArea" className="text-sm font-medium text-gray-700">
                  Service Area <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.serviceArea}
                  onValueChange={(value) => handleInputChange("serviceArea", value)}
                >
                  <SelectTrigger
                    className={`rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
                      errors.serviceArea ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="Select your service area" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceAreas.map((area) => (
                      <SelectItem key={area} value={area}>
                        {area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.serviceArea && (
                  <p className="text-sm text-red-600" role="alert">
                    {errors.serviceArea}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="numberOfRooms" className="text-sm font-medium text-gray-700">
                  Number of Rooms <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="numberOfRooms"
                  type="number"
                  min="1"
                  value={formData.numberOfRooms || ""}
                  onChange={(e) => handleInputChange("numberOfRooms", parseInt(e.target.value) || 0)}
                  className={`rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
                    errors.numberOfRooms ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                  }`}
                  placeholder="Enter number of rooms"
                  aria-describedby={errors.numberOfRooms ? "numberOfRooms-error" : undefined}
                />
                {errors.numberOfRooms && (
                  <p id="numberOfRooms-error" className="text-sm text-red-600" role="alert">
                    {errors.numberOfRooms}
                  </p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="estimatedLinens" className="text-sm font-medium text-gray-700">
                  Estimated Linens per Week <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="estimatedLinens"
                  type="number"
                  min="1"
                  value={formData.estimatedLinens || ""}
                  onChange={(e) => handleInputChange("estimatedLinens", parseInt(e.target.value) || 0)}
                  className={`rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
                    errors.estimatedLinens ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                  }`}
                  placeholder="Enter estimated number of linen items"
                  aria-describedby={`estimatedLinens-help${errors.estimatedLinens ? " estimatedLinens-error" : ""}`}
                />
                <p id="estimatedLinens-help" className="text-sm text-gray-500">
                  Approximate number of linen items (sheets, towels, tablecloths, etc.)
                </p>
                {errors.estimatedLinens && (
                  <p id="estimatedLinens-error" className="text-sm text-red-600" role="alert">
                    {errors.estimatedLinens}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Additional Information
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                Message/Special Requirements
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[120px]"
                placeholder="Tell us about any special requirements, questions, or additional information..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Get My Custom Quote"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}