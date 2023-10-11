import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const ProjectEditPage = (props: Props) => {
  const { id } = props.params;
  return <div>ProjectEditPage</div>;
};

export default ProjectEditPage;
