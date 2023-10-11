import React from "react";
import {
  EmojiDropdownMenuOptions,
  useEmojiDropdownMenuState,
} from "@udecode/plate-emoji";

import { Icons } from "@/assets/icons";
import { EmojiToolbarDropdown } from "@/components/ui/plate/emoji-toolbar-dropdown";
import {
  ToolbarButton,
  ToolbarButtonProps,
} from "@/components/ui/plate/toolbar";

import { emojiCategoryIcons, emojiSearchIcons } from "./emoji-icons";
import { EmojiPicker } from "./emoji-picker";
import { Button } from "../button";

type EmojiDropdownMenuProps = {
  options?: EmojiDropdownMenuOptions;
} & ToolbarButtonProps;

export function EmojiDropdownMenu({
  options,
  ...props
}: EmojiDropdownMenuProps) {
  const { isOpen, setIsOpen, emojiPickerState } =
    useEmojiDropdownMenuState(options);

  return (
    <EmojiToolbarDropdown
      control={
        <Button variant={"ghost"} size={"xs"} type="button" {...props}>
          <Icons.emoji />
        </Button>
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <EmojiPicker
        {...emojiPickerState}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        icons={{
          categories: emojiCategoryIcons,
          search: emojiSearchIcons,
        }}
        settings={options?.settings}
      />
    </EmojiToolbarDropdown>
  );
}
