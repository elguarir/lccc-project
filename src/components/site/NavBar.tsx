import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import MobileNav from "./MobileNav";

const NavBar = async () => {
  const user = await currentUser();

  return (
    <div className="border-b">
      <nav className="container py-2.5 max-md:px-6">
        <div className="flex items-center justify-between w-full h-12">
          <div className="flex items-center justify-between max-md:w-full">
            <div className="w-36 md:w-40 logo">
              <Link href={"/"}>
                <img
                  alt="LCCC Logo"
                  src="/images/logo.png"
                  aria-label="LCCC Logo"
                />
              </Link>
            </div>
            <MobileNav />
          </div>
          {/* Desktop */}
          <ul className="items-center justify-center flex-1 hidden h-full gap-6 md:flex">
            <li className="text-base font-medium hover:text-[#657dcc] transition-colors duration-300">
              <Link href={"/"}>Home</Link>
            </li>
            <li className="text-base font-medium hover:text-[#657dcc] transition-colors duration-300">
              <Link href={"/articles"}>Articles</Link>
            </li>
            <li className="text-base font-medium hover:text-[#657dcc] transition-colors duration-300">
              <Link href={"/lessons"}>Lessons</Link>
            </li>
            <li className="text-base font-medium hover:text-[#657dcc] transition-colors duration-300">
              <Link href={"/about"}>About</Link>
            </li>

            <li className="text-base font-medium hover:text-[#657dcc] transition-colors duration-300">
              <Link href={"/contact"}>Contact Us</Link>
            </li>
          </ul>
          <div className="items-center hidden space-x-3 md:flex">
            {user ? (
              <Button asChild size={"sm"} className="">
                <Link href={"/dashboard"}>Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild size={"sm"} variant={"outline"} className="">
                  <Link href={"/sign-in"}>Sign In</Link>
                </Button>
                <Button asChild size={"sm"} className="">
                  <Link href={"/sign-up"}>Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
