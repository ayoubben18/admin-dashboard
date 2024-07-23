import { getAllAgregs } from "@/db/aggregations/delivery-aggregartion-service";
import SmallInfoCard from "../mapping-components/SmallInfoCard";

const HomeInformCards = async () => {
  const { salesAmount, usersCount, conventionRate } = await getAllAgregs();

  const mappingCards = [
    {
      title: "Total Orders",
      description:
        "The total number of orders placed during the current period.",
      amount: `$ ${salesAmount?.toLocaleString() || 0}`,
    },
    {
      title: "Active Customers",
      description: "The number of active customers during the current period.",
      amount: `${usersCount || 0}`,
    },
    {
      title: "Conversion Rate",
      description: "The percentage of visitors who make a purchase.",
      amount: `% ${conventionRate || 0}`,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {mappingCards.map((card, index) => (
        <SmallInfoCard key={index} {...card} />
      ))}
    </div>
  );
};

export default HomeInformCards;
