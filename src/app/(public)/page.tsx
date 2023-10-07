import Link from "next/link";

import { siteConfig } from "@/config/site";
import PlateEditor from "@/components/plate-editor";
import { buttonVariants } from "@/components/ui/plate/button";
import { ArrowRight, ArrowUpRight, ArrowUpRightFromCircle } from "lucide-react";

export const metadata = {
  title: "Home",
};

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter font-display md:text-4xl xl:text-5xl">
          Plate Playground.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Plugin system & primitive component library.{" "}
          <br className="hidden sm:inline" />
          CLI for styled components. Customizable. Open Source. And Next.js 13
          Ready.
        </p>
      </div>
      <div className="flex gap-4">
        <Link href={"/sign-up"} rel="noreferrer" className={buttonVariants()}>
          Join Us
          <ArrowUpRightFromCircle className="w-3.5 h-3.5 ml-2" />
        </Link>
        <Link
          href={"/sign-in"}
          className={buttonVariants({ variant: "outline" })}
        >
          Sign In
        </Link>
      </div>
{/* 
      <div className="max-w-[1336px] rounded-lg border bg-background shadow">
        <PlateEditor />
      </div> */}
    </section>
  );
}
