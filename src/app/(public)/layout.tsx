import React from "react";

type Props = {
  children: React.ReactNode;
};

function PublicLayout({ children }: Props) {
  return (
    <div className="bg-neutral-50">
      <div className="w-full h-full min-h-screen">
        {children}
      </div>
    </div>
  );
}

export default PublicLayout;
