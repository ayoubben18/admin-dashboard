import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const page = ({ params: { id } }: Props) => {
  console.log(id);

  return <div>page</div>;
};

export default page;
