import PageWrapper from "@/components/PageWrapper";
import { ProductsCountChart } from "@/components/ProductsCountChart";
import { SalesByDayChart } from "@/components/SalesByDayChart";

const page = () => {
  return (
    <PageWrapper className=" gap-10">
      <SalesByDayChart />
      <ProductsCountChart />
    </PageWrapper>
  );
};

export default page;
