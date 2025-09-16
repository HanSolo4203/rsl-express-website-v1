"use client";

import { LenisProvider } from "@/components/lenis-provider";
import Reveal from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";
import { ArrowRight, CheckCircle, Package, Truck, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function FractalDemoPage() {
  return (
    <LenisProvider>
      <main className="min-h-screen bg-white text-gray-900">
        {/* Hero (uses site home content) */}
        <section className="relative min-h-[100vh] bg-gradient-to-b from-background to-muted/20 flex items-center overflow-hidden -mt-16 pt-16">
          {/* Background video */}
          <video
            className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/videos/rsl_intro2.mp4" type="video/mp4" />
          </video>
          {/* Subtle overlay for contrast */}
          <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-white/20 via-white/10 to-white/30 dark:from-black/30 dark:via-black/20 dark:to-black/40" />
          <div className="relative z-[2] container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="flex justify-center -mt-8 sm:-mt-12 md:-mt-16">
                <Image
                  src="/logo.png?v=3"
                  alt="RSL Express logo"
                  width={800}
                  height={160}
                  priority
                  className="w-auto h-auto max-h-96 md:max-h-[28rem] lg:max-h-[32rem] opacity-95 drop-shadow-[0_1px_6px_rgba(0,0,0,0.25)]"
                />
              </div>
              {/* Tagline removed per request */}
              <p className="text-base sm:text-lg md:text-2xl text-white max-w-3xl mx-auto leading-relaxed">
                Commercial linen and RFID tracking technologies specialized for hospitality
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                <Button asChild size="lg" className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700">
                  <Link href="/contact">
                    {siteConfig.ctas.estimate}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Highlights (from home) */}
        <section className="py-24 sm:py-32 md:py-40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-[0.98] mb-4">Why Choose RSL Express?</h2>
                <div className="mx-auto h-1 w-16 rounded bg-blue-600/80" />
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">Professional linen services designed specifically for the hospitality industry</p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
              {siteConfig.highlights.map((highlight, index) => (
                <Reveal key={index} delay={index * 0.06}>
                  <Card className="rounded-2xl border border-gray-200 hover:border-blue-200 transition-colors shadow-sm hover:shadow-md">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                        Service Excellence
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-6 sm:pb-8">
                      <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">{highlight}</p>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Separator />

        {/* Service Overview */}
        <section className="relative overflow-hidden py-24 sm:py-32 md:py-40 bg-muted/30">
          {/* Background video for section */}
          <video
            className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/videos/particles2.mp4" type="video/mp4" />
          </video>
          {/* Overlay to ensure text contrast */}
          <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-white/20 via-white/10 to-white/30 dark:from-black/30 dark:via-black/20 dark:to-black/40" />
          <div className="relative z-[2] container mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="max-w-4xl mx-auto text-center mb-12">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-[0.98] mb-4">Comprehensive Linen Services</h2>
                <div className="mx-auto h-1 w-16 rounded bg-blue-600/80" />
                <p className="text-base sm:text-lg md:text-xl text-white leading-relaxed">
                  We specialize in hospitality-focused linen solutions with daily pickup and delivery. Our emergency service provides 4-hour notice turnaround when you need it most.
                </p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <Reveal>
                <Card className="rounded-2xl border border-gray-200 hover:border-blue-200 transition-colors shadow-sm hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="text-primary text-lg sm:text-xl">Bed Linens</CardTitle>
                    <CardDescription className="text-sm sm:text-base">Professional care for all bedding essentials</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-6 sm:pb-8">
                    <ul className="space-y-2">
                      {siteConfig.service.categories.bed.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm sm:text-base text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Reveal>

              <Reveal delay={0.06}>
                <Card className="rounded-2xl border border-gray-200 hover:border-blue-200 transition-colors shadow-sm hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="text-primary text-lg sm:text-xl">Bath Linens</CardTitle>
                    <CardDescription className="text-sm sm:text-base">Sanitized and fresh towels for your guests</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-6 sm:pb-8">
                    <ul className="space-y-2">
                      {siteConfig.service.categories.bath.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm sm:text-base text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Reveal>

              <Reveal delay={0.12}>
                <Card className="rounded-2xl border border-gray-200 hover:border-blue-200 transition-colors shadow-sm hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="text-primary text-lg sm:text-xl">Table Linens</CardTitle>
                    <CardDescription className="text-sm sm:text-base">Spotless tablecloths and napkins for dining</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-6 sm:pb-8">
                    <ul className="space-y-2">
                      {siteConfig.service.categories.table.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm sm:text-base text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Reveal>
            </div>
          </div>
        </section>

        <Separator />

        {/* Process Timeline */}
        <section className="py-24 sm:py-32 md:py-40 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-[0.98] mb-4">Our 24-Hour Process</h2>
                <div className="mx-auto h-1 w-16 rounded bg-blue-600/80" />
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground">From collection to delivery, we ensure quality every step of the way</p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {[
                { step: "1", title: "Collection", description: "11:00 AM daily pickup", icon: Truck },
                { step: "2", title: "Sorting & Pre-Treat", description: "Category separation and stain treatment", icon: Package },
                { step: "3", title: "Wash", description: "Commercial-grade cleaning", icon: Zap },
                { step: "4", title: "Dry & Finish", description: "Professional drying and pressing", icon: CheckCircle },
                { step: "5", title: "Quality Control & Package", description: "Inspection and protective wrapping", icon: Package },
                { step: "6", title: "Delivery", description: "11:00 AM next day delivery", icon: Truck },
              ].map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <Reveal key={index} delay={index * 0.05}>
                    <Card className="text-center rounded-2xl border border-gray-200 hover:border-blue-200 transition-colors shadow-sm hover:shadow-md">
                      <CardHeader>
                        <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 bg-blue-600/10 rounded-full flex items-center justify-center mb-4">
                          <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                        </div>
                        <CardTitle className="text-base sm:text-lg">Step {step.step}: {step.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm sm:text-base text-muted-foreground">{step.description}</p>
                      </CardContent>
                    </Card>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-24 sm:py-32 md:py-40 bg-gradient-to-b from-blue-600 to-blue-700 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="max-w-4xl mx-auto text-center space-y-8">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold">Ready to Switch?</h2>
                <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                  Join the hospitality businesses that trust RSL Express for their linen needs. Get started with a free estimate or trial service today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                  <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6 bg-white text-blue-700 hover:bg-blue-50">
                    <Link href="/contact">
                      {siteConfig.ctas.estimate}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </LenisProvider>
  );
}


