import ClientsSection from "@/components/home/ClientsSection";
import ContactSection from "@/components/home/ContactSection";
import FaqSection from "@/components/home/FaqSection";
import HeaderSection from "@/components/home/HeaderSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import SecondSection from "@/components/home/SecondSection";
import ServicesSection from "@/components/home/ServicesSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import { getServices } from "@/server/routers/service";
export const metadata = {
  title: "Home",
};

export default async function IndexPage() {
  const services = await getServices();

  return (
    <>
      <div className="z-50 w-full h-full pb-10 lg:pt-20 lg:container">
        <HeaderSection />
      </div>

      <WhyUsSection />
      <SecondSection />
      <ServicesSection services={services} />
      <FaqSection />
      <ProjectsSection />
      <ContactSection />
      <ClientsSection />
    </>
  );
}
