import Nav from "@/components/Nav";
import FooterCta from "@/components/FooterCta";
import ScrollProgress from "@/components/ScrollProgress";
import ProductsPageContent from "@/components/ProductsPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produse — Ventira Studio",
  description:
    "Descoperă produsele AI ale Ventira Studio: AI Receptionist, AI Contabil, AI HR și agenți custom pentru afaceri din România.",
};

export default function ProduselePage() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <ProductsPageContent />
        <FooterCta />
      </main>
    </>
  );
}
