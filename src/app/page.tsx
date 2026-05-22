"use client"

import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { SchoolLogos } from "@/components/landing/school-logos"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Features } from "@/components/landing/features"
import { Testimonials } from "@/components/landing/testimonials"
import { FooterCta } from "@/components/landing/footer-cta"
import { LandingFooter } from "@/components/landing/landing-footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background tp-mesh-bg">
      <Navbar />
      <main>
        <Hero />
        <SchoolLogos />
        <HowItWorks />
        <Features />
        <Testimonials />
        <FooterCta />
      </main>
      <LandingFooter />
    </div>
  )
}
