"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import QuickSearch from "@/components/QuickSearch";
import Catalog from "@/components/Catalog";
import HowItWorks from "@/components/HowItWorks";
import WhyBatumi from "@/components/WhyBatumi";
import ContactForm from "@/components/ContactForm";
import Neighborhoods from "@/components/Neighborhoods";
import EliteRealty from "@/components/EliteRealty";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

interface Filters {
  rentalType: string;
  budget: string;
  rooms: string;
}

export default function Home() {
  const [filters, setFilters] = useState<Filters>({
    rentalType: "",
    budget: "",
    rooms: "",
  });

  return (
    <main style={{ background: "#0F1C2E", minHeight: "100vh" }}>
      <Header />
      <Hero />
      <QuickSearch onSearch={setFilters} />
      <Catalog filters={filters} />
      <Neighborhoods />
      <HowItWorks />
      <WhyBatumi />
      <ContactForm />
      <EliteRealty />
      <Testimonials />
      <FinalCTA />
      <Footer />
      <FloatingCTA />
    </main>
  );
}
