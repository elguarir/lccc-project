import { BlockRenderer } from "@/components/editor/BlockRenderer";
import { OutputData } from "@editorjs/editorjs";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

const ArticlePage = (props: Props) => {
  console.log(props.params.slug);

  let data: OutputData = {
    time: 1707439579409,
    blocks: [
      {
        id: "x3Ku21j32q",
        type: "paragraph",
        data: {
          text: "Next.js just released its latest version, 14.1. It’s packed with exciting features that significantly enhance the developer experience",
        },
      },
      {
        id: "czUCd-LODM",
        type: "image",
        data: {
          file: {
            url: "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*6z2it2S4nCl5OfVPdFhSxA.png",
          },
          caption: "https://nextjs.org/blog/next-14-1",
          withBorder: false,
          stretched: false,
          withBackground: false,
        },
      },
      {
        id: "ogj_mzTrbp",
        type: "paragraph",
        data: {
          text: "Next.js just released its latest version, 14.1.",
        },
      },
      {
        id: "zWBqIIRLgP",
        type: "paragraph",
        data: {
          text: "It’s packed with exciting features that significantly enhance the developer experience.",
        },
      },
      {
        id: "JbBqDm1xhh",
        type: "paragraph",
        data: {
          text: "&nbsp; This version focuses on several key areas: improved self-hosting, advancements in Turbopack, enhanced error messages, new capabilities for parallel and intercepted routes, and significant improvements in the&nbsp;<code>next/image</code>&nbsp;component.&nbsp;&nbsp;",
        },
      },
      {
        id: "2MdDSpHzCv",
        type: "header",
        data: {
          text: "Self-Hosting Made Easier",
          level: 2,
        },
      },
      {
        id: "KZOxeqw_jD",
        type: "paragraph",
        data: {
          text: "Next.js 14.1 offers clearer guidelines for self-hosting with a Node.js server, Docker container, or static export.",
        },
      },
      {
        id: "f8il9U2mmw",
        type: "paragraph",
        data: {
          text: 'The documentation overhaul provides extensive details on runtime&nbsp;<a href="https://nextjs.org/docs/app/building-your-application/deploying#environment-variables" target="_blank">environment variables</a>,&nbsp;<a href="https://nextjs.org/docs/app/building-your-application/deploying#caching-and-isr" target="_blank">custom cache configuration for Incremental Static Regeneration (ISR)</a>,&nbsp;<a href="https://nextjs.org/docs/app/building-your-application/deploying#image-optimization" target="_blank">image optimization</a>, and&nbsp;<a href="https://nextjs.org/docs/app/building-your-application/deploying#middleware" target="_blank">middleware</a>.',
        },
      },
      {
        id: "rQk-HEO3uP",
        type: "paragraph",
        data: {
          text: "A standout feature is the ability to provide custom cache handlers for ISR, crucial for consistency in container orchestration platforms like Kubernetes.",
        },
      },
      {
        id: "D761qilDrE",
        type: "paragraph",
        data: {
          text: 'You can now integrate&nbsp;<a href="https://github.com/vercel/next.js/tree/canary/examples/cache-handler-redis" target="_blank">external caching solutions</a>&nbsp;like Redis or Memcached easily.',
        },
      },
      {
        id: "Vrxb7TwfCB",
        type: "header",
        data: {
          text: "Turbopack: The Future of Development Performance",
          level: 4,
        },
      },
      {
        id: "E9QP-_k5fW",
        type: "paragraph",
        data: {
          text: "Turbopack continues to revolutionize local Next.js development with its focus on reliability, performance, and memory usage.",
        },
      },
      {
        id: "uvpZtb5eh9",
        type: "paragraph",
        data: {
          text: "Passing an impressive 94% of Next.js development tests, Turbopack is proving to be a reliable tool.",
        },
      },
      {
        id: "QNP3qC0q3Y",
        type: "paragraph",
        data: {
          text: "Notably, improvements have been observed in initial compile times and Fast Refresh speeds, with up to 76.7% faster local server startups and 96.3% faster code updates.",
        },
      },
    ],
    version: "2.28.2",
  };
  return (
    <main className="flex prose-base dark:prose-code:bg-gray-600/80 prose-code:bg-gray-200/80 prose-a:text-foreground prose-a:transition-colors hover:prose-a:text-primary prose-code:rounded-[2px] prose-code:px-px prose-code:py-px prose-code:font-mono  flex-col py-6 prose marker:text-muted-foreground text-foreground md:max-w-3xl md:mx-auto lg:py-12 prose-violet dark:prose-invert prose-p:!mt-0 prose-p:!mb-3">
      {data.blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </main>
  );
};

export default ArticlePage;
