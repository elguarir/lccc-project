import {
  ChevronRight,
  ChevronRightIcon,
  Dot,
  Facebook,
  Instagram,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Footer = () => {
  const links = [
    {
      title: "Home",
      links: [
        {
          title: "Home",
          link: "/",
        },
        {
          title: "About",
          link: "/about",
        },
        {
          title: "Services",
          link: "/services",
        },
        {
          title: "Projects",
          link: "/projects",
        },
        {
          title: "Contact",
          link: "/contact",
        },
      ],
    },
    {
      title: "Services",
      links: [
        {
          title: "Construction",
          link: "/services/construction",
        },
        {
          title: "Renovation",
          link: "/services/renovation",
        },
        {
          title: "Interior Design",
          link: "/services/interior-design",
        },
        {
          title: "Architecture",
          link: "/services/architecture",
        },
        {
          title: "Consulting",
          link: "/services/consulting",
        },
      ],
    },
    {
      title: "Projects",
      links: [
        {
          title: "Residential",
          link: "/projects/residential",
        },
        {
          title: "Commercial",
          link: "/projects/commercial",
        },
        {
          title: "Industrial",
          link: "/projects/industrial",
        },
        {
          title: "Institutional",
          link: "/projects/institutional",
        },
        {
          title: "Hospitality",
          link: "/projects/hospitality",
        },
      ],
    },
    {
      title: "Contact",
      links: [
        {
          title: "Contact",
          link: "/contact",
        },
        {
          title: "Careers",
          link: "/careers",
        },
        {
          title: "Privacy Policy",
          link: "/privacy-policy",
        },
        {
          title: "Terms & Conditions",
          link: "/terms-and-conditions",
        },
        {
          title: "Sitemap",
          link: "/sitemap",
        },
      ],
    },
  ];

  const workingHours = [
    {
      day: "Monday",
      hours: "8:00 AM - 5:00 PM",
    },
    {
      day: "Tuesday",
      hours: "8:00 AM - 5:00 PM",
    },
    {
      day: "Wednesday",
      hours: "8:00 AM - 5:00 PM",
    },
    {
      day: "Thursday",
      hours: "8:00 AM - 5:00 PM",
    },
    {
      day: "Friday",
      hours: "8:00 AM - 5:00 PM",
    },
    {
      day: "Saturday",
      hours: "8:00 AM - 5:00 PM",
    },
    {
      day: "Sunday",
      hours: "8:00 AM - 5:00 PM",
    },
  ];
  return (
    <div className="bg-[#0a0a0a] text-neutral-100">
      <div className="container grid gap-3 py-20 pb-6">
        <div className="flex justify-between pb-12 border-b border-neutral-800">
          <div className="p-2 px-4 rounded-lg bg-neutral-300">
            <img src="/images/somacep.png" alt="" className="w-28" />
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary-background text-neutral-100">
              <Phone className="w-7 h-7" />
            </div>
            <div className="grid gap-0">
              <span className="text-sm font-medium">Need a consultation?</span>
              <span className="text-lg font-bold">
                Call us at :{" "}
                <Link
                  className="transition-colors duration-200 hover:text-primary-background"
                  href="tel:+212528826660"
                >
                  +212 5 28 82 66 60
                </Link>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className="p-2 rounded-md bg-neutral-500">
              <Facebook className="w-5 h-5" />
            </div>

            <div className="p-2 rounded-md bg-neutral-500">
              <Youtube className="w-5 h-5" />
            </div>
            <div className="p-2 rounded-md bg-neutral-500">
              <Instagram className="w-5 h-5" />
            </div>
            <div className="p-2 rounded-md bg-neutral-500">
              <Twitter className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between py-12 border-b border-neutral-800">
          <div className="flex flex-col h-full">
            <span className="text-2xl font-semibold leading-relaxed">
              Usefull Links
            </span>
            <span className="w-16 h-1 mt-2 rounded-md bg-primary-background" />
            <div className="grid gap-2 pt-4">
              {links[0].links.map((link) => (
                <div className="flex items-center gap-2">
                  <ChevronRightIcon className="w-4 h-4" />
                  <Link
                    key={link.title}
                    href={link.link}
                    className="tracking-wide duration-200 ransition-colors text hover:text-primary-background"
                  >
                    {link.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col h-full">
            <span className="text-2xl font-semibold leading-relaxed">
              Newsletter
            </span>
            <span className="w-16 h-1 mt-2 rounded-md bg-primary-background" />
            <div className="grid gap-2 pt-4">
              <p className="text-neutral-300">
                Subscribe For Daily Latest News & Updates
              </p>
              <form className="mt-2 space-y-3 dark">
                <Input placeholder="Your email address" type="email" />
                <Button type="submit" className="w-full">
                  Subscribe Now
                </Button>
              </form>
            </div>
          </div>
          <div className="flex flex-col h-full">
            <span className="text-2xl font-semibold leading-relaxed">
              Working Hours
            </span>
            <span className="w-16 h-1 mt-2 rounded-md bg-primary-background" />
            <div className="grid gap-2 pt-4">
              {workingHours.map((workingHour) => (
                <div className="flex items-center gap-2">
                  •
                  <span className="tracking-wide">
                    <span className="font-semibold">{workingHour.day}</span> :{" "}
                    {workingHour.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center pt-4">
          <div className="grid">
            <span className="font-semibold tracking-tight text-neutral-500">
              ©2023 SOMACEP. All rights reserved.
            </span>

            <span className="mt-1 text-sm font-medium text-center text-neutral-400">
              Developed by{" "}
              <Link
                className="transition-colors duration-200 hover:text-primary-background"
                href="https://github.com/MohamedElguarir"
              >
                Mohamed Elguarir
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
