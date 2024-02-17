import notFound from "@/app/not-found";
import { Icons } from "@/assets/icons";
import ProfileForm from "@/components/site/ProfileEdit";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TgetUserPublishedArticles,
  getUserPublishedArticles,
} from "@/server/routers/article";
import { getUser } from "@/server/routers/user";
import { auth } from "@clerk/nextjs";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { Facebook, Github, Globe, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import React, { cache } from "react";

type Props = {
  params: {
    username: string;
  };
};

const AuthorPage = async (props: Props) => {
  let { username } = props.params;
  let user = await getUser({ username });
  let { userId } = auth();

  if (!user) {
    return notFound();
  }

  let articles = await getArticles(username);
  return (
    <main className="flex flex-col w-full py-12 lg:py-20">
      <div className="flex flex-col items-center justify-between gap-6 py-8 xl:flex-row">
        <div className="flex flex-col max-sm:text-center max-sm:items-center gap-7 lg:flex-row">
          <Avatar className="w-28 h-28">
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

            {/* bio */}
            <p className="mt-4 text-muted-foreground max-w-prose">
              {user.profile?.bio}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between h-full gap-3">
          {userId === user.id && (
            <ProfileForm
              initialData={{
                bio: user.profile?.bio ?? undefined,
                twitter: user.profile?.twitter ?? undefined,
                facebook: user.profile?.facebook ?? undefined,
                instagram: user.profile?.instagram ?? undefined,
                github: user.profile?.github ?? undefined,
                website: user.profile?.website ?? undefined,
              }}
            />
          )}
          <div className="mt-auto">
            <div className="flex items-center h-full gap-3 text-muted-foreground">
              {user.profile?.website && (
                <Button asChild size={"icon"} variant={"outline"}>
                  <Link href={`${user.profile?.website}`}>
                    <Globe size={24} />
                  </Link>
                </Button>
              )}
              {user.profile?.twitter && (
                <Button asChild size={"icon"} variant={"outline"}>
                  <Link href={`https://twitter.com/${user.profile?.twitter}`}>
                    <Twitter size={24} />
                  </Link>
                </Button>
              )}
              {user.profile?.instagram && (
                <Button asChild size={"icon"} variant={"outline"}>
                  <Link
                    href={`https://instagram.com/${user.profile?.instagram}`}
                  >
                    <Instagram size={24} />
                  </Link>
                </Button>
              )}
              {user.profile?.github && (
                <Button asChild size={"icon"} variant={"outline"}>
                  <Link href={`https://github.com/${user.profile?.github}`}>
                    <Github size={24} />
                  </Link>
                </Button>
              )}
              {user.profile?.facebook && (
                <Button asChild size={"icon"} variant={"outline"}>
                  <Link href={`https://facebook.com/${user.profile?.facebook}`}>
                    <Facebook size={24} />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid w-full grid-cols-12 py-16 gap-7">
        <div className="grid gap-16 py-5 col-span-full xl:col-span-8">
          {articles.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
        <div className="col-span-full xl:col-span-4"></div>
      </div>
    </main>
  );
};

export default AuthorPage;

const ArticleCard = (article: TgetUserPublishedArticles[0]) => {
  return (
    <article className="flex flex-col w-full gap-6 md:flex-row md:items-center">
      <Link
        className="w-full transition-transform duration-300 ease-in-out rounded-md md:overflow-hidden md:w-2/5 aspect-video"
        href={`/articles/${article.slug}`}
      >
        <img
          src={article.main_image ?? ""}
          alt={article?.title ?? ""}
          className="object-cover w-full transition-transform duration-300 ease-in-out rounded-md aspect-video md:hover:scale-105"
        />
      </Link>

      <div className="flex flex-col w-full h-full md:w-3/5">
        <Badge variant={"outline"} className="w-fit">
          <Link className="" href={`/category/${article.category?.slug}`}>
            {article.category?.name}
          </Link>
        </Badge>
        <Link
          href={`/articles/${article.slug}`}
          className="mt-2 text-2xl font-bold heading-underline"
        >
          {article.title}
        </Link>
        <p className="mt-2 text-muted-foreground line-clamp-2">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-end mt-4 md:mt-auto">
          <Button asChild size={"sm"} variant={"outline"}>
            <Link href={`/articles/${article.slug}`}>
              Read more
              <ExternalLinkIcon className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
};

const getArticles = cache(async (username: string) => {
  return await getUserPublishedArticles({ username });
});
