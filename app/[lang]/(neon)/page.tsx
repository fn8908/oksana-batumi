"use client";

import ViceHeader from "@/components/vice/ViceHeader";
import ViceHero from "@/components/vice/ViceHero";
import ViceCatalog from "@/components/vice/ViceCatalog";
import ViceForm from "@/components/vice/ViceForm";
import ViceSteps from "@/components/vice/ViceSteps";
import ViceFaq from "@/components/vice/ViceFaq";
import ViceDistricts from "@/components/vice/ViceDistricts";
import ViceRent from "@/components/vice/ViceRent";
import ViceFooter from "@/components/vice/ViceFooter";
import ViceFloating from "@/components/vice/ViceFloating";

// Вторая версия главной: тот же текст и те же объекты, оформление - неон Вайс-Сити
export default function VicePage() {
  return (
    <main>
      <ViceHeader />
      <ViceHero />
      <ViceCatalog />
      <ViceForm />
      <ViceSteps />
      <ViceFaq />
      <ViceDistricts />
      <ViceRent />
      <ViceFooter />
      <ViceFloating />
    </main>
  );
}
