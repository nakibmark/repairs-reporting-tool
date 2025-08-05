import {
  Card,
  CardDescription,
  CardFooter,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import PageNavigation from './pageNavigation';

const AdminPage = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <div>
            <CardTitle>Admin Home</CardTitle>
            <CardDescription>
              Navigate between pages used for admininstration
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <PageNavigation
            name="Partners"
            description="Manage the information associated with partners"
            link="/admin/partners"
          />
          <PageNavigation
            name="Brands"
            description="Manage the brands, warranty types and service types"
            link="/admin/brands"
          />
        </div>
      </CardContent>
      <CardFooter />
    </Card>
  );
};

export default AdminPage;
