"use client";

import React from "react";
import { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import {
  useColorDropdownMenu,
  useColorDropdownMenuState,
} from "@udecode/plate-font";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/plate/dropdown-menu";
import { ToolbarButton } from "@/components/ui/plate/toolbar";

import { DEFAULT_COLORS, DEFAULT_CUSTOM_COLORS } from "./color-constants";
import { ColorPicker } from "./color-picker";
import { Button } from "../button";

export type TColor = {
  name: string;
  value: string;
  isBrightColor: boolean;
};

type ColorDropdownMenuProps = {
  nodeType: string;
  tooltip?: string;
} & DropdownMenuProps;

export function ColorDropdownMenu({
  nodeType,
  tooltip,
  children,
}: ColorDropdownMenuProps) {
  const state = useColorDropdownMenuState({
    nodeType,
    colors: DEFAULT_COLORS,
    customColors: DEFAULT_CUSTOM_COLORS,
    closeOnSelect: true,
  });

  const { menuProps, buttonProps } = useColorDropdownMenu(state);

  return (
    <DropdownMenu modal={false} {...menuProps}>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"xs"} type="button" {...buttonProps}>
          {children}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        <ColorPicker
          color={state.selectedColor || state.color}
          colors={state.colors}
          customColors={state.customColors}
          updateColor={state.updateColorAndClose}
          updateCustomColor={state.updateColor}
          clearColor={state.clearColor}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
