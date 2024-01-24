import React from "react";

type Props = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

const layout = (props: Props) => {
  return (
    <>
      {props.children}
      {props.modal}
    </>
  );
};

export default layout;
