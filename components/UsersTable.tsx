"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useQuery } from "@tanstack/react-query";
import { getAllUsersService } from "@/db/service/users-service";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const UsersTable = () => {
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsersService(),
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead className=" text-right">View</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data &&
          data.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.email}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="secondary"
                  onClick={() => router.push(`/customers/${user.id}`)}
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        {isLoading &&
          [...Array(5)].map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className=" h-6 w-40" />
              </TableCell>
              <TableCell className=" text-right">
                <Skeleton className=" h-10 w-16 ml-auto" />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
