'use client';

import { BrandsColumns } from './brands-columns';
import DataTable from '@/components/data-table';
import { SelectBrand } from '@/lib/schema';
import { ColumnDef } from '@tanstack/react-table';
import Brand from './brand';

const BrandsTable = ({ brands }: { brands: SelectBrand[] }) => {
  return (
    <DataTable
      columns={BrandsColumns as ColumnDef<SelectBrand>[]}
      data={brands}
      renderRow={(row) => <Brand key={row.id} brand={row} />}
    />
  );
};
export default BrandsTable;
