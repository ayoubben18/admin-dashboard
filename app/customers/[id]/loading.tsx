import PageWrapper from "@/components/PageWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <PageWrapper className=" gap-10">
      <Skeleton className=" h-10 w-56" />
      <div className=" w-full flex flex-col gap-4">
        {[1, 2, 3, 4].map((_, i) => (
          <Skeleton className=" h-60 w-full" key={i} />
        ))}
      </div>
    </PageWrapper>
  );
};

export default loading;
