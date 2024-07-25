import PageWrapper from "@/components/PageWrapper";
import UserSection from "@/components/smaller-components/UserSection";
import { getUser } from "@/db/data/users-data";
import { getUserDeliveriesService } from "@/db/service/delivery-service";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const page = async ({ params: { id } }: Props) => {
  const supabase = createClient();
  const data = await getUserDeliveriesService(id);

  if (!data || data.length === 0) return <h1>No data Found for this User</h1>;

  const user = await getUser(supabase, id);

  if (!user) return notFound();

  return (
    <PageWrapper className=" gap-10">
      <h1 className=" font-bold text-3xl text-left">{user.email}</h1>
      <UserSection data={data} />
    </PageWrapper>
  );
};

export default page;
