import useAuthSession from "@/hooks/useAuthSession";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = async (props: Props) => {
    const session = await useAuthSession();
    if (!session) return redirect("/sign-in");
  return <>{props.children}</>;
};

export default Layout;
