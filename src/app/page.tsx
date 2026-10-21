import { SiteHeader } from "@/components/navigation/site-header";
import { Hero } from "@/components/hero/hero";
import { OurWork } from "@/components/work/our-work";
import { TechStack } from "@/components/tech/tech-stack";
import { Different } from "@/components/why/different";
import { ServiceCards } from "@/components/services/service-cards";
import { FaqSection } from "@/components/faq/faq-section";
import { ContactSection } from "@/components/contact/contact-section";
import { SiteFooter } from "@/components/footer/site-footer";
import { WhatsAppButton } from "@/components/assistant/whatsapp-button";
import { EmailCapture } from "@/components/marketing/email-capture";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <OurWork />
        <TechStack />
        <Different />
        <ServiceCards />
        <FaqSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <WhatsAppButton />
      <EmailCapture />
    </>
  );
}
