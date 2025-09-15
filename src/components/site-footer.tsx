import Link from "next/link"
import { Mail, MapPin, Phone, Clock } from "lucide-react"

import { siteConfig } from "@/config/site"

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Contact Us
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <address className="text-sm text-muted-foreground not-italic">
                  {siteConfig.address}
                </address>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <a 
                  href={`tel:${siteConfig.phone}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <a 
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {siteConfig.email}
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  {siteConfig.hours}
                </p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Services
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>24-Hour Turnaround</li>
              <li>Daily Collection & Delivery</li>
              <li>Emergency Service</li>
              <li>RFID Tracking (Coming Soon)</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Quick Links
            </h3>
            <nav className="space-y-2">
              <Link 
                href="/about" 
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                About Us
              </Link>
              <Link 
                href="/rfid" 
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                RFID System
              </Link>
              <Link 
                href="/contact" 
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Get Estimate
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} {siteConfig.name}. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <p className="text-sm text-muted-foreground">
                {siteConfig.tagline}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
