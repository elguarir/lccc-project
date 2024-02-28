import ArticlesSection from "@/components/site/ArticlesSection";
import CategoriesSection from "@/components/site/CategoriesSection";
import EventsSection from "@/components/site/EventsSection";
import HeroSection from "@/components/site/HeroSection";

export const metadata = {
  title: "Home",
};

export default function IndexPage() {
  return (
    <div className="w-full h-full px-2 lg:px-4">
      <HeroSection />
      <ArticlesSection />
      <CategoriesSection />
      <EventsSection />
    </div>
  );
}
