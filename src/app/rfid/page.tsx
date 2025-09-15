import Link from "next/link"
import Image from "next/image"
import { 
  Radio, 
  BarChart3, 
  MapPin, 
  RefreshCw, 
  Monitor, 
  AlertTriangle, 
  Calculator,
  CheckCircle,
  ArrowRight,
  Clock,
  Calendar,
  Zap
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
      week: "Weeks 1–8",
      title: "Software Development",
      description: "Software development & integration",
      icon: Zap
    },
    {
      week: "Weeks 6–8", 
      title: "Hardware Installation",
      description: "Hardware installation preparation",
      icon: Radio
    },
    {
      week: "Weeks 9–10",
      title: "System Testing",
      description: "System testing & calibration",
      icon: CheckCircle
    },
    {
      week: "Week 11",
      title: "Staff Training",
      description: "Comprehensive staff training program",
      icon: RefreshCw
    },
    {
      week: "Week 12",
      title: "Full Deployment",
      description: "Complete system rollout and go-live",
      icon: Calendar
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left space-y-6">
                <div className="flex justify-center lg:justify-start mb-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                    <Radio className="h-10 w-10 text-primary" />
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                  RFID Tracking System
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Revolutionary technology to enhance our linen service with complete transparency and control
                </p>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-md">
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center border-2 border-primary/20">
                    <div className="text-center space-y-4">
                      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <Radio className="h-12 w-12 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <div className="w-16 h-2 bg-primary/30 rounded mx-auto"></div>
                        <div className="w-12 h-2 bg-primary/20 rounded mx-auto"></div>
                        <div className="w-8 h-2 bg-primary/10 rounded mx-auto"></div>
                      </div>
                      <p className="text-sm text-primary/70 font-medium">RFID Technology</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our RFID Investment
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {siteConfig.rfid.statusNote}
            </p>
            <div className="mt-8">
              <Badge variant="secondary" className="text-base px-4 py-2 bg-primary/10 text-primary">
                Coming Soon - Trial Service Available Now
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                RFID System Benefits
              </h2>
              <p className="text-xl text-muted-foreground">
                Transform your linen management with cutting-edge RFID technology
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Benefits Grid */}
              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                {siteConfig.rfid.benefits.map((benefit, index) => {
                  const benefitData = benefits[index] || benefits[0]
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
              
              {/* RFID Technology Visualization */}
              <div className="lg:col-span-1">
                <Card className="hover:shadow-lg transition-shadow h-fit">
                  <CardHeader>
                    <CardTitle className="text-primary text-center">How RFID Works</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Radio className="h-8 w-8 text-primary" />
                        </div>
                        <p className="text-sm text-muted-foreground">RFID Tags</p>
                      </div>
                      
                      <div className="flex justify-center">
                        <div className="w-full h-0.5 bg-primary/20 relative">
                          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full"></div>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Monitor className="h-8 w-8 text-primary" />
                        </div>
                        <p className="text-sm text-muted-foreground">Reader System</p>
                      </div>
                      
                      <div className="flex justify-center">
                        <div className="w-full h-0.5 bg-primary/20 relative">
                          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full"></div>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                          <BarChart3 className="h-8 w-8 text-primary" />
                        </div>
                        <p className="text-sm text-muted-foreground">Data Analytics</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
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
                Our structured 12-week rollout plan for seamless integration
              </p>
            </div>

            {/* Desktop Timeline */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-primary/20 transform -translate-y-1/2"></div>
                
                <div className="grid grid-cols-5 gap-4 relative z-10">
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

      {/* Status Note Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="text-center lg:text-left">
                <Card className="hover:shadow-lg transition-shadow border-2 border-primary/20">
                  <CardHeader>
                    <div className="mx-auto lg:mx-0 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Clock className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-primary">Current Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                      {siteConfig.rfid.statusNote}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                      <Badge variant="secondary" className="text-sm px-4 py-2 bg-green-100 text-green-700">
                        Manual Tracking Active
                      </Badge>
                      <Badge variant="secondary" className="text-sm px-4 py-2 bg-blue-100 text-blue-700">
                        Trial Service Available
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Dashboard Mockup */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-full max-w-sm">
                  <div className="bg-white rounded-2xl shadow-xl border-2 border-primary/20 overflow-hidden">
                    <div className="bg-primary/10 p-4 border-b border-primary/20">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div className="ml-4 text-xs font-medium text-primary">RFID Dashboard</div>
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Monitor className="h-6 w-6 text-primary" />
                        </div>
                        <p className="text-xs text-muted-foreground">Real-time Tracking</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Items Tracked</span>
                          <span className="text-primary font-medium">1,247</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full w-3/4"></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">In Transit</span>
                          <span className="text-primary font-medium">156</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full w-1/3"></div>
                        </div>
                      </div>
                      
                      <div className="pt-2 border-t border-muted">
                        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                          <Radio className="h-3 w-3" />
                          <span>RFID System Active</span>
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

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Experience RFID Technology?
            </h2>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Be among the first to experience our revolutionary RFID tracking system. 
              Schedule a trial service or get a free estimate for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
                <Link href="/contact">
                  {siteConfig.ctas.trial}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link href="/contact">
                  {siteConfig.ctas.estimate}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
