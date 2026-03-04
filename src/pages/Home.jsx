import Hero from "../components/Hero";
import Services from "../components/Services";
import FeaturedProviders from "../components/FeaturedProviders";
import CTA from "../components/CTA";
import ContactForm from "../components/ContactForm";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <FeaturedProviders />
      <CTA />
      <ContactForm />
    </>
  );
}
