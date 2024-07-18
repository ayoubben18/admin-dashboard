import { TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "./ui/skeleton";

type Props = {
  rowsPerPage: number;
};

const BigTableSkeleton = ({ rowsPerPage }: Props) => {
  return Array.from({ length: rowsPerPage }).map((_, index) => (
    <TableRow key={index} className=" w-full">
      <TableCell>
        <Skeleton className="w-16 h-10 rounded-md" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-18 h-10 rounded-md" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-18 h-10 rounded-md" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-18 h-10 rounded-md" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-10 h-10 rounded-md" />
      </TableCell>
    </TableRow>
  ));
};

export default BigTableSkeleton;
