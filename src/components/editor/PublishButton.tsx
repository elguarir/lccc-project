"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import DateWithTime from "./DateWithTime";
import { useEditorStore } from "@/store/EditorStore";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { trpc } from "@/server/client";
import { toast } from "sonner";

type Props = {
  disabled?: boolean;
};

const PublishButton = ({ disabled }: Props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("now");
  const [date, setDate] = useState<Date | null>(new Date());
  const article = useEditorStore((state) => state.article);
  const syncArticle = useEditorStore((state) => state.syncArticle);

  const { mutate: updatePost, isLoading } =
    trpc.article.changeStatus.useMutation();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (article?.publishedAt) {
      setDate(article.publishedAt);
    }
  }, [article]);

  if (article?.status === "DRAFT") {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button disabled={disabled} variant={"outline"}>
            {article?.status === "DRAFT" ? "Publish" : "Update"}
            <ChevronDown className="ml-2" size={16} />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="w-[370px] p-0 rounded-lg shadow-sm"
        >
          <div className="grid">
            <div className="px-5 py-3">
              <h3 className="text-xl font-[450]">
                Ready to publish this post?
              </h3>
            </div>
            <RadioGroup
              value={value}
              onValueChange={(v) => setValue(v)}
              className="grid gap-2 py-[1.2rem] px-5 border-t"
              defaultValue="now"
            >
              <div className="flex space-x-2">
                <div className="h-full">
                  <RadioGroupItem value="now" id="now" />
                </div>
                <Label
                  htmlFor="now"
                  className="flex flex-col justify-start flex-1"
                >
                  <span className="text-base font-medium">Set it live now</span>
                  <span className="text-xs tracking-wide text-muted-foreground">
                    Publish this post immediately
                  </span>
                </Label>
              </div>
              <div className="flex space-x-2">
                <div className="h-full">
                  <RadioGroupItem value="after" id="after" />
                </div>
                <Label
                  htmlFor="after"
                  className="flex flex-col justify-start w-full space-y-1 "
                >
                  <span className="text-base font-medium">
                    Schedule it for later
                  </span>
                  <div className="flex items-center w-full gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !date && "text-muted-foreground",
                          )}
                        >
                          {date ? (
                            format(new Date(date), "PPP 'at' h:mm a")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <div>
                          <DateWithTime
                            value={date || new Date()}
                            onChange={setDate}
                            disabled={(date: Date) =>
                              date < new Date() || date < new Date("1900-01-01")
                            }
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <span className="text-xs tracking-wide text-muted-foreground">
                    Set automatic future publish date
                  </span>
                </Label>
              </div>
            </RadioGroup>
            <div className="flex items-center justify-end w-full px-5 py-3 border-t">
              <Button
                size={"sm"}
                onClick={() => setOpen(false)}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                isLoading={isLoading}
                loadingText="Publishing..."
                onClick={() => {
                  if (value === "now") {
                    if (article) {
                      updatePost(
                        {
                          articleId: article.id,
                          status: "PUBLISHED",
                        },
                        {
                          onSuccess(data) {
                            syncArticle();
                            setOpen(false);
                            toast.success("Article published!");
                          },
                        },
                      );
                    }
                  } else {
                    if (article) {
                      updatePost(
                        {
                          articleId: article.id,
                          status: "SCHEDULED",
                          publishedAt: date!,
                        },
                        {
                          onSuccess(data) {
                            syncArticle();
                            setOpen(false);
                            toast.success(
                              "Article scheduled, will be published at " +
                                format(date!, "PPP 'at' h:mm a") +
                                " !",
                            );
                          },
                        },
                      );
                    }
                  }
                }}
                size={"sm"}
                className="ml-2 h-9"
              >
                {value === "now" ? "Publish" : "Schedule"}
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  } else if (
    article?.status === "PUBLISHED" ||
    article?.status === "SCHEDULED"
  ) {
    return (
      <AlertDialog open={modalOpen} onOpenChange={setModalOpen}>
        <AlertDialogTrigger asChild>
          <Button disabled={disabled} variant="ghost">
            Unpublish
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="outline-none rounded-lg max-sm:max-w-[96%]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl text-left">
              Are you sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base text-left">
              This will unpublish your article and make it unavailable to the
              public.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row items-center justify-end m-0 space-x-2">
            <AlertDialogCancel className="m-0">Cancel</AlertDialogCancel>
            <Button
              isLoading={isLoading}
              loadingText="Unpublishing..."
              onClick={async () => {
                if (article) {
                  updatePost(
                    {
                      articleId: article.id,
                      status: "DRAFT",
                    },
                    {
                      onSuccess(data) {
                        syncArticle();
                        setModalOpen(false);
                      },
                    },
                  );
                }
              }}
            >
              Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  } else return null;
};

export default PublishButton;
