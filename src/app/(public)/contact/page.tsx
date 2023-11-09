import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getProjects } from "@/server/routers/project";
import { RouterOutput } from "@/types/router";
import { DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { LocateIcon, Map } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = async () => {
  return (
    <div className="pt-8 lg:pt-20">
      <div className="container space-y-2">
        <h1 className="text-2xl font-bold lg:text-3xl xl:text-5xl">
          Contact Us
        </h1>
        <p className="max-w-2xl mt-4 text-sm font-medium [text-wrap:balance] text-muted-foreground">
          We are here to answer any questions you may have about our
          construction experiences. Reach out to us and we'll respond as soon as
          we can.
        </p>
      </div>

      <div
        style={{
          backgroundImage: "url('/images/contact-bg.png')",
        }}
        className="object-cover py-24 bg-no-repeat"
      >
        <div className="container grid grid-cols-1 gap-6 mx-auto mt-24 lg:px-24 lg:gap-12 md:grid-cols-2">
          <div className="px-10 py-16 border rounded-md h-fit bg-background border-input">
            <div className="flex items-center gap-1">
              <span className="w-5 h-0.5 rounded-md bg-primary-background" />
              <span className="text-xs font-semibold text-neutral-500">
                CONTACT
              </span>
            </div>
            <span className="text-3xl font-[650] leading-relaxed">
              Get in Touch
            </span>
            <p className="text-sm font-medium text-neutral-500">
              Unlock the Door to Outstanding Construction Solutions - Reach Out
              to Us Today and Let's Build Your Vision Together!
            </p>
            <div className="grid gap-5 pt-8">
              <div className="flex items-center gap-6 pb-6 border-b border-neutral-100">
                <div className="p-2 rounded-sm bg-primary-background text-neutral-100">
                  <Map className="w-10 h-10" />
                </div>
                <div className="grid gap-1">
                  <h3 className="text-xl font-semibold">
                    Our head office address
                  </h3>
                  <p className="text-sm font-medium text-neutral-500">
                    N°26. Imm M1. Bd Mly Abdellah Agadir
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6 pb-6 border-b border-neutral-100">
                <div className="p-2 rounded-sm bg-primary-background text-neutral-100">
                  <Map className="w-10 h-10" />
                </div>
                <div className="grid gap-1">
                  <h3 className="text-xl font-semibold">
                    Mail us for information
                  </h3>
                  <p className="text-sm font-medium text-neutral-500">
                    somacep2@gmail.com
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6 pb-6">
                <div className="p-2 rounded-sm bg-primary-background text-neutral-100">
                  <Map className="w-10 h-10" />
                </div>
                <div className="grid gap-1">
                  <h3 className="text-xl font-semibold">Phone number</h3>
                  <p className="text-sm font-medium text-neutral-500">
                    +212528826660
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* contact form */}
          <div className="px-10 py-16 border rounded-md bg-muted border-input">
            <div className="flex items-center gap-1">
              <span className="w-5 h-0.5 rounded-md bg-primary-background" />
              <span className="text-xs font-semibold text-neutral-500">
                CONTACT FORM
              </span>
            </div>
            <span className="text-3xl font-[650] leading-relaxed">
              Send Us a Message
            </span>
            <p className="text-sm font-medium text-neutral-500"></p>
            <form className="max-w-lg mt-6 space-y-5 lg:max-w-xl">
              <div className="grid w-full space-y-2">
                <Label>Name</Label>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full"
                />
              </div>
              <div className="grid w-full space-y-2">
                <Label>Company</Label>
                <Input
                  type="text"
                  placeholder="Enter your company name"
                  className="w-full"
                />
              </div>

              <div className="grid w-full space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full"
                />
              </div>

              <div className="grid w-full space-y-2">
                <Label>Phone</Label>
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full"
                />
              </div>

              <div className="grid w-full space-y-2">
                <Label>Message</Label>
                <Textarea
                  placeholder="Enter your message"
                  className="w-full h-24"
                />
              </div>

              <div className="grid w-full">
                <Button className="font-sem">Submit</Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <iframe
        loading="lazy"
        src="https://maps.google.com/maps?q=29%20Ave%20du%20Prince%20Moulay%20Abdallah%2C%20Agadir%2080000&amp;t=m&amp;z=18&amp;output=embed&amp;iwloc=near"
        title="29 Ave du Prince Moulay Abdallah, Agadir 80000"
        aria-label="29 Ave du Prince Moulay Abdallah, Agadir 80000"
        className="w-full h-[500px] -mb-10 mt-24 grayscale"
      />
    </div>
  );
};

export default page;
