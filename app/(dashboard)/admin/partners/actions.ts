'use server';
import {
  insertPartner,
  updatePartnerStatusById,
  updatePartner,
  updatePartnerByPartnerNo,
  getAllActivePartners,
} from '@/lib/data/partners';
import { InsertPartner, SelectPartner } from '@/lib/schema';
import { revalidatePath } from 'next/cache';

export async function updatePartnerStatusAction(
  partnerId: number | undefined,
  isActive: boolean
) {
  if (partnerId) {
    await updatePartnerStatusById(partnerId, isActive);
    revalidatePath('/admin/partners/page', 'page');
  }
}

export async function updatePartnerAction(partner: SelectPartner) {
  await updatePartner(partner);
  revalidatePath('/admin/partners/page', 'page');
}

export async function createPartnerAction(partner: InsertPartner) {
  await insertPartner(partner);
  revalidatePath('/admin/partners/page', 'page');
}

// Types for diff analysis
export interface PartnerDiff {
  partnerNo: string;
  changes: {
    field: string;
    oldValue: string | null;
    newValue: string | null;
  }[];
}

export interface PartnerDiffAnalysis {
  created: InsertPartner[];
  deleted: SelectPartner[];
  modified: {
    partner: InsertPartner;
    existing: SelectPartner;
    diff: PartnerDiff;
  }[];
  unchanged: SelectPartner[];
}

// Analyze differences between CSV data and current database
export async function analyzeDifferencesAction(
  csvPartners: InsertPartner[]
): Promise<PartnerDiffAnalysis> {
  const currentPartners = await getAllActivePartners();

  // Create maps for efficient lookup
  const currentPartnersMap = new Map(
    currentPartners.map((p) => [p.partnerNo, p])
  );
  const csvPartnersMap = new Map(csvPartners.map((p) => [p.partnerNo, p]));

  const result: PartnerDiffAnalysis = {
    created: [],
    deleted: [],
    modified: [],
    unchanged: [],
  };

  // Find created and modified partners
  for (const csvPartner of csvPartners) {
    const existing = currentPartnersMap.get(csvPartner.partnerNo);

    if (!existing) {
      // Partner doesn't exist - it's new
      result.created.push(csvPartner);
    } else {
      // Partner exists - check for changes
      const changes = comparePartners(existing, csvPartner);

      if (changes.length > 0) {
        result.modified.push({
          partner: csvPartner,
          existing,
          diff: {
            partnerNo: csvPartner.partnerNo,
            changes,
          },
        });
      } else {
        result.unchanged.push(existing);
      }
    }
  }

  // Find deleted partners (in current DB but not in CSV)
  for (const currentPartner of currentPartners) {
    if (!csvPartnersMap.has(currentPartner.partnerNo)) {
      result.deleted.push(currentPartner);
    }
  }

  return result;
}

// Helper function to compare two partners and return differences
function comparePartners(existing: SelectPartner, csvPartner: InsertPartner) {
  const changes: {
    field: string;
    oldValue: string | null;
    newValue: string | null;
  }[] = [];

  const fieldsToCompare = [
    'partnerName',
    'emailAddress',
    'phoneNumber',
    'city',
    'state',
    'country',
    'market',
    'region',
    'inclusionGroup',
    'partnerType',
  ] as const;

  for (const field of fieldsToCompare) {
    const oldValue = existing[field];
    const newValue = csvPartner[field];

    // Normalize null/undefined/empty string values
    const normalizedOld = oldValue || null;
    const normalizedNew = newValue || null;

    if (normalizedOld !== normalizedNew) {
      changes.push({
        field,
        oldValue: normalizedOld,
        newValue: normalizedNew,
      });
    }
  }

  return changes;
}

// Apply the analyzed differences to the database
export async function applyDifferencesAction(analysis: PartnerDiffAnalysis) {
  try {
    const results = {
      created: 0,
      updated: 0,
      deleted: 0,
      errors: [] as string[],
    };

    // Create new partners
    for (const partner of analysis.created) {
      try {
        const insertResult = await insertPartner(partner);
        if (insertResult.length > 0) {
          results.created++;
        }
      } catch (error) {
        results.errors.push(
          `Error creating partner ${partner.partnerName}: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    }

    // Update modified partners
    for (const { partner } of analysis.modified) {
      try {
        await updatePartnerByPartnerNo(partner.partnerNo, partner);
        results.updated++;
      } catch (error) {
        results.errors.push(
          `Error updating partner ${partner.partnerName}: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    }

    // Delete partners not in CSV (mark as inactive)
    for (const partner of analysis.deleted) {
      try {
        await updatePartnerStatusById(partner.id, false);
        results.deleted++;
      } catch (error) {
        results.errors.push(
          `Error deleting partner ${partner.partnerName}: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    }

    revalidatePath('/admin/partners/page', 'page');
    return { success: true, results };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Unknown error occurred during import',
    };
  }
}
