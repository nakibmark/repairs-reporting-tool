import {
  Card,
  CardDescription,
  CardFooter,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getBrands } from '@/lib/data/brands';
import { getWarrantyTypes } from '@/lib/data/warrantyTypes';
import { getServiceLevelTypes } from '@/lib/data/serviceLevelTypes';
import DisplayRow from './display-row';

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
      <CardContent>
        <DisplayRow items={brands} label={'Brands'} />
        <DisplayRow items={warrantyTypes} label={'Warranty Types'} />
        <DisplayRow items={serviceLevelTypes} label={'Service Types'} />
      </CardContent>
      <CardFooter />
    </Card>
  );
}
