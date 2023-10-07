import React from "react";

type Props = {
  children: React.ReactNode;
};

const EditorLayout = ({children}: Props) => {
  return (
    <main className="relative flex w-full h-screen gap-10 mx-auto max-xl:flex-col">
      {children}
    </main>
  );
};

export default EditorLayout;
