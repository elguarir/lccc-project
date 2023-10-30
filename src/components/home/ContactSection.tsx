import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

const ContactSection = () => {
  return (
    <section
      className="object-cover py-32 bg-no-repeat"
      style={{
        backgroundImage: "url('/images/tbg21.png')",
      }}
    >
      <div className="container max-md:px-4">
        <div className="w-full gap-6 mx-auto lg:px-5 text-neutral-600">
          <div className="grid w-full gap-3 p-6 mx-auto -mt-10 border rounded-md md:max-w-xl lg:p-12 lg:max-w-2xl bg-neutral-50">
            <div className="flex items-center gap-2 text-xs font-semibold whitespace-nowrap">
              <span className="w-[20px] h-[2.7px] rounded-sm bg-primary-background" />
              CONTACT US
            </div>
            <h2 className="text-3xl text-left lg:text-4xl font-[700] lg:font-[800] leading-8 lg:leading-10 [text-wrap:balance] ">
              Get a Consultation Today!
            </h2>
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
    </section>
  );
};

export default ContactSection;
