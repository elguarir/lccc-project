import notFound from "@/app/not-found";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getUser } from "@/server/routers/user";
import { Facebook, Github, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  params: {
    username: string;
  };
};

const AuthorPage = async (props: Props) => {
  let { username } = props.params;
  let user = await getUser({ username });

  if (!user) {
    return notFound();
  }
  return (
    <main className="flex flex-col w-full py-12 lg:py-20">
      <div className="flex items-center justify-between py-8 ">
        <div className="flex gap-7">
          <Avatar className="w-24 h-24">
            <AvatarImage src={user.avatar_url ?? ""} />
            <AvatarFallback>
              {user.first_name[0]} {user.last_name[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">
              {user.first_name} {user.last_name}
            </h1>
            <p className="font-medium text-muted-foreground">
              @{user.username}
            </p>
          </div>
        </div>
        <div className="mt-auto">
          <div className="flex items-center h-full gap-3 text-muted-foreground">
            <Button asChild size={"icon"} variant={"outline"}>
              <Link href={`https://twitter.com/${user.profile?.twitter}`}>
                <Twitter size={24} />
              </Link>
            </Button>
            <Button asChild size={"icon"} variant={"outline"}>
              <Link href={`https://twitter.com/${user.profile?.instagram}`}>
                <Instagram size={24} />
              </Link>
            </Button>
            <Button asChild size={"icon"} variant={"outline"}>
              <Link href={`https://twitter.com/${user.profile?.github}`}>
                <Github size={24} />
              </Link>
            </Button>
            <Button asChild size={"icon"} variant={"outline"}>
              <Link href={`https://twitter.com/${user.profile?.facebook}`}>
                <Facebook size={24} />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid w-full grid-cols-12 py-16 gap-7">
        <div className="col-span-8"></div>

        <div className="col-span-4">
          <div className="flex flex-col gap-4 p-6 border rounded-lg shadow-sm bg-card text-card-foreground">
            <div className="grid gap-2">
              <h2 className="text-2xl font-bold">About me</h2>
              <p className="text-muted-foreground">{user.profile?.bio}</p>
            </div>
            <div className="grid gap-2">
              <h2 className="text-2xl font-bold">Website</h2>
              <Link
                href={user.profile?.website ?? ""}
                className="transition-colors text-muted-foreground hover:text-primary hover:underline decoration-primary"
              >
                {user.profile?.website}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthorPage;
