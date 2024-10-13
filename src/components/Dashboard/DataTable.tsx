// DataTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type UserData = {
  id: number;
  name: string;
  email: string;
  role: string;
};


const DataTable = ({ data }: { data: UserData[] }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="font-semibold">Name</TableHead>
        <TableHead className="font-semibold">Email</TableHead>
        <TableHead className="font-semibold">Role</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.map((item) => (
        <TableRow key={item.id}>
          <TableCell className="font-medium">{item.name}</TableCell>
          <TableCell>{item.email}</TableCell>
          <TableCell>{item.role}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default DataTable;
