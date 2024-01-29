import { useState } from "react";
import { FormControl } from "../ui/form";
import { Input } from "../ui/input";
import slugIt from "@/lib/helpers/slugify";
import { Icons } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

type SlugInputProps = {
  value?: string;
  onChange: (value: string) => void;
  title: string;
  rest: any;
  size?: "sm" | "default";
};

export const SlugInput = ({
  value,
  title,
  onChange,
  size = "sm",
  rest,
}: SlugInputProps) => {
  let [editMode, setEditMode] = useState(false);
  let [inputValue, setInputValue] = useState(value);

  return (
    <div className="relative flex items-center w-full gap-2">
      <>
        <div className="relative flex items-center w-full">
          <FormControl>
            <Input
              {...rest}
              onChange={(e) => {
                setInputValue(e.target.value);
                onChange(e.target.value);
              }}
              value={inputValue}
              readOnly={editMode ? true:false}
              className={cn("pr-8", size === "sm" && "h-9")}
            />
          </FormControl>
          <button
            type="button"
            onClick={() => {
              if (editMode) {
                let slug = slugIt(inputValue ?? "");
                setInputValue(slug);
                onChange(slug);
              }
              setEditMode(!editMode);
            }}
            className={cn(
              "absolute inset-y-0 translate-y-2/3 h-fit right-2 outline-primary",
              size === "default" && "mt-0.5",
            )}
          >
            {editMode ? (
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
        onClick={() => {
          let slug = slugIt(title ?? "");
          setInputValue(slug);
          onChange(slug);
        }}
        type="button"
        size={size}
        variant={"outline"}
      >
        Generate
      </Button>
    </div>
  );
};
