"use client";

import { LenisProvider } from "@/components/lenis-provider";
import Reveal from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import Link from "next/link";

export default function FractalDemoPage() {
  return (
    <LenisProvider>
      <main className="min-h-screen bg-white text-gray-900">
        {/* Hero */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-36">
          <div className="max-w-4xl">
            <motion.h1
              className="text-5xl sm:text-7xl font-extrabold leading-[0.95] tracking-tight"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="block">Infinite</span>
              <span className="block">Solutions</span>
            </motion.h1>
            <p className="mt-6 max-w-prose text-lg text-gray-600">
              Jouw partner door het digitale tijdperk.
            </p>
            <div className="mt-8 flex gap-3">
              <Button asChild>
                <Link href="#expertise">Verken nu</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="#contact">Een gesprek plannen</Link>
              </Button>
            </div>
          </div>
        </section>

        <Separator />

        {/* Expertise */}
        <section id="expertise" className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <Reveal>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">Ontdek Onze Expertise</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Webdesign",
                points: [
                  "Creatieve en op maat gemaakte ontwerpen",
                  "Responsieve websites die op elk apparaat schitteren",
                  "Geoptimaliseerd voor zoekmachines (SEO)",
                ],
              },
              {
                title: "Social Media & Marketing",
                points: [
                  "Krachtig designwerk",
                  "Creatieve content die uw merk versterkt",
                  "Doelgroepanalyse voor optimale betrokkenheid",
                ],
              },
              {
                title: "Tech Solutions",
                points: [
                  "Odoo ERP implementaties",
                  "Email, Domein & Office setup",
                  "Scripting",
                ],
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.08}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl">{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-600">
                      {card.points.map((p) => (
                        <li key={p} className="leading-relaxed">{p}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>

        <Separator />

        {/* Realisations */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <Reveal>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">Onze Realisaties</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <Card className="h-56" />
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <Button asChild variant="secondary">
              <Link href="#contact">Verken nu</Link>
            </Button>
          </div>
        </section>

        <Separator />

        {/* Contact */}
        <section id="contact" className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <Reveal>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">Contact</h2>
          </Reveal>
          <div className="mt-8 max-w-xl text-gray-600">
            Binnenkort beschikbaar.
          </div>
        </section>
      </main>
    </LenisProvider>
  );
}


