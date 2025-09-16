import Link from "next/link"
import Image from "next/image"
import { LenisProvider } from "@/components/lenis-provider"
import Reveal from "@/components/reveal"
import { 
  Radio, 
  BarChart3, 
  MapPin, 
  RefreshCw, 
  Monitor, 
  AlertTriangle, 
  Calculator,
  CheckCircle,
  Calendar,
  Zap,
  Tag,
  Lightbulb
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { siteConfig } from "@/config/site"

export default function RFIDPage() {
  const benefits = [
    {
      icon: Radio,
      title: "Real-time Tracking",
      description: "Track every linen item in real-time throughout the entire process"
    },
    {
      icon: BarChart3,
      title: "Automated Inventory",
      description: "No more manual counting - automated inventory management system"
    },
    {
      icon: MapPin,
      title: "Location Identification",
      description: "Instantly identify where each item is located in your facility"
    },
    {
      icon: RefreshCw,
      title: "Lifecycle Reporting",
      description: "Track wash counts, rotations, and replacement needs automatically"
    },
    {
      icon: Monitor,
      title: "Dashboard Access",
      description: "Management dashboard for complete oversight and control"
    },
    {
      icon: AlertTriangle,
      title: "Loss Prevention",
      description: "Automated alerts for missing items and loss prevention"
    },
    {
      icon: Calculator,
      title: "Automated Billing",
      description: "Billing based on actual processed quantities, not estimates"
    }
  ]

  const timelineSteps = [
    {
      week: "Week 1",
      title: "Discovery & Planning",
      description: "Site survey, data model, and integration plan finalized",
      icon: Calendar,
    },
    {
      week: "Weeks 2–3",
      title: "Hardware Prep & Provisioning",
      description: "Tags, readers, gateways configured and staged",
      icon: Radio,
    },
    {
      week: "Weeks 3–5",
      title: "Install & Configure",
      description: "On-site install, network config, and system calibration",
      icon: Zap,
    },
    {
      week: "Weeks 5–6",
      title: "Training & Go‑Live",
      description: "Staff training, soft launch, performance checks",
      icon: CheckCircle,
    },
  ]

  return (
    <LenisProvider>
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[100svh] py-16 md:py-24 bg-gradient-to-b from-background to-muted/20 flex items-center">
        {/* Background video */}
        <video
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/videos/particles3.mp4" type="video/mp4" />
        </video>
        {/* Overlay for text contrast */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-white/20 via-white/10 to-white/30 dark:from-black/30 dark:via-black/20 dark:to-black/40" />
        <div className="relative z-[2] container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left space-y-6 -mt-14 md:-mt-20 lg:-mt-24">
                <div className="flex justify-center lg:justify-start mb-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                    <Radio className="h-10 w-10 text-white" />
                  </div>
                </div>
                <Reveal>
                  <h1 className="text-4xl md:text-5xl font-bold text-white">RFID Tracking System</h1>
                </Reveal>
                <Reveal delay={0.06}>
                  <p className="text-xl text-white leading-relaxed">Revolutionary technology to enhance our linen service with complete transparency and control</p>
                </Reveal>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-md">
                  <div className="group [perspective:1000px]">
                    <div className="relative aspect-square rounded-2xl border-2 border-primary/20 bg-white/70 transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                      {/* Front */}
                      <div className="absolute inset-0 flex items-center justify-center [backface-visibility:hidden]">
                        <div className="text-center space-y-4">
                          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                            <Radio className="h-12 w-12 text-blue-600" />
                          </div>
                          <div className="space-y-2">
                            <div className="w-16 h-2 bg-blue-300/60 rounded mx-auto"></div>
                            <div className="w-12 h-2 bg-blue-300/40 rounded mx-auto"></div>
                            <div className="w-8 h-2 bg-blue-300/30 rounded mx-auto"></div>
                          </div>
                          <p className="text-sm text-blue-600 font-medium">RFID Technology</p>
                        </div>
                      </div>
                      {/* Back */}
                      <div className="absolute inset-0 flex items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                        <div className="text-center px-6">
                          <Image src="/logo.png?v=3" alt="RSL Express" width={800} height={160} className="mx-auto h-auto w-auto max-h-20 md:max-h-24" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* How RFID Works (horizontal) */}
            <div className="mb-12">
              <Card className="hover:shadow-lg transition-shadow h-fit">
                <CardHeader>
                  <CardTitle className="text-primary text-center">How Linen RFID Tracking Works</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
                    {/* 1. Tag Attachment */}
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Tag className="h-8 w-8 text-primary" />
                      </div>
                      <p className="text-sm font-medium">Tag Attachment</p>
                      <p className="text-xs text-muted-foreground mt-1">Each linen item gets a durable RFID tag sewn or attached securely</p>
                    </div>
                    {/* 2. Automatic Scanning */}
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Radio className="h-8 w-8 text-primary" />
                      </div>
                      <p className="text-sm font-medium">Automatic Scanning</p>
                      <p className="text-xs text-muted-foreground mt-1">RFID readers automatically detect tagged linens as they move through facilities</p>
                    </div>
                    {/* 3. Real-Time Tracking */}
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <RefreshCw className="h-8 w-8 text-primary" />
                      </div>
                      <p className="text-sm font-medium">Real-Time Tracking</p>
                      <p className="text-xs text-muted-foreground mt-1">System tracks location, usage cycles, and wash history in real-time</p>
                    </div>
                    {/* 4. Data Collection */}
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <BarChart3 className="h-8 w-8 text-primary" />
                      </div>
                      <p className="text-sm font-medium">Data Collection</p>
                      <p className="text-xs text-muted-foreground mt-1">Analytics capture inventory levels, utilization rates, and lifecycle data</p>
                    </div>
                    {/* 5. Smart Insights */}
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Lightbulb className="h-8 w-8 text-primary" />
                      </div>
                      <p className="text-sm font-medium">Smart Insights</p>
                      <p className="text-xs text-muted-foreground mt-1">Generate reports for inventory optimization, cost reduction, and efficiency</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                RFID System Benefits
              </h2>
              <p className="text-xl text-muted-foreground">
                Transform your linen management with cutting-edge RFID technology
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {siteConfig.rfid.benefits
                .filter((b) => !/location/i.test(b))
                .map((benefit, index) => {
                const benefitData = benefits[index % benefits.length] || benefits[0]
                const IconComponent = benefitData.icon
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-lg text-primary">
                          {benefitData.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {benefit}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Timeline Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Implementation Timeline
              </h2>
              <p className="text-xl text-muted-foreground">
                Our structured 6-week rollout plan for seamless integration
              </p>
            </div>

            {/* Desktop Timeline */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-primary/20 transform -translate-y-1/2"></div>
                
                <div className="grid grid-cols-4 gap-4 relative z-10">
                  {timelineSteps.map((step, index) => {
                    const IconComponent = step.icon
                    return (
                      <div key={index} className="text-center">
                        <Card className="hover:shadow-lg transition-shadow border-2 hover:border-primary/20">
                          <CardHeader className="pb-3">
                            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                              <IconComponent className="h-6 w-6 text-primary" />
                            </div>
                            <Badge variant="outline" className="text-xs mb-2">
                              {step.week}
                            </Badge>
                            <CardTitle className="text-sm text-primary">
                              {step.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <p className="text-xs text-muted-foreground">
                              {step.description}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Mobile Timeline */}
            <div className="lg:hidden space-y-4">
              {timelineSteps.map((step, index) => {
                const IconComponent = step.icon
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs w-fit">
                              {step.week}
                            </Badge>
                            <h3 className="font-semibold text-primary">
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold">Ready to Experience RFID Technology?</h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">Be among the first to experience our revolutionary RFID tracking system.</p>
            </Reveal>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                <Link href="/contact">
                  {siteConfig.ctas.estimate}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
    </LenisProvider>
  )
}
