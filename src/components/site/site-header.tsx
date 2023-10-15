import { siteConfig } from "@/config/site";
import { MainNav } from "@/components/site/main-nav";

export function SiteHeader() {
  return (
    <header className="absolute top-0 z-40 w-full backdrop:blur-sm">
      <div className="container flex items-center justify-between h-20 space-x-4">
        <MainNav items={siteConfig.mainNav} />
      </div>
    </header>
  );
}
