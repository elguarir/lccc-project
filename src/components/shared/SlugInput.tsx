import { useEffect, useState } from "react";
import { FormControl } from "../ui/form";
import { Input } from "../ui/input";
import slugIt from "@/lib/helpers/slugify";
import { Icons } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { trpc } from "@/server/client";
import { Loader2 } from "lucide-react";

type SlugInputProps = {
  value?: string;
  onChange: (value: string) => void;
  checkSlug: (slug: string | undefined) => Promise<string | undefined>;
  title: string;
  rest: any;
  size?: "sm" | "default";
};

export const SlugInput = ({
  value,
  title,
  checkSlug,
  onChange,
  size = "sm",
  rest,
}: SlugInputProps) => {
  let [editMode, setEditMode] = useState(false);
  let [inputValue, setInputValue] = useState(value);
  let [isLoading, setIsLoading] = useState(false);

  return (
    <div className="relative flex items-center w-full gap-2">
      <>
        <div className="relative flex items-center w-full">
          <FormControl>
            <Input
              {...rest}
              onChange={async (e) => {
                setInputValue(e.target.value);
                onChange(e.target.value);
              }}
              value={inputValue}
              readOnly={editMode ? false : true}
              className={cn("pr-8", size === "sm" && "h-9")}
            />
          </FormControl>
          <button
            type="button"
            disabled={isLoading}
            onClick={async () => {
              if (editMode) {
                setIsLoading(true);
                let slug = slugIt(inputValue ?? "");
                let newSlug = await checkSlug(slug);
                setInputValue(newSlug);
                onChange(newSlug ?? "");
                setIsLoading(false);
              }
              setEditMode(!editMode);
            }}
            className={cn(
              "absolute disabled:opacity-50 inset-y-0 translate-y-2/3 h-fit right-2 outline-primary",
              size === "default" && "mt-0.5",
            )}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 transition-all duration-300 animate-spin hover:text-muted-foreground" />
            ) : editMode ? (
              <Icons.check
                className={cn(
                  "w-4 h-4 transition-all duration-300 hover:text-primary",
                  editMode ? "text-primary" : "text-muted-foreground",
                )}
              />
            ) : (
              <Icons.EditIcon className="w-4 h-4 transition-all duration-300 hover:text-muted-foreground" />
            )}
          </button>
        </div>
      </>
      <Button
        onClick={async () => {
          setIsLoading(true);
          let slug = slugIt(title ?? "");
          let newSlug = await checkSlug(slug);
          setInputValue(newSlug);
          onChange(newSlug ?? "");
          setIsLoading(false);
        }}
        disabled={editMode}
        type="button"
        size={size}
        variant={"outline"}
      >
        Generate
      </Button>
    </div>
  );
};
