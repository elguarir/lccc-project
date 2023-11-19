import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = async (props: Props) => {
  return <>{props.children}</>;
};

export default Layout;
