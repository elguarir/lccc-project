import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  PaperPlaneIcon,
  Pencil1Icon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import { UserCircle } from "lucide-react";

interface Role {
  value: string;
  label: string;
  variant: "default" | "outline" | "secondary";
  icon: any;
}

export const roles: Role[] = [
  {
    value: "user",
    label: "Member",
    variant: "outline",
    icon: UserCircle,
  },
  {
    value: "admin",
    label: "Admin",
    variant: "secondary",
    icon: PaperPlaneIcon,
  },
];
