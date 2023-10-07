import AuthLayout from "@/components/auth/AuthLayout";
import useAuthSession from "@/hooks/useAuthSession";
import { redirect } from "next/navigation";
type Props = {
  children: React.ReactNode;
};

export default async function layout({ children }: Props) {
  const session = await useAuthSession();
  if (session) return redirect("/dashboard");
  return <AuthLayout>{children}</AuthLayout>;
}
