"use client";
import React, { useEffect, useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import { Cross2Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
const MobileNav = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [open]);

  
  return (
    <>
      <Button
        size={"icon"}
        variant={"ghost"}
        className="rounded-full md:hidden"
        onClick={() => setOpen(!open)}
      >
        {!open ? (
          <HamburgerMenuIcon strokeWidth={2.75} className="w-5 h-5" />
        ) : (
          <Cross2Icon strokeWidth={2.75} className="w-5 h-5" />
        )}
      </Button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="fixed right-0 w-full h-full mx-auto p-0 transition-[background-color] duration-200 py-2 md:hidden bg-background top-16 z-30"
          >
            <ul className="grid divide-y divide-muted dark:divide-muted/40 px-7">
              <li className="py-3">
                <button className="flex justify-between w-full">
                  <p className="font-semibold">Articles</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 text-gray-500 transition-all"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
              </li>
              <li className="py-3">
                <Link
                  onClick={() => setOpen(false)}
                  className="flex w-full font-semibold capitalize"
                  href="/lessons"
                >
                  Lessons
                </Link>
              </li>
              <li className="py-3">
                <Link
                  onClick={() => setOpen(false)}
                  className="flex w-full font-semibold capitalize"
                  href="/about"
                >
                  About
                </Link>
              </li>
              <li className="py-3">
                <Link
                  onClick={() => setOpen(false)}
                  className="flex w-full font-semibold capitalize"
                  href="/contact"
                >
                  Contact Us
                </Link>
              </li>

              <div className="grid grid-cols-2 gap-4 py-4">
                <li>
                  <Button
                    onClick={() => setOpen(false)}
                    className="flex w-full font-semibold capitalize"
                    asChild
                  >
                    <Link href={"/sign-up"}>Sign Up</Link>
                  </Button>
                </li>
                <li>
                  <Button
                    onClick={() => setOpen(false)}
                    className="flex w-full font-semibold capitalize"
                    asChild
                    variant={"outline"}
                  >
                    <Link href={"/sign-in"}>Sign In</Link>
                  </Button>
                </li>
              </div>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;
