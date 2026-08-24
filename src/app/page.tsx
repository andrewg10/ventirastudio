import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import SpeedProof from "@/components/SpeedProof";
import Services from "@/components/Services";
import Comparison from "@/components/Comparison";
import LiveDemo from "@/components/LiveDemo";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import MotionRoot from "@/components/MotionRoot";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SpeedProof />
        <Services />
        <Comparison />
        <LiveDemo />
        <Projects />
        <Process />
        <ContactSection />
      </main>
      <Footer />
      <MotionRoot />
    </>
  );
}
