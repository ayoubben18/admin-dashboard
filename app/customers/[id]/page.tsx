import PageWrapper from "@/components/PageWrapper";
import UserSection from "@/components/smaller-components/UserSection";
import { getUserDeliveriesService } from "@/db/service/delivery-service";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const page = async ({ params: { id } }: Props) => {
  const data = await getUserDeliveriesService(id);

  if (!data || data.length === 0) return <h1>No data Found for this User</h1>;

  console.log();
  data;

  return (
    <PageWrapper className=" gap-10">
      <h1 className=" font-bold text-3xl text-left">{data[0].email}</h1>
      <UserSection data={data} />
    </PageWrapper>
  );
};

export default page;
