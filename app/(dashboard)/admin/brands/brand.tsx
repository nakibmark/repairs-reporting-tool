import { TableCell, TableRow } from '@/components/ui/table';
import { SelectBrand } from '@/lib/schema';

const Brand = ({ brand }: { brand: SelectBrand }) => {
  return (
    <TableRow>
      <TableCell>{brand.id}</TableCell>
      <TableCell>{brand.name}</TableCell>
    </TableRow>
  );
};

export default Brand;
