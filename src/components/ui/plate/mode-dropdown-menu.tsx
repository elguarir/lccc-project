import React from "react";
import { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import {
  focusEditor,
  useEditorReadOnly,
  useEditorState,
  usePlateStore,
} from "@udecode/plate-common";

import { Icons } from "@/assets/icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  useOpenState,
} from "./dropdown-menu";
import { ToolbarButton } from "./toolbar";
import { Button } from "../button";
import { ChevronDown } from "lucide-react";

export function ModeDropdownMenu(props: DropdownMenuProps) {
  const editor = useEditorState();
  const setReadOnly = usePlateStore().set.readOnly();
  const readOnly = useEditorReadOnly();
  const openState = useOpenState();

  let value = "editing";
  if (readOnly) value = "preview";

  const item: any = {
    editing: (
      <>
        <Icons.editing className="w-4 h-4 mr-2" />
        <span className="inline">Editing</span> {/*hidden lg:inline*/}
      </>
    ),
    preview: (
      <>
        <Icons.viewing className="w-4 h-4 mr-2" />
        <span className="inline">Preview</span>
      </>
    ),
  };

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <Button
          // pressed={openState.open}
          // tooltip="Editing mode"
          type="button"
          // isDropdown
          size={"sm"}
          variant={"ghost"}
          className="min-w-[auto]"
        >
          {item[value]}
          <ChevronDown className="w-4 h-4 ml-2 opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        <DropdownMenuRadioGroup
          className="flex flex-col gap-0.5"
          value={value}
          onValueChange={(newValue) => {
            if (newValue !== "preview") {
              setReadOnly(false);
            }

            if (newValue === "preview") {
              setReadOnly(true);
              return;
            }

            if (newValue === "editing") {
              focusEditor(editor);
              return;
            }
          }}
        >
          <DropdownMenuRadioItem value="editing">
            {item.editing}
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem value="preview">
            {item.preview}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
