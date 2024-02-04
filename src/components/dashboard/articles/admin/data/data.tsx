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

interface Status {
  value: string;
  label: string;
  variant: "default" | "outline" | "success" | "warning";
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
