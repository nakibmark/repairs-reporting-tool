import { db } from '../db';
import { reportItems, SelectReportItem } from '../schema';
import { getBrandId } from './brands';
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

export async function editReportItemById(id: string) {
  await db.update(reportItems).set({serviceLevelTypeId: 1}).where(eq(reportItems.id, id))
};

export async function deleteReportItemById(id: string) {
  await db.delete(reportItems).where(eq(reportItems.id, id));
};

export async function saveReportItemByItem(item: ReportItemWithNames){
  const brandId: number = await getBrandId(item.brand.name);
  await db.update(reportItems).set({
    serialNo: item.serialNo,
    article: item.article,
    brandId: brandId
  } ).where(eq(reportItems.id, item.id))
}
