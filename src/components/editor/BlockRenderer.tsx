import { OutputData } from "@editorjs/editorjs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import parse from "html-react-parser";
import sanitizeHtml from "sanitize-html";
import { FileIcon, defaultStyles } from "react-file-icon";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Icons } from "@/assets/icons";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import CopyButton from "./CopyButton";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { ArrowUpRight } from "lucide-react";

export const BlockRenderer = ({
  block,
}: {
  block: OutputData["blocks"][0];
}) => {
  switch (block.type) {
    case "paragraph":
      return (
        <p>
          {parse(sanitizeHtml(block.data.text), {
            replace: (domNode) => {
              if (domNode.type === "tag" && domNode.name === "script") {
                return <></>;
              }
            },
          })}
        </p>
      );
    case "image":
      return (
        <figure>
          <img
            src={block.data.file.url}
            className="mx-auto rounded-md shadow"
            alt={block.data.caption}
          />
          <figcaption className="italic font-[450] text-center text-muted-foreground">
            {block.data.caption}
          </figcaption>
        </figure>
      );
    case "header":
      const HeaderTag = `h${block.data.level}` as keyof JSX.IntrinsicElements;
      return <HeaderTag>{block.data.text}</HeaderTag>;
    case "table":
      return (
        <div className="border-2 my-6 !rounded-lg min-w-0">
          <Table className="!my-0 w-full min-w-0">
            <TableHeader>
              <TableRow>
                {block.data.content[0].map((header: string, index: number) => (
                  <TableHead className="py-1" key={index}>
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {block.data.content
                .slice(1)
                .map((row: string[], index: number) => (
                  <TableRow className="border-border" key={index}>
                    {row.map((cell: string, index: number) => (
                      <TableCell className="font-[450]" key={index}>
                        {cell}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      );
    case "list":
      if (block.data.style === "ordered") {
        return (
          <ol>
            {block.data.items.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        );
      }
      return (
        <ul>
          {block.data.items.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    case "checklist":
      return (
        <div className="flex flex-col pl-4">
          {block.data.items.map(
            (item: { text: string; checked: boolean }, index: number) => (
              <label
                className="flex items-center gap-2 font-medium"
                key={index}
              >
                <Checkbox />
                {item.text}
              </label>
            ),
          )}
        </div>
      );
    case "quote":
      return (
        <figure>
          <blockquote cite="https://developer.mozilla.org/samples/html/figure.html">
            {block.data.text}
            <figcaption className="mt-0 font-serif font-medium">
              {block.data.caption}
            </figcaption>
          </blockquote>
        </figure>
      );
    case "delimiter":
      return <hr />;
    case "code":
      return (
        <div className="relative py-4 font-mono">
          <SyntaxHighlighter
            customStyle={{
              fontSize: "1rem",
            }}
            language={block.data.mode}
            style={oneDark}
          >
            {block.data.code}
          </SyntaxHighlighter>
          <CopyButton text={block.data.code} />
        </div>
      );
    case "embed":
      return (
        <iframe
          className="w-full my-4 rounded-md shadow aspect-video"
          src={block.data.embed}
        />
      );
    case "linkTool":
      return (
        <div className="my-6">
          <Card className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 p-5 sm:h-[11.8rem]">
            <img
              src={block.data.meta.image.url}
              alt={block.data.meta.title}
              className="h-full my-0 border rounded-sm aspect-video"
            />
            <div className="flex flex-col justify-start h-full max-sm:space-y-0.5">
              <div className="text-lg font-medium line-clamp-2 max-sm:leading-tight">{block.data.meta.title}</div>
              <div className="text-sm text-muted-foreground line-clamp-3 sm:line-clamp-2">
                {block.data.meta.description}
              </div>
              <div className="flex justify-end w-full mt-auto max-sm:!mt-4">
                <Button
                  asChild
                  size={"sm"}
                  variant={"secondary"}
                  className="no-underline hover:no-underline"
                >
                  <a href={block.data.link} target="_blank">
                    Read More
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      );
    case "attaches":
      return (
        <Card className="flex items-center justify-between gap-2 px-4 mb-2 h-14">
          <div className="inline-flex items-center gap-2 h-fit">
            <div className="w-5 h-5">
              <FileIcon
                extension={block.data.file.extension}
                {...defaultStyles}
              />
            </div>
            <div className="!mb-0 text-sm font-medium">{block.data.title}</div>
          </div>
          <div>
            <Button
              asChild
              variant={"outline"}
              size={"icon"}
              className="w-8 h-8"
            >
              <a
                href={block.data.file.url}
                target="_blank"
                className="hover:!bg-accent hover:!text-accent-foreground"
              >
                <Icons.downloadIcon className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </Card>
      );
    default:
      return null;
  }
};
