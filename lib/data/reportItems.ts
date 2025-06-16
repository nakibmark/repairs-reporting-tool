import { db } from '../db';
import { reportItems, SelectReportItem } from '../schema';
import { eq } from 'drizzle-orm';

export type ReportItemWithNames = Awaited<
  ReturnType<typeof getReportItemsWithNames>
>['items'][number];

export const getReportItems = async (
  id: number
): Promise<{
  items: SelectReportItem[];
}> => ({
  items: await db.select().from(reportItems).where(eq(reportItems.reportId, id))
});

export const getReportItemsWithNames = async (id: number) => {
  const items = await db.query.reportItems.findMany({
    where: eq(reportItems.reportId, id), // Example filter
    orderBy: (items, { asc }) => [asc(items.createdAt)], // Example ordering
    with: {
      // Specify the relations you want to include
      brand: {
        columns: { name: true } // Only fetch the 'name' column from brands
      },
      warrantyType: {
        columns: { name: true } // Only fetch the 'name' column
      },
      serviceLevelType: {
        // Fetch name and description, for example
        columns: { name: true }
      }
    },
    // Optionally hide the original FK IDs from the result if desired
    columns: {
      brandId: false,
      warrantyTypeId: false,
      serviceLevelTypeId: false
    }
  });

  return { items };
};

export async function editReportItem({
  params
}: {
  params: Promise<number>;
}) {
  const id : number  = await params;
  const item = await db.select(reportItems.atricle).from(reportItems).where(eq(reportItems.id, id));
  console.log(item);
}
