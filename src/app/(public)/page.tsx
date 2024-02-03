import ArticlesSection from "@/components/site/ArticlesSection";
import HeroSection from "@/components/site/HeroSection";

export const metadata = {
  title: "Home",
};

export default async function IndexPage() {
  return (
    <div className="w-full h-full px-2 lg:px-4">
      <HeroSection />
      <ArticlesSection />
    </div>
  );
}
