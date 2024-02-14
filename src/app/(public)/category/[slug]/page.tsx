import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

const CategoryPage = (props: Props) => {
  let { slug } = props.params;
  return (
    <main className="flex flex-col w-full py-12 lg:py-20">
      <div className="flex flex-col pb-8 space-y-6">
        Cateogry slug: <span className="font-bold">{slug}</span>
      </div>
    </main>
  );
};

export default CategoryPage;
