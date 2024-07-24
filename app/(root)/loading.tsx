import PageWrapper from "@/components/PageWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <PageWrapper className=" gap-8 mx-auto">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3].map((_, i) => (
          <Skeleton key={i} className=" h-44 w-80" />
        ))}
      </div>
      <Skeleton className="h-96 w-full" />
    </PageWrapper>
  );
};

export default loading;
