import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import BrandsTable from './brands-table';
import { getBrands } from '@/lib/data/brands';

export default async function BrandsPage() {
  const brands = await getBrands();
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <div>
            <CardTitle>Edit Brands</CardTitle>
            <CardDescription>
              Manage the items associated with this report.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <BrandsTable brands={brands} />
      </CardContent>
      <CardFooter />
    </Card>
  );
}
