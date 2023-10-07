"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useState } from "react";

type Props = {};

function ThemeSelector({}: Props) {
  const { setTheme, theme } = useTheme();
  const [placeholder, setPlaceHolder] = useState<string | undefined>(theme);

  return (
    <div className="relative flex justify-between cursor-default select-none items-center !rounded-[.375rem] text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 px-3 py-2 mt-1">
      Theme
      <Select
        onValueChange={(value) => {
          setTheme(value);
          setPlaceHolder(value);
        }}
      >
        <SelectTrigger className="w-24 h-6 px-2 text-xs rounded-sm">
          <div className="flex items-center gap-2">
            <Monitor className="w-3 h-3" />
            <SelectValue
              placeholder={capitalizeFirstLetter(placeholder ?? "")}
            />
          </div>
        </SelectTrigger>
        <SelectContent side="top" sideOffset={6} align="center">
          <SelectItem value="system" className="text-xs">
            System
          </SelectItem>
          <SelectItem value="light" className="text-xs">
            Light
          </SelectItem>
          <SelectItem value="dark" className="text-xs">
            Dark
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default ThemeSelector;

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
