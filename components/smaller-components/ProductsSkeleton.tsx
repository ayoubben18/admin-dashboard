import { TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "../ui/skeleton";

type Props = {
  rowsPerPage: number;
};

const ProductsSkeleton = ({ rowsPerPage }: Props) => {
  return Array.from({ length: rowsPerPage }).map((_, index) => (
    <TableRow key={index}>
      <TableCell>
        <Skeleton className="h-[100px] w-[100px] rounded-md" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[100px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[200px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[50px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[30px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-8 w-8 rounded" />
      </TableCell>
    </TableRow>
  ));
};

export default ProductsSkeleton;
