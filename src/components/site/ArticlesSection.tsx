import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
const ArticlesSection = () => {
  let dummyArticles: ArticleCardProps[] = [
    {
      title: "Concept Art & Illustrations by Stef Euphoria",
      slug: "concept-art-illustrations-by-stef-euphoria",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
      image: "https://preview.cruip.com/creative/images/blog-01.jpg",
      date: "2021-10-01",
      author: {
        avatar: "https://preview.cruip.com/creative/images/blog-author-01.jpg",
        name: "Stef Euphoria",
        username: "stef-euphoria",
      },
    },

    {
      title: "Patrick Chen's Branding by Thought & Found Studio",
      slug: "patrick-chens-branding-by-thought-and-found-studio",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
      image: "https://preview.cruip.com/creative/images/blog-02.jpg",
      date: "2021-10-01",
      author: {
        avatar: "https://preview.cruip.com/creative/images/blog-author-02.jpg",
        name: "Samuel Regan",
        username: "samuel-regan",
      },
    },

    {
      title: "Soma Brewing Branding & Packaging by Quim Martin",
      slug: "patrick-chens-branding-by-thought-and-found-studio",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
      image: "https://preview.cruip.com/creative/images/blog-03.jpg",
      date: "2021-10-01",
      author: {
        avatar: "https://preview.cruip.com/creative/images/blog-author-03.jpg",
        name: "Fabian Centero",
        username: "fabian-centero",
      },
    },
  ];
  return (
    <section className="flex flex-col gap-10 lg:gap-8 w-full py-6 mb-[800px]">
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
        <h2 className="text-4xl w-full font-extrabold tracking-[-0.01em] font-heading">
          Latest Articles
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {dummyArticles.map((article, index) => (
          <ArticleCard key={index}  {...article} />
        ))}
      </div>
    </section>
  );
};

export default ArticlesSection;

type ArticleCardProps = {
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  date: string;
  skeleton?: boolean;
};

let ArticleCard = (props: ArticleCardProps) => {
  if (props.skeleton)
    return (
      <article className="flex flex-col h-full gap-y-3.5">
        {/* article cover image */}
        <div className="block overflow-hidden rounded-sm">
          <Skeleton className="border border-input/80 object-cover duration-1500 w-full aspect-[7/4] max-w-full h-auto" />
        </div>
        {/* content */}
        <div className="flex flex-col flex-grow space-y-1.5">
          <header>
            <div className="flex flex-col gap-y-1">
              <Skeleton className="border border-input/80 w-5/6 duration-1600 h-3.5" />
              <Skeleton className="w-2/4 h-3 border border-input/80 duration-1800" />
            </div>
          </header>
          <div className="flex flex-col pt-4 space-y-1">
            <Skeleton className="border border-input/80 w-11/12 h-2.5 duration-2000" />
            <Skeleton className="w-4/6 h-2 border border-input/80 duration-2200" />
          </div>
          <footer className="flex items-center !mt-4 text-sm">
            <Skeleton className="w-8 h-8 border rounded-full border-input/80 duration-2400" />
            <div className="ml-2">
              <Skeleton className="h-4 border border-input/80 w-36 duration-2400" />
            </div>
          </footer>
        </div>
      </article>
    );
  return (
    <article className="flex flex-col h-full gap-y-3.5">
      {/* article cover image */}
      <Link
        className="block overflow-hidden rounded-sm"
        href={`/articles/${props.slug}`}
      >
        <img
          src={props.image}
          alt={props.title}
          className="object-cover w-full aspect-[7/4] hover:scale-110 max-w-full h-auto duration-300 transition-all"
        />
      </Link>
      {/* content */}
      <div className="flex flex-col flex-grow space-y-1.5">
        <header>
          <Link
            href={`/articles/${props.slug}`}
            className="text-2xl text-balance leading-[1.315] tracking-[-0.01em] font-[750] font-heading inline-block heading-underline"
          >
            {props.title}
          </Link>
        </header>
        <p className="text-base text-balance text-muted-foreground font-[400] line-clamp-3">
          {props.excerpt}
        </p>
        <footer className="flex items-center mt-4 text-sm">
          <Link href={`/author/${props.author.username}`}>
            <img
              src={props.author.avatar}
              alt={props.author.name}
              className="w-8 h-8 rounded-full"
            />
          </Link>
          <div className="ml-2">
            <span>By</span>
            <Link
              className="ml-1 font-medium heading-underline"
              href={`/author/${props.author.username}`}
            >
              {props.author.name}
            </Link>
          </div>
        </footer>
      </div>
    </article>
  );
};
