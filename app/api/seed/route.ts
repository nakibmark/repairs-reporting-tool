import { db } from '@/lib/db';
import { reset, seed } from 'drizzle-seed';
import * as schema from '@/lib/schema';

export const dynamic = 'force-dynamic';

export async function GET() {
  await reset(db, schema);
  await seed(db, schema).refine((f) => ({
    partners: {
      count: 200,
      columns: {
        partnerNo: f.string(),
        partnerName: f.companyName({
          isUnique: true
        }),
        emailAddress: f.email(),
        phoneNumber: f.phoneNumber(),
        city: f.city(),
        state: f.state(),
        country: f.country(),
        market: f.valuesFromArray({
          values: ['US', 'LATAM', 'MX']
        }),
        region: f.valuesFromArray({
          values: ['US', 'LATAM', 'MX']
        })
      }
    },
    users: {
      count: 5,
      columns: {
        emailAddress: f.email(),
        name: f.fullName(),
        role: f.default({
          defaultValue: 'admin'
        })
      }
    },
    reports: {
      count: 10,
      with: {
        reportItems: 20
      },
      columns: {
        isSubmitted: f.boolean(),
        reportYear: f.int({
          minValue: 2023,
          maxValue: 2050
        }),
        reportMonth: f.int({
          minValue: 1,
          maxValue: 12
        })
      }
    },
    reportItems: {
      columns: {
        repairNo: f.int({
          minValue: 100000,
          maxValue: 999999
        }),
        article: f.int({
          minValue: 100000,
          maxValue: 999999
        }),
        serialNo: f.string(),
        comments: f.loremIpsum({
          sentencesCount: 1
        })
      }
    },
    brands: {
      count: 4,
      columns: {
        name: f.valuesFromArray({
          values: [
            'Cartier',
            'Vacheron Constantin',
            'Panerai',
            'A. Lange and Sohne'
          ],
          isUnique: true
        })
      }
    },
    serviceLevelTypes: {
      count: 6,
      columns: {
        isActive: f.default({
          defaultValue: true
        }),
        name: f.valuesFromArray({
          values: [
            'Battery change',
            'Maintenance',
            'Repair',
            'Level 1',
            'Level 2',
            'Other'
          ]
        })
      }
    },
    warrantyTypes: {
      count: 3,
      columns: {
        isActive: f.default({
          defaultValue: true
        }),
        name: f.valuesFromArray({
          values: ['Sales Warranty', 'Service Warranty', 'Gift Warranty']
        })
      }
    },
    partnerBrands: {
      count: 0
    }
  }));
  return new Response('OK');
}
