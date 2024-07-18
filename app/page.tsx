import PageWrapper from "@/components/PageWrapper";
import RecentOrdersTable from "@/components/RecentOrdersTable";
import HomeInformCards from "@/components/smaller-components/HomeInformCards";
import { getRecentOrders } from "@/db/data/delivery-data";

export default async function Home() {
  const orders = await getRecentOrders();
  return (
    <PageWrapper>
      <HomeInformCards />
      <div className="mt-6">
        <RecentOrdersTable orders={orders || []} />
      </div>
    </PageWrapper>
  );
}
