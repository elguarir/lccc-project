import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const FaqSection = () => {
  return (
    <section className="py-28">
      <div className="container text-dark">
        <div className="grid w-full gap-8 lg:gap-20 lg:grid-cols-2">
          <div className="w-full overflow-hidden rounded-sm">
            <img src="/images/faqq.jpg" alt="" />
          </div>
          <div className="grid w-full gap-4 place-content-start">
            <div className="flex items-center w-full gap-2 text-xs font-semibold h-fit">
              <span className="w-[20px] h-[2.7px] rounded-sm bg-primary-background" />
              FAQ (FREQUENTLY ASKED QUESTIONS)
            </div>
            <h3 className="text-3xl lg:text-4xl max-w-prose text-dark-foreground font-[800]">
              We Help You Build On Your Past And The Future.
            </h3>
            <p className="my-4 font-[500] lg:[text-wrap:balance] text-base text-neutral-500">
              We understand that you may have questions about our services. Here
              are some common queries we receive along with brief answers to
              provide you with the information you need.
            </p>
            <div className="mt-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="faq-1">
                  <AccordionTrigger className="text-left" normal={true}>
                    What services does SOMACEP provide?
                  </AccordionTrigger>
                  <AccordionContent>
                    We specialize in a wide range of construction-related
                    services, including technical control, building inspection,
                    quality assurance, certification audits, and compliance
                    management.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-2">
                  <AccordionTrigger className="text-left" normal={true}>
                    What sets SOMACEP apart from other construction control
                    firms?
                  </AccordionTrigger>
                  <AccordionContent>
                    At SOMACEP, we distinguish ourselves through our unwavering
                    commitment to quality, personalized service, and technical
                    expertise. Our client-centric approach, attention to detail,
                    and dedication to meeting project requirements set us apart
                    as a trusted partner in the construction industry.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-3">
                  <AccordionTrigger className="text-left" normal={true}>
                    Can SOMACEP assist with specialized construction
                    requirements?
                  </AccordionTrigger>
                  <AccordionContent>
                    Absolutely. With our team’s diverse skill set and technical
                    knowledge, we are equipped to handle specialized
                    construction requirements across various sectors. Whether
                    it’s industrial facilities, electrical installations,
                    complex structures, or unique project specifications, we
                    have the expertise to deliver tailored solutions.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
