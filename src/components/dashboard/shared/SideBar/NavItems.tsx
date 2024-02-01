import React from "react";
import NavLink from "./NavLink";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { DashboardLinkProps } from "@/types/nav";

type Props = {
  links: DashboardLinkProps[];
};

function NavItems({ links }: Props) {
  return (
    <ul className="relative">
      {links.map((link) => (
        <>
          {link.type === "link" ? (
            <NavLink href={link.href}>
              <div className="flex items-center w-full">
                <div className="flex items-center flex-1">
                  <link.icon className="w-5 h-5 mr-2" />
                  {link.name}
                </div>
                <div>{link.endContent && <link.endContent />}</div>
              </div>
            </NavLink>
          ) : (
            <Accordion type="single" collapsible>
              <AccordionItem className="border-0" value={link.name}>
                <li className="flex items-center w-full px-3 group">
                  <div className="transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
                    <AccordionTrigger />
                  </div>
                  <div className="flex items-center justify-between w-full py-2 ml-1 text-base font-medium transition-colors duration-300 outline-none hover:text-foreground text-muted-foreground">
                    <Link href={link.href} className="flex items-center flex-1">
                      {link.icon({ className: "w-5 h-5 mr-2" })}
                      Articles
                    </Link>
                    {link.endContent && <link.endContent />}
                  </div>
                </li>
                <AccordionContent>
                  {link.items?.map((item) => (
                    <NavLink key={item.name} className="flex items-center justify-between px-8 pl-14" href={item.href}>
                      {item.name}
                      {item.endContent && <item.endContent />}
                    </NavLink>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </>
      ))}
    </ul>
  );
}

export default NavItems;
