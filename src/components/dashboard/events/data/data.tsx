import { Icons } from "@/assets/icons";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

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
];
