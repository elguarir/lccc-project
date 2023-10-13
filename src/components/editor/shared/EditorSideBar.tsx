"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeftFromLine } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import ArticleDetailsForm from "../ArticleDetails";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
type Props = {
  skelaton?: boolean;
  children?: React.ReactNode;
};

const EditorSideBar = (props: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const sidebarVariants = {
    open: {
      width: 384,
      flex: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 120,
        duration: 0.2,
      },
    },
    collapsed: {
      width: 0,
      flex: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
    <motion.div className="relative hidden h-full min-h-screen gap-1 transition-all duration-300 translate-x-0 xl:flex ">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleCollapse}
            variant={"ghost"}
            size={"sm"}
            className="mt-1 text-muted-foreground"
          >
            <ArrowLeftFromLine
              className={cn(
                "w-5 transition-all ease-in-out duration-200 h-5",
                !isCollapsed ? "transform rotate-180" : "",
              )}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            <span className="text-sm">Article Details</span>
          </p>
        </TooltipContent>
      </Tooltip>
      <ScrollArea className="relative flex flex-col flex-1 h-full">
        <motion.div
          initial={false}
          className="relative flex-col hidden h-full min-w-0 overflow-hidden border-l border-r bg-muted/50 xl:flex"
          variants={sidebarVariants}
          animate={isCollapsed ? "collapsed" : "open"}
        >
          <Card className="flex flex-col min-h-screen flex-1 border-none rounded-none min-w-[384px] bg-inherit">
            {/* <DateTimePicker /> */}
            <CardHeader>
              <CardTitle>Article Details</CardTitle>
              <CardDescription>
                Fill in the details of your article.
              </CardDescription>
            </CardHeader>
            <CardContent>{props.children}</CardContent>
          </Card>
        </motion.div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </motion.div>
    </>
  );
};

export default EditorSideBar;
