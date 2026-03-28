import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Products from "@/components/Products";
import Testimonials from "@/components/Testimonials";
import FooterCta from "@/components/FooterCta";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <Products />
        <Testimonials />
        <FooterCta />
      </main>
    </>
  );
}
