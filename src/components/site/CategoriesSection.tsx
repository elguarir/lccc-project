import { getTopCategories } from "@/server/routers/article";
import Link from "next/link";
import React from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const CategoriesSection = async () => {
  let categories = await getTopCategories();
  return (
    <section className="flex flex-col gap-2 lg:gap-8 w-full my-20 mb-[800px]">
      <div className="relative w-full pl-3 text-left lg:pl-8">
        <svg
          width={22}
          height={30}
          className="absolute block -mt-8 w-fit -ml-7 text-slate-300 dark:text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.07 1.468c-.288-.134-.161-.496.199-1.005.115-.16.583-.483.693-.462.218.039.433.08.612.152.113.04 1.233 1.173 1.62 1.564.385.368.678.795.958 1.234l.841 1.337c.279.446.553.895.814 1.35.089.152.161.312.217.48l.051.17c.177.68.48 1.289.809 1.885l.242.439a.4.4 0 0 0 .179.173c.246.114 1.162 2.064 1.203 2.35.139.698.161 1.445.28 2.146l.028.118a.256.256 0 0 1-.017.196c-.148.296-.038.478.016.685.078.288.145.58.181.883.019.152-.036.331-.064.5-.028.156-.318.209-.367.18-.139-.081-.222.072-.327.133l-.08.043a.206.206 0 0 1-.037.013c-.045.004-1.215-1.096-1.449-1.349l-.032-.037-.77-1.069c-.43-.514-.737-1.116-.83-1.223-.088-.12-.091-.277-.116-.424-.01-.075-1.069-1.706-1.103-1.772-.151-.371-.426-.678-.377-1.151.01-.092-.039-.159-.078-.228-.34-.595-.563-1.25-.826-1.887-.134-.325-.333-.613-.494-.923-.03-.056-.028-.129-.044-.193l-.04-.159a.39.39 0 0 0-.032-.074c-.426-.706-.726-1.492-1.247-2.138-.112-.153-.366-1.07-.52-1.233-.079-.093.024-.652-.093-.704ZM.414 27.098c-.28.091-.397-.262-.414-.873-.006-.196.156-.74.244-.802.172-.117.342-.228.5-.3.098-.038 1.44.005 1.902-.03.446-.021.872.039 1.293.12.859.154 1.728.267 2.596.387.193.027.379.085.562.168.55.26 1.13.358 1.714.417l.386.037a.315.315 0 0 0 .21-.055c.199-.133 2.005.124 2.23.231.561.244 1.11.605 1.677.856.08.04.172.028.236.148.147.276.331.271.509.328.248.077.494.165.737.28.12.059.228.198.341.307.1.1.006.379-.037.407-.124.08-.048.23-.052.353a.583.583 0 0 1-.012.127c-.015.043-1.373.511-1.681.59l-.047.01-1.166.121c-.596.104-1.197.054-1.324.074-.13.013-.25-.07-.374-.124l-1.882-.043c-.352-.077-.728-.03-1.042-.341-.062-.06-.137-.061-.207-.069-.62-.073-1.214-.283-1.813-.465-.305-.092-.623-.129-.934-.196-.056-.012-.104-.059-.158-.086l-.132-.073a.27.27 0 0 0-.07-.023c-.74-.137-1.447-.433-2.202-.517-.175-.017-.911-.496-1.112-.512-.114-.008-.366-.487-.478-.451Z"
            fillRule="evenodd"
            fill="currentColor"
          />
        </svg>
        <div className="flex items-center justify-between w-full">
          <h2 className="text-[1.6rem] sm:text-3xl lg:text-4xl font-extrabold tracking-[-0.01em] font-heading">
            Trending topics
          </h2>
          {/* <Button
            asChild
            size={"sm"}
            variant={"secondary"}
            className="px-3 max-sm:h-9 sm:px-4"
          >
            <Link href="/articles">
              View All
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Link>
          </Button> */}
        </div>
      </div>
      
        <ScrollArea className="scroll-container">
          <div className="flex items-center lg:pl-3 gap-6 !pb-1">
            {categories.map((category) => (
              <div
                key={category.id}
                className="px-6 py-2 transition-colors rounded-lg min-w-fit hover:bg-neutral-400/20 bg-secondary hover:dark:bg-secondary/80"
              >
                <Link
                  className="font-medium"
                  href={`/category/${category.slug}`}
                >
                  {category.name}
                </Link>
              </div>
            ))}
          </div>
          <ScrollBar className="!h-1" orientation="horizontal" />
        </ScrollArea>
    </section>
  );
};

export default CategoriesSection;
