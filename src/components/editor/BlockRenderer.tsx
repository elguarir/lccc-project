import { OutputData } from "@editorjs/editorjs";

export const BlockRenderer = ({
  block,
}: {
  block: OutputData["blocks"][0];
}) => {
  switch (block.type) {
    case "paragraph":
      return <p className="" dangerouslySetInnerHTML={{ __html: block.data.text }} />;
    case "image":
      return (
        <figure>
          <img
            src={block.data.file.url}
            className="rounded-md shadow"
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
        <table>
          <thead>
            <tr>
              {block.data.content[0].map((header: string, index: number) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.data.content.slice(1).map((row: string[], index: number) => (
              <tr key={index}>
                {row.map((cell: string, index: number) => (
                  <td key={index}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
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
        <ul>
          {block.data.items.map((item: string, index: number) => (
            <li key={index}>
              <input type="checkbox" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return <blockquote>{block.data.text}</blockquote>;
    case "delimiter":
      return <hr />;
    case "code":
      return <pre>{block.data.code}</pre>;
    case "embed":
      return <iframe src={block.data.embed} />;
    default:
      return null;
  }
};
