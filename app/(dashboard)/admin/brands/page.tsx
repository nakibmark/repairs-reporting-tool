import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default async function BrandsPage() {
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
      <CardContent />
      <CardFooter />
    </Card>
  );
}
