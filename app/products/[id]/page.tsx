import PageWrapper from "@/components/PageWrapper";
import ProductDetailsSection from "@/components/ProductDetailsSection";
import ProductChartingSection from "@/components/smaller-components/ProductChartingSection";
import { Skeleton } from "@/components/ui/skeleton";
import { getProductService } from "@/db/service/product-service";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type Props = {
  params: {
    id: string;
  };
};

const page = async ({ params: { id } }: Props) => {
  const product = await getProductService(id);

  if (!product) return notFound();

  return (
    <PageWrapper>
      <ProductDetailsSection product={product} />
      <Suspense fallback={<Skeleton className="w-full h-96" />}>
        <ProductChartingSection productId={product.id} />
      </Suspense>
    </PageWrapper>
  );
};

export default page;
