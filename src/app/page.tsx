import Link from "next/link"
import { ArrowRight, CheckCircle, Package, Truck, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { siteConfig } from "@/config/site"

export default function HomePage() {
  const processSteps = [
    {
      step: "1",
      title: "Collection",
      description: "11:00 AM daily pickup",
      icon: Truck,
    },
    {
      step: "2", 
      title: "Sorting & Pre-Treat",
      description: "Category separation and stain treatment",
      icon: Package,
    },
    {
      step: "3",
      title: "Wash",
      description: "Commercial-grade cleaning",
      icon: Zap,
    },
    {
      step: "4",
      title: "Dry & Finish",
      description: "Professional drying and pressing",
      icon: CheckCircle,
    },
    {
      step: "5",
      title: "Quality Control & Package",
      description: "Inspection and protective wrapping",
      icon: Package,
    },
    {
      step: "6",
      title: "Delivery",
      description: "11:00 AM next day delivery",
      icon: Truck,
    },
  ]

  const whyChooseUs = [
    "Reliability",
    "Quality", 
    "Convenience",
    "Flexibility",
    "Professional Image"
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              {siteConfig.tagline}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/contact">
                  {siteConfig.ctas.estimate}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link href="/rfid">
                  RFID Tracking (Coming Soon)
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose RSL Express?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional linen services designed specifically for the hospitality industry
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {siteConfig.highlights.map((highlight, index) => (
              <Card key={index} className="border-2 hover:border-primary/20 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Service Excellence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {highlight}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Overview Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Comprehensive Linen Services
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We specialize in hospitality-focused linen solutions with daily pickup and delivery. 
              Our emergency service provides 4-hour notice turnaround when you need it most.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Bed Linens */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-primary">Bed Linens</CardTitle>
                <CardDescription>
                  Professional care for all bedding essentials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {siteConfig.service.categories.bed.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Bath Linens */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-primary">Bath Linens</CardTitle>
                <CardDescription>
                  Sanitized and fresh towels for your guests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {siteConfig.service.categories.bath.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Table Linens */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-primary">Table Linens</CardTitle>
                <CardDescription>
                  Spotless tablecloths and napkins for dining
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {siteConfig.service.categories.table.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground">
              What sets us apart in the linen service industry
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {whyChooseUs.map((value, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-base px-6 py-3 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                {value}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our 24-Hour Process
            </h2>
            <p className="text-xl text-muted-foreground">
              From collection to delivery, we ensure quality every step of the way
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">
                      Step {step.step}: {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Switch?
            </h2>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Join the hospitality businesses that trust RSL Express for their linen needs. 
              Get started with a free estimate or trial service today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
                <Link href="/contact">
                  {siteConfig.ctas.estimate}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link href="/contact">
                  {siteConfig.ctas.trial}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}