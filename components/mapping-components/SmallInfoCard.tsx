import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

type Props = {
  title: string;
  description: string;
  amount: string;
};

const SmallInfoCard = ({ title, description, amount }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">{amount}</div>
      </CardContent>
    </Card>
  );
};

export default SmallInfoCard;
