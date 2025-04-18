import { db } from '@/lib/db';
import { reset, seed } from 'drizzle-seed';
import * as schema from '@/lib/schema';

export const dynamic = 'force-dynamic';

export async function GET() {
  await reset(db, schema);
  await seed(db, schema).refine((f) => ({
    partners: {
      count: 2,
      columns: {
        name: f.companyName(),
        numberWatchmakers: f.int({
          minValue: 0,
          maxValue: 10
        })
      },
      with: {
        users: 2
      }
    },
    reports: {
      count: 5,
      with: {
        reportItems: 10
      },
      columns: {
        isSubmitted: f.default({
          defaultValue: false
        }),
        reportYear: f.year(),
        reportMonth: f.int({
          minValue: 1,
          maxValue: 12
        })
      }
    },
    brands: {
      count: 3,
      columns: {
        name: f.valuesFromArray({
          values: ['Cartier', 'Vacheron Constantin', 'Panerai'],
          isUnique: true
        })
      }
    },
    serviceLevelTypesTypes: {
      columns: {
        isActive: f.default({
          defaultValue: true
        })
      }
    },
    warrantyTypes: {
      columns: {
        isActive: f.default({
          defaultValue: true
        })
      }
    },
    partnerBrands: {
      count: 0
    }
  }));
  return new Response('OK');
}
