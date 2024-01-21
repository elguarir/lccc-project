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
    icon: Pencil1Icon,
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

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
];
