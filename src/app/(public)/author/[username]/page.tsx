import React from "react";

type Props = {
  params: {
    username: string;
  };
};

const AuthorPage = (props: Props) => {
  let { username } = props.params;

  return (
    <main className="flex flex-col w-full py-12 lg:py-20">
      <div className="flex flex-col pb-8 space-y-6">
        Author: <span className="font-bold">{username}</span>
      </div>
    </main>
  );
};

export default AuthorPage;
