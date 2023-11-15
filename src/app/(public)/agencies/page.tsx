"use client";
import React from "react";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapIcon } from "lucide-react";
const page = () => {
  const agencies = [
    {
      name: "Agadir",
      address: "N°26. Imm M1. Bd Mly Abdellah",
      phone: "05 22 40 71 77",
      fax: "05 28 82 66 60",
      coordinates: "30.4204724,-9.5969698",
    },
    {
      name: "Casablanca",
      address: "37 Rue Allal Ben Ahmed AMKIK",
      phone: "061 90 65 26",
      fax: "05 22 40 71 77",
      coordinates: "33.5924566,-7.5914091",
    },
    {
      name: "Marrakech",
      address: "183, Bd Mohammed V Appartement 17 5éme étage - Guéliz",
      phone: "05 24 42 01 17/43 47 15",
      fax: "05 24 43 47 15",
      coordinates: "31.63417332922665, -8.011461191571081",
    },
    {
      name: "Layyoune",
      address: "5, Im Fajoui Ang Rue A.louh Avenue de la Mecque. 2éme étage",
      phone: "05 28 99 55 60",
      fax: "05 28 82 63 58",
      coordinates: "27.1543249,-13.199581",
    },
    {
      name: "Béni Mellal",
      address: "2éme étage, N° 3 Lotissement AL KHANSSAA",
      phone: "05 23 48 58 40",
      fax: "05 23 48 58 40",
      coordinates: "32.34214547526083, -6.374500505040893",
    },
    {
      name: "Dakhla",
      address: "4, Avenue Cheikh Ben Ahmed Hay Massira 3",
      phone: "06 77 12 34 34",
      fax: "06 61 83 44 82",
      coordinates: "23.688001152629905, -15.93854563423155",
    },
  ];

  return (
    <div className="py-8 lg:py-20">
      <div className="container space-y-2">
        <h1 className="text-2xl font-bold lg:text-3xl xl:text-5xl">
          Our Agencies
        </h1>
      </div>

      <div className="object-cover py-24 bg-no-repeat">
        <div className="container">
          <Tabs
            defaultValue={agencies[0].name}
            className="w-full mx-auto lg:max-w-2xl"
          >
            <TabsList className="w-full overflow-x-auto">
              {agencies.map((agency) => (
                <TabsTrigger value={agency.name}>
                  <MapIcon className="w-4 h-4 mr-2 text-primary-background" />
                  {agency.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {agencies.map((agency) => (
              <TabsContent className="mt-12" value={agency.name}>
                <AgencyCard agency={agency} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default page;

const AgencyCard = ({
  agency,
}: {
  agency: {
    name: string;
    address: string;
    phone: string;
    fax: string;
    coordinates: string;
  };
}) => {
  return (
    <div className="p-4 space-y-4 border-2 border-dashed rounded-lg">
      <div className="overflow-hidden rounded-lg">
        <iframe
          src={`https://maps.google.com/maps?width=1000&height=1000&hl=en&q=${agency.coordinates}+(SOMACEP ${agency.name})&ie=UTF8&t=&z=19&iwloc=B&output=embed`}
          className="w-full aspect-video"
        />
      </div>
      <div className="py-4 border-t location-info">
        <h3 className="text-lg font-semibold font-heading">
          SOMACEP {agency.name}
        </h3>
        <p className="location-address">
          <b>Adresse : </b> {agency.address}
        </p>
        <p className="location-phone">
          <b>GSM : </b>
          <a
            className="font-medium transition-colors duration-200 hover:text-primary-background hover:underline"
            href={`tel:${agency.phone}`}
          >
            {agency.phone}
          </a>
        </p>
        <p className="location-phone">
          <b>Fax : </b>
          <a
            className="font-medium transition-colors duration-200 hover:text-primary-background hover:underline"
            href={`tel:${agency.fax}`}
          >
            {agency.fax}
          </a>
        </p>
      </div>
    </div>
  );
};
