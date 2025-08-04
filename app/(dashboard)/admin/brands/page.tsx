import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getBrands } from '@/lib/data/brands';
import { getWarrantyTypes } from '@/lib/data/warrantyTypes';
import DisplayFlexBox from './display-flex-box';
import { getServiceLevelTypes } from '@/lib/data/serviceLevelTypes';

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
        <div className="flex flex-col space-y-8">
          <DisplayFlexBox items={brands} label={'Brands'} />
          <DisplayFlexBox items={warrantyTypes} label={'Warranty Types'} />
          <DisplayFlexBox
            items={serviceLevelTypes}
            label={'Service Level Types'}
          />
        </div>
      </CardContent>
      <CardFooter />
    </Card>
  );
}
