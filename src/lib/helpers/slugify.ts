import slugify from "slugify";

export default function slugIt(str: string): string {
  return slugify(str, { lower: true, strict: true, trim: true });
}
