import React from "react";
import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
} from "@udecode/plate-basic-marks";
import { useEditorReadOnly } from "@udecode/plate-common";

import { Icons } from "@/assets/icons";
import { CommentToolbarButton } from "@/components/ui/plate/comment-toolbar-button";
import { LinkToolbarButton } from "@/components/ui/plate/link-toolbar-button";

import { MarkToolbarButton } from "./mark-toolbar-button";
import { TurnIntoDropdownMenu } from "./turn-into-dropdown-menu";

export function FloatingToolbarButtons() {
  const readOnly = useEditorReadOnly();

  return (
    <>
      {!readOnly && (
        <>
          <TurnIntoDropdownMenu />

          <MarkToolbarButton nodeType={MARK_BOLD} tooltip="Bold (⌘+B)">
            <Icons.bold className="w-4 h-4" />
          </MarkToolbarButton>
          <MarkToolbarButton nodeType={MARK_ITALIC} tooltip="Italic (⌘+I)">
            <Icons.italic className="w-4 h-4" />
          </MarkToolbarButton>
          <MarkToolbarButton
            nodeType={MARK_UNDERLINE}
            tooltip="Underline (⌘+U)"
          >
            <Icons.underline className="w-4 h-4" />
          </MarkToolbarButton>
          <MarkToolbarButton
            nodeType={MARK_STRIKETHROUGH}
            tooltip="Strikethrough (⌘+⇧+M)"
          >
            <Icons.strikethrough className="w-4 h-4" />
          </MarkToolbarButton>
          <MarkToolbarButton nodeType={MARK_CODE} tooltip="Code (⌘+E)">
            <Icons.code className="w-4 h-4" />
          </MarkToolbarButton>

          <LinkToolbarButton />
        </>
      )}

      {/* <CommentToolbarButton /> */}

      {/* <MoreDropdownMenu /> */}
    </>
  );
}
