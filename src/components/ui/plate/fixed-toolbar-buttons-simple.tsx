"use client";
import React, { ReactNode } from "react";
import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
} from "@udecode/plate-basic-marks";
import { useEditorReadOnly } from "@udecode/plate-common";
import { MARK_BG_COLOR, MARK_COLOR } from "@udecode/plate-font";
import { ListStyleType } from "@udecode/plate-indent-list";
import { ELEMENT_IMAGE } from "@udecode/plate-media";

import { Icons, iconVariants } from "@/assets/icons";
import { AlignDropdownMenu } from "@/components/ui/plate/align-dropdown-menu";
import { ColorDropdownMenu } from "@/components/ui/plate/color-dropdown-menu";
import { EmojiDropdownMenu } from "@/components/ui/plate/emoji-dropdown-menu";
import { IndentListToolbarButton } from "@/components/ui/plate/indent-list-toolbar-button";
import { IndentToolbarButton } from "@/components/ui/plate/indent-toolbar-button";
import { LinkToolbarButton } from "@/components/ui/plate/link-toolbar-button";
import { MediaToolbarButton } from "@/components/ui/plate/media-toolbar-button";
import { MoreDropdownMenu } from "@/components/ui/plate/more-dropdown-menu";
import { OutdentToolbarButton } from "@/components/ui/plate/outdent-toolbar-button";
import { TableDropdownMenu } from "@/components/ui/plate/table-dropdown-menu";

import { InsertDropdownMenu } from "./insert-dropdown-menu";
import { MarkToolbarButton } from "./mark-toolbar-button";
import { ModeDropdownMenu } from "./mode-dropdown-menu";
import { ToolbarGroup } from "./toolbar";
import { TurnIntoDropdownMenu } from "./turn-into-dropdown-menu";
import { ScrollArea, ScrollBar } from "../scroll-area";
import { cn } from "@/lib/utils";

export function FixedToolbarButtons() {
  const readOnly = useEditorReadOnly();
  return (
    <div className="w-full overflow-hidden">
      <ScrollAreaWrapper readOnly={readOnly}>
        {!readOnly && (
          <>
            <ToolbarGroup noSeparator>
              <InsertDropdownMenu />
              <TurnIntoDropdownMenu />
            </ToolbarGroup>

            <ToolbarGroup>
              <MarkToolbarButton tooltip="Bold (⌘+B)" nodeType={MARK_BOLD}>
                <Icons.bold />
              </MarkToolbarButton>
              <MarkToolbarButton tooltip="Italic (⌘+I)" nodeType={MARK_ITALIC}>
                <Icons.italic />
              </MarkToolbarButton>
              <MarkToolbarButton
                tooltip="Underline (⌘+U)"
                nodeType={MARK_UNDERLINE}
              >
                <Icons.underline />
              </MarkToolbarButton>

              <MarkToolbarButton
                tooltip="Strikethrough (⌘+⇧+M)"
                nodeType={MARK_STRIKETHROUGH}
              >
                <Icons.strikethrough />
              </MarkToolbarButton>
              <MarkToolbarButton tooltip="Code (⌘+E)" nodeType={MARK_CODE}>
                <Icons.code />
              </MarkToolbarButton>
            </ToolbarGroup>

            <ToolbarGroup>
              <ColorDropdownMenu nodeType={MARK_COLOR} tooltip="Text Color">
                <Icons.color className={iconVariants({ variant: "toolbar" })} />
              </ColorDropdownMenu>
              <ColorDropdownMenu
                nodeType={MARK_BG_COLOR}
                tooltip="Highlight Color"
              >
                <Icons.bg className={iconVariants({ variant: "toolbar" })} />
              </ColorDropdownMenu>
            </ToolbarGroup>

            <ToolbarGroup>
              <AlignDropdownMenu />

              {/* <LineHeightDropdownMenu /> */}

              <IndentListToolbarButton nodeType={ListStyleType.Disc} />
              <IndentListToolbarButton nodeType={ListStyleType.Decimal} />

              <OutdentToolbarButton />
              <IndentToolbarButton />
            </ToolbarGroup>

            <ToolbarGroup>
              <LinkToolbarButton />

              <MediaToolbarButton nodeType={ELEMENT_IMAGE} />

              <EmojiDropdownMenu />
            </ToolbarGroup>
          </>
        )}

        <div className="grow" />
        <ToolbarGroup noSeparator>
          {/* <CommentToolbarButton /> */}
          <ModeDropdownMenu />
        </ToolbarGroup>
      </ScrollAreaWrapper>
    </div>
  );
}

const ScrollAreaWrapper = ({
  children,
  readOnly,
}: {
  children: ReactNode;
  readOnly: boolean;
}) => {
  return (
    <ScrollArea type="always" className="px-0 py-2 overflow-x-hidden">
      <div
        className={cn(
          "flex w-[calc(100vw-740px)] max-w-full",
          readOnly && "w-full",
        )}
      >
        {children}
      </div>
      <ScrollBar
        className={cn("h-2", readOnly && "hidden")}
        orientation="horizontal"
      />
    </ScrollArea>
  );
};
