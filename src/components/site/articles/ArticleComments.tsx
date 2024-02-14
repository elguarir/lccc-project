import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectValue,
  SelectTrigger,
  SelectItem,
} from "@/components/ui/select";
import React from "react";

type Props = {};

const ArticleComments = (props: Props) => {
  return (
    <section className="flex flex-col pb-10">
      <h4 className="text-2xl font-bold tracking-tight md:text-3xl">
        Member discussion
      </h4>
      <div className="py-5">
        <form>
          <fieldset className="flex flex-col w-full">
            <textarea
              className="flex min-h-[80px] hover:border-muted-foreground/25 transition-colors w-full rounded-md border-[2px] sm:border-2 border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="What are your thoughts?"
            />
            <div className="flex justify-end mt-3">
              <Button
                type="submit"
                size={"sm"}
                className="px-4 py-0 text-sm font-medium h-[33px]"
              >
                Reply
              </Button>
            </div>
          </fieldset>
        </form>
      </div>
      <div className="flex flex-col space-y-3">
        <div className="flex justify-start w-full">
          <Select defaultValue="newest">
            <SelectTrigger className="max-w-[128px] h-9">
            <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="most-liked">Most liked</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );
};

export default ArticleComments;
