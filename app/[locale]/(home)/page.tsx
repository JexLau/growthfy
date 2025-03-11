import React from "react";
import {
  Hero,
  TrustedBy,
  Features,
  HowItWorks,
  Solutions,
  CaseStudies,
  Pricing,
  Blog,
  CTA,
  FAQ,
} from '@/components/home';
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <main>
    <Hero />
    <TrustedBy />
    <Features />
    <HowItWorks />
    <Solutions />
    <CaseStudies />
    <Pricing />
    <Blog />
    <CTA />
    <FAQ />
  </main>
}

