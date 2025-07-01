import { db } from '../db';
import { reportItems, SelectReportItem} from '../schema';
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

export const getReportItemsWithNames = async (reportId: number) => {
  const items = await db.query.reportItems.findMany({
    where: eq(reportItems.reportId, reportId),
    orderBy: (items, { asc }) => [asc(items.createdAt)],
    with: {
      brand: {
        columns: { id: true, name: true }
      },
      warrantyType: {
        columns: { id: true, name: true }
      },
      serviceLevelType: {
        columns: { id: true, name: true }
      }
    },
    columns: {
      brandId: false,
      warrantyTypeId: false,
      serviceLevelTypeId: false
    }
  });

  return { items };
};

export async function deleteReportItemById(id: string) {
  await db.delete(reportItems).where(eq(reportItems.id, id));
};

export async function updateReportItem(item: ReportItemWithNames) {
  await db.update(reportItems).set({
    serialNo: item.serialNo,
    article: item.article,
    brandId: item.brand.id,
    warrantyTypeId: item.warrantyType.id,
    serviceLevelTypeId: item.serviceLevelType.id,
    repairNo: item.repairNo,
    dateIn: item.dateIn,
    dateOut: item.dateOut
  }).where(eq(reportItems.id, item.id))
}

export async function createReportItem(item: ReportItemWithNames){
  await db.insert(reportItems).values({
    serialNo: item.serialNo,
    article: item.article,
    brandId: item.brand.id,
    warrantyTypeId: item.warrantyType.id,
    serviceLevelTypeId: item.serviceLevelType.id,
    repairNo: item.repairNo,
    dateIn: item.dateIn,
    dateOut: item.dateOut,
    reportId: item.reportId
  }
  );
}
