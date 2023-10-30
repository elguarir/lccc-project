import ClientsSection from "@/components/home/ClientsSection";
import ContactSection from "@/components/home/ContactSection";
import FaqSection from "@/components/home/FaqSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import SecondSection from "@/components/home/SecondSection";
import ServicesSection from "@/components/home/ServicesSection";
import WhyUsSection from "@/components/home/WhyUsSection";
export const metadata = {
  title: "Home",
};

export default function IndexPage() {
  return (
    <>
      <WhyUsSection />
      <SecondSection />
      <ServicesSection />
      <FaqSection />
      <ProjectsSection />
      <ContactSection />
      <ClientsSection />
    </>
  );
}
