"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  HamburgerMenuIcon as Menu,
  Cross1Icon as X,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { NavItem } from "@/types/nav";
import { MailIcon } from "lucide-react";
export default function MobileNav({ items }: { items?: NavItem[] }) {
  const [open, setOpen] = useState<boolean>(false);

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
        aria-label="menu toggle"
        variant={"ghost"}
        size={"icon"}
        className="flex items-center justify-center w-12 h-10 p-2 md:hidden"
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>
      {/* mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="fixed right-0 w-full h-full mx-auto p-0 transition-[background-color] duration-200 py-2 md:hidden bg-neutral-50 top-20 border-t z-30"
          >
            <div className="flex flex-col items-center justify-start max-w-xs px-2 py-4 pt-6 pb-24 mx-auto">
              {items?.map((item) => (
                <Link
                  onClick={() => setOpen(false)}
                  className="text-lg w-full border-b dark:border-[#52525952] pt-4 pb-[11px] transition-colors duration-200 ease-in-out hover:text-primary font-semibold"
                  href={item.href || "/"}
                >
                  {item.title}
                </Link>
              ))}
              <Button asChild className="w-full mt-3">
                <Link href={"/contact"}>
                  <MailIcon className="w-4 h-4 mr-2" strokeWidth={2} />
                  Contact Us
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
