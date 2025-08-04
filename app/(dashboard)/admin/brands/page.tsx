import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getBrands } from '@/lib/data/brands';
import { getWarrantyTypes } from '@/lib/data/warrantyTypes';
import { getServiceLevelTypes } from '@/lib/data/serviceLevelTypes';
import BrandsContent from './brands-content';

export default async function BrandsPage() {
  const brands = await getBrands();
  const warrantyTypes = await getWarrantyTypes();
  const serviceLevelTypes = await getServiceLevelTypes();
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <div>
            <CardTitle>Edit Brands</CardTitle>
            <CardDescription>
              Manage the information associated with each brand.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <BrandsContent
        brands={brands}
        serviceLevelTypes={serviceLevelTypes}
        warrantyTypes={warrantyTypes}
      />
      <CardFooter />
    </Card>
  );
}
