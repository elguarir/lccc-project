import MembersDetailsForm from "@/components/dashboard/members/MembersDetailsForm";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
type Props = {
  params: {
    id: string;
  };
};

const MemberEditPage = async (props: Props) => {
  const { id } = props.params;

  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  console.log(user);
  if (!user) redirect("/dashboard/members");
  return (
    <div className="flex flex-col md:container">
      <Button
        asChild
        variant={"ghost"}
        className="self-start -ml-2 text-xs md:-ml-4 w-fit"
        size={"sm"}
      >
        <Link href={"/dashboard/members"}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
      </Button>
      <div className="w-full py-4 border-b border-transparent">
        <header className="relative grid w-full">
          <h2 className="text-2xl font-[550] md:font-bold font-display">
            Edit Member Details
          </h2>
          <p className="mt-1 text-sm font-medium xl:mt-2 text-muted-foreground">
            Edit member details and click save to update.
          </p>
        </header>
      </div>
      <main className="py-4">
        <MembersDetailsForm user={user} />
      </main>
    </div>
  );
};

export default MemberEditPage;
