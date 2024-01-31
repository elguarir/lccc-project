"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "../ui/button";
import { useState } from "react";
import useMediaQuery from "@/hooks/use-media-query";
import { Icons } from "@/assets/icons";
import { useRouter } from "next/navigation";
import { trpc } from "@/server/client";
import { toast } from "sonner";

type TConfirmDialogProps = {
  articleId: string;
  fireConfetti: () => void;
};

const ConfirmDialog: React.FC<TConfirmDialogProps> = ({
  articleId,
  fireConfetti,
}) => {
  const { isTablet, isDesktop } = useMediaQuery();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { mutate: submit, isLoading } =
    trpc.article.submitForApproval.useMutation();
  let utils = trpc.useUtils();
  if (isTablet || isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size={"sm"}>Submit for review</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Submit for review</DialogTitle>
            <DialogDescription className="pt-2">
              Here's what will happen when you submit your article for review:
              <br />
              <div className="pt-3">
                <ul className="grid w-full gap-y-1.5">
                  <li className="flex items-center gap-2">
                    <div className="flex items-center justify-center p-px rounded-full bg-primary">
                      <Icons.check className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-sm">
                      Once submitted, you will not be able to edit the article
                      until it is approved.
                    </span>
                  </li>

                  <li className="flex items-center gap-2">
                    <div className="flex items-center justify-center p-px rounded-full bg-primary">
                      <Icons.check className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-sm">
                      You will be notified when your article is approved.
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="flex items-center justify-center p-px rounded-full bg-primary">
                      <Icons.check className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-sm">
                      Once approved, your article will be published.
                    </span>
                  </li>
                </ul>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row justify-end gap-1 pt-3">
            <Button
              size={"sm"}
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              size={"sm"}
              isLoading={isLoading}
              loadingText="Submitting..."
              onClick={() => {
                submit(
                  {
                    id: articleId,
                  },
                  {
                    onSuccess: () => {
                      setOpen(false);
                      toast.success("Article submitted for review!", {
                        duration: 2000,
                        position: "bottom-left",
                      });
                      fireConfetti();
                      utils.article.getArticleById.invalidate({
                        id: articleId,
                      });
                      router.refresh();
                    },
                  },
                );
              }}
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size={"sm"}>Submit for review</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Submit for review</DrawerTitle>
          <DrawerDescription className="pt-2">
            Here's what will happen when you submit your article for review:
            <br />
            <div className="pt-3">
              <ul className="grid w-full gap-y-1.5">
                <li className="flex items-center gap-2">
                  <div className="flex items-center justify-center p-px rounded-full bg-primary">
                    <Icons.check className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-sm">
                    Once submitted, you will not be able to edit the article
                    until it is approved.
                  </span>
                </li>

                <li className="flex items-center gap-2">
                  <div className="flex items-center justify-center p-px rounded-full bg-primary">
                    <Icons.check className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-sm">
                    You will be notified when your article is approved.
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="flex items-center justify-center p-px rounded-full bg-primary">
                    <Icons.check className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-sm">
                    Once approved, your article will be published.
                  </span>
                </li>
              </ul>
            </div>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="flex flex-row items-center gap-2 pt-2">
          <DrawerClose asChild>
            <Button className="w-full" variant="outline">
              Cancel
            </Button>
          </DrawerClose>
          <Button
            className="w-full"
            isLoading={isLoading}
            loadingText="Submitting..."
            onClick={() => {
              submit(
                {
                  id: articleId,
                },
                {
                  onSuccess: () => {
                    setOpen(false);
                    toast.success("Article submitted for review!", {
                      duration: 2000,
                      position: "bottom-left",
                    });
                    fireConfetti();
                    utils.article.getArticleById.invalidate({
                      id: articleId,
                    });
                    router.refresh();
                  },
                },
              );
            }}
          >
            Submit
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ConfirmDialog;
