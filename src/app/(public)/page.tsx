import HeroSection from "@/components/site/HeroSection";

export const metadata = {
  title: "Home",
};

export default async function IndexPage() {
  return (
    <div className="w-full h-full">
      <HeroSection />
    </div>
  );
}
