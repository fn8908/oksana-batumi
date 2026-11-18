"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SaleCatalog from "@/components/SaleCatalog";
import SelectionForm from "@/components/SelectionForm";
import HowItWorks from "@/components/HowItWorks";
import BuyerGuide from "@/components/BuyerGuide";
import Neighborhoods from "@/components/Neighborhoods";
import RentBlock from "@/components/RentBlock";
import WhyBatumi from "@/components/WhyBatumi";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

// Порядок под покупателя: объекты -> подборка -> как проходит покупка -> вопросы -> районы.
// Аренда и владельцы - ниже, отдельным разделом.
export default function Home() {
  return (
    <main style={{ background: "#0F1C2E", minHeight: "100vh" }}>
      <Header />
      <Hero />
      <SaleCatalog />
      <SelectionForm />
      <HowItWorks />
      <BuyerGuide />
      <Neighborhoods />
      <RentBlock />
      <section id="why-batumi"><WhyBatumi /></section>
      <FinalCTA />
      <Footer />
      <FloatingCTA />
    </main>
  );
}
