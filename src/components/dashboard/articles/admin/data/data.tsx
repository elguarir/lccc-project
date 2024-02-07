import { Icons } from "@/assets/icons";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  PaperPlaneIcon,
  Pencil1Icon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import { X } from "lucide-react";

interface Status {
  value: string;
  label: string;
  variant: "default" | "outline" | "success" | "warning";
  icon: any;
}

interface Approved {
  value: string;
  label: string;
  icon: any;
}

export const statuses: Status[] = [
  {
    value: "draft",
    label: "Draft",
    variant: "outline",
    icon: Icons.DraftIcon,
  },
  {
    value: "submitted",
    label: "Submitted",
    variant: "success",
    icon: PaperPlaneIcon,
  },
  {
    value: "revisions_requested",
    label: "Revisions Requested",
    variant: "warning",
    icon: ReloadIcon,
  },
  {
    value: "published",
    variant: "default",
    label: "Published",
    icon: CheckCircledIcon,
  },
];
export const approved: Approved[] = [
  {
    value: "true",
    label: "Approved",
    icon: Icons.check,
  },
  {
    value: "false",
    label: "Not Approved",
    icon: X,
  },
];
