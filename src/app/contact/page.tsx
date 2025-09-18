import { Metadata } from "next"
import { LenisProvider } from "@/components/lenis-provider"
import Reveal from "@/components/reveal"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import Image from "next/image"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ContactForm from "@/components/contact-form"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Get an Estimate | RSL Express",
  description: "Weekly linen volume input + instant rough quote from our 2025 price list.",
  keywords: ["estimate", "quote", "linen service", "pricing", "RSL Express"],
}

export default function ContactPage() {
  return (
    <LenisProvider>
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Reveal>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">Get an Estimate</h1>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="text-xl text-muted-foreground leading-relaxed">Weekly linen volume input + instant rough quote from our 2025 price list.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Contact Form */}
            <div>
              <ContactForm />
            </div>

            {/* Right Column - Contact Information */}
            <div>
              {/* Contact Card */}
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>
                    Get in touch with our team
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Address</p>
                      <p className="text-sm text-muted-foreground">
                        {siteConfig.address}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Phone</p>
                      <a 
                        href={`tel:${siteConfig.phone}`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {siteConfig.phone}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <a 
                        href={`mailto:${siteConfig.email}`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {siteConfig.email}
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Hours</p>
                      <p className="text-sm text-muted-foreground">
                        {siteConfig.hours}
                      </p>
                    </div>
                  </div>

                  {/* RSL Express Logo */}
                  <div className="flex justify-center pt-4">
                    <Image
                      src="/logo.png?v=3"
                      alt="RSL Express logo"
                      width={250}
                      height={50}
                      className="w-auto h-auto max-w-full opacity-90"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
    </LenisProvider>
  )
}
