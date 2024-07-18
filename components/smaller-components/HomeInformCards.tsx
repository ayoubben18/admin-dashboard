import SmallInfoCard from "../mapping-components/SmallInfoCard";

const mappingCards = [
  {
    title: "Total Orders",
    description: "The total number of orders placed during the current period.",
    amount: "$ 452380",
  },
  {
    title: "Active Customers",
    description: "The number of active customers during the current period.",
    amount: "1234",
  },
  {
    title: "Conversion Rate",
    description: "The percentage of visitors who make a purchase.",
    amount: "3.6",
  },
];

const HomeInformCards = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {mappingCards.map((card, index) => (
        <SmallInfoCard key={index} {...card} />
      ))}
    </div>
  );
};

export default HomeInformCards;
