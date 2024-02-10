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
    time: 1707512543099,
    blocks: [
      {
        id: "0uMkRiNfvI",
        type: "paragraph",
        data: {
          text: `The best quotes contain messages that provide wisdom we can carry with us every day and inspire us to be our best selves. Let these words fill you with hope and give you the motivation to keep going, even when things are hard.<br>When life gets tough, it's easy to give up hope. These famous quotes are a reminder that life is beautiful and we should live it to the fullest.`,
        },
      },
      {
        id: "2NPtSXwZuY",
        type: "checklist",
        data: {
          items: [
            {
              text: "First thing to do",
              checked: false,
            },
            {
              text: "Second thing",
              checked: false,
            },
          ],
        },
      },
      {
        id: "bMC5TBS1gK",
        type: "delimiter",
        data: {},
      },
      {
        id: "HpYhwFzcoL",
        type: "table",
        data: {
          withHeadings: true,
          content: [
            ["", "React", "Next.js"],
            ["has SSR", "no", "yes"],
            ["has CSR", "yes", "yes"],
          ],
        },
      },
      {
        id: "ctCRrLTbMl",
        type: "attaches",
        data: {
          file: {
            url: "https://lccc-project.s3.amazonaws.com/78f04913-40eb-4955-b9ef-47ee04e0305a/Internship Presentation.pptx",
            name: "Internship Presentation.pdf",
            size: 3027467,
            extension: "sql",
          },
          title: "Internship presentation",
        },
      },
      {
        id: "eQJWNXk0lY",
        type: "attaches",
        data: {
          file: {
            url: "https://lccc-project.s3.amazonaws.com/d1c90517-9cf8-45d7-b0ff-a227efd066b9.e-services presentation.pptx",
            name: "e-services presentation.pptx",
            size: 1792998,
            extension: "pptx",
          },
          title: "e-services presentation.pptx",
        },
      },
      {
        id: "eo7Zbc6KNY",
        type: "quote",
        data: {
          text: "When you change your thoughts, remember to also change your world.",
          caption: "Norman Vincent Peale",
          alignment: "left",
        },
      },
      {
        id: "WxmnZeVo9d",
        type: "paragraph",
        data: {
          text: "Life quotes can turn around the feeling&nbsp; of being disconnected or need a positive note to help you through a particularly tough time, quotes about life can help put things into <i>perspective</i>.",
        },
      },
      {
        id: "FxgwZZnz5d",
        type: "paragraph",
        data: {
          text: "Life quotes can turn around the heaviest of days. Whether you’re feeling disconnected or need a positive note to help you through a particularly tough time, quotes about life can help put things into perspective.",
        },
      },
      {
        id: "jISrir7nVJ",
        type: "paragraph",
        data: {
          text: "Maybe you’re looking for motivation to get you through a tough work week, or you want to send friends words of encouragement to let them know you care. Quotes about life are perfect for these situations. Or perhaps you, yourself, will want to bookmark these words of wisdom to read at the start of your day to help set you up for success. If you’re more of an evening person, maybe reading some life quotes before bed will yield more pleasant dreams.&nbsp;",
        },
      },
      {
        id: "s5CXrg5J7d",
        type: "paragraph",
        data: {
          text: 'From trailblazing icons like&nbsp;<a href="https://www.prevention.com/life/g30392216/dolly-parton-facts/" target="_blank">Dolly Parton</a>&nbsp;and&nbsp;<a href="https://www.prevention.com/health/a43529833/oprah-winfrey-surprising-first-menopause-symptoms-never-had-a-hot-flash/" target="_blank">Oprah Winfrey</a>&nbsp;to actresses like&nbsp;<a href="https://www.prevention.com/beauty/style/a44076332/sofia-vergara-sofia-jeans-womens-crossover-neck-halter-midi-dress/" target="_blank">Sofia Vergara</a>&nbsp;and&nbsp;<a href="https://www.prevention.com/beauty/skin-care/a43988771/drew-barrymore-aloe-infusion-organic-aloe-vera-gel/" target="_blank">Drew Barrymore</a>, these amazing sayings offer a fresh look at life. Read on and make sure to share these with friends, family, or even a stranger to brighten their day. And if you’re looking for something specific, check out our&nbsp;<a href="https://www.prevention.com/life/a38847116/loneliness-quotes/" target="_blank">loneliness quotes</a>,&nbsp;<a href="https://www.prevention.com/life/a43541874/friendship-quotes/" target="_blank">friendship quotes</a>, and&nbsp;<a href="https://www.prevention.com/life/a42827694/self-love-quotes/" target="_blank">self-love quotes</a>.&nbsp;&nbsp;',
        },
      },
      {
        id: "A3YeVD-_Ky",
        type: "image",
        data: {
          file: {
            url: "https://res.cloudinary.com/dpkgcizt7/image/upload/v1707511134/a8z8vp8hikexkashnuub.jpg",
          },
          caption: "KLAUS VEDFELT//GETTY IMAGES",
          withBorder: false,
          stretched: false,
          withBackground: false,
        },
      },
      {
        id: "xTf8hW87Pk",
        type: "list",
        data: {
          style: "ordered",
          items: [
            "“Success is falling nine times and getting up 10.” —Jon Bon Jovi",
            "“Develop success from failures. Discouragement and failures are two of the surest stepping stones to success.” —Dale Carnegie",
            "“Start where you are. Use what you have. Do what you can.” —Arthur Ashe",
          ],
        },
      },
      {
        id: "MNIDCzwueK",
        type: "embed",
        data: {
          service: "youtube",
          source: "https://www.youtube.com/watch?v=DrCQeI3WqF0",
          embed: "https://www.youtube.com/embed/DrCQeI3WqF0",
          width: 580,
          height: 320,
          caption: "This a video embed",
        },
      },
    ],
    version: "2.28.2",
  };
  return (
    <main className="flex prose-base dark:prose-code:bg-gray-600/80 prose-code:bg-gray-200/80 prose-a:text-foreground prose-a:transition-colors hover:prose-a:text-primary prose-code:rounded-[2px] prose-code:px-px prose-code:py-px prose-code:font-mono prose-neutral flex-col py-6 prose marker:text-muted-foreground text-foreground md:max-w-3xl md:mx-auto lg:py-12 dark:prose-invert prose-p:!mt-0 prose-p:!mb-3">
      {data.blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </main>
  );
};

export default ArticlePage;
