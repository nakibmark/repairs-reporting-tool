import { pgEnum, pgTable as table } from 'drizzle-orm/pg-core';
import * as t from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { timestamps } from './columns.helpers';

// --- Enums ---
export const userRoleEnum = pgEnum('user_role', ['admin', 'dealer']);

// --- Tables ---

// Partners Table: Information about the dealer/repairer entity
export const partners = table(
  'partners',
  {
    id: t.serial().primaryKey(),
    partnerNo: t.text().notNull().unique(), // Business identifier
    partnerName: t.text().notNull(),
    emailAddress: t.text().notNull().unique(),
    phoneNumber: t.text(),
    city: t.text(),
    state: t.text(),
    country: t.text(),
    market: t.text(),
    region: t.text(),
    inclusionGroup: t.text(),
    partnerType: t.text(),
    isActive: t.boolean().notNull().default(true), // Can the partner log in / be used?
    // Fields for magic link (passwordless) login
    magicLinkToken: t.text().unique(), // Store the unique token for passwordless login
    magicLinkTokenExpiresAt: t.timestamp({ withTimezone: true, mode: 'date' }), // Expiry for the token
    ...timestamps
  },
  (table) => [
    t.index('idx_partners_partner_no').on(table.partnerNo),
    t.index('idx_partners_magic_link_token').on(table.magicLinkToken)
  ]
);

// Users Table: Stores login credentials and links to Partners
export const users = table(
  'users',
  {
    id: t.serial().primaryKey(),
    emailAddress: t.text().notNull().unique(), // Primary identifier, often from SSO
    name: t.text(),
    role: userRoleEnum().notNull(), // Use the ENUM type
    locked: t.boolean().notNull().default(false),
    ssoProvider: t.text(), // e.g., 'google', 'okta', 'azuread'
    ssoId: t.text(), // Unique ID from the SSO provider
    ...timestamps
  },
  (table) => [
    // Ensure email is indexed for lookups
    t.index('idx_users_email').on(table.emailAddress),
    // Ensure combination of provider and ID is unique if supporting multiple SSO providers
    t.unique('users_sso_provider_id_unq').on(table.ssoProvider, table.ssoId)
  ]
);

// Brands Table: Lookup table for watch brands
export const brands = table(
  'brands',
  {
    id: t.smallserial().primaryKey(),
    name: t.text('name').notNull().unique()
  },
  (table) => [t.index('idx_brands_name').on(table.name)]
);

// PartnerBrands Join Table: Manages the Many-to-Many relationship
export const partnerBrands = table(
  'partner_brands',
  {
    partnerId: t
      .integer()
      .notNull()
      .references(() => partners.id, { onDelete: 'cascade' }),
    brandId: t
      .smallint()
      .notNull()
      .references(() => brands.id, { onDelete: 'cascade' })
  },
  (table) => [
    t.primaryKey({ columns: [table.partnerId, table.brandId] }),
    t.index('idx_partnerbrands_partner_id').on(table.partnerId),
    t.index('idx_partnerbrands_brand_id').on(table.brandId)
  ]
);

// Reports Table: Header information for monthly reports
export const reports = table(
  'reports',
  {
    id: t.serial().primaryKey(),
    partnerId: t
      .integer()
      .notNull()
      .references(() => partners.id, { onDelete: 'restrict' }),
    reportYear: t.integer().notNull(),
    reportMonth: t.integer().notNull(),
    isSubmitted: t.boolean().notNull().default(false),
    submittedAt: t.timestamp({
      withTimezone: true,
      mode: 'date'
    }),
    submissionPeriodClosesAt: t
      .timestamp({
        withTimezone: true,
        mode: 'date'
      })
      .notNull(),
    ...timestamps
  },
  (table) => [
    t
      .unique('reports_partner_period_unq')
      .on(table.partnerId, table.reportYear, table.reportMonth),
    t
      .index('idx_reports_submission_status')
      .on(table.isSubmitted, table.submittedAt),
    t.check(
      'report_month_valid',
      sql`${table.reportMonth} >= 1 AND ${table.reportMonth} <= 12`
    ),
    t.check(
      'report_year_valid',
      sql`${table.reportYear} >= 2023 AND ${table.reportYear} <= 2050`
    )
  ]
);

// Warranty Types Lookup Table
export const warrantyTypes = table(
  'warranty_types',
  {
    id: t.smallserial().primaryKey(),
    name: t.text().notNull().unique(),
    description: t.text(),
    isActive: t.boolean().notNull().default(true)
  },
  (table) => [t.index('idx_warranty_types_name').on(table.name)]
);

// Service Level Types Lookup Table
export const serviceLevelTypes = table(
  'service_level_types',
  {
    id: t.smallserial().primaryKey(),
    name: t.text().notNull().unique(),
    description: t.text(),
    isActive: t.boolean().notNull().default(true)
  },
  (table) => [t.index('idx_service_level_types_name').on(table.name)]
);

// ReportItems Table: Line items within each report
export const reportItems = table(
  'report_items',
  {
    id: t.uuid().primaryKey().defaultRandom(),
    reportId: t
      .integer()
      .notNull()
      .references(() => reports.id, { onDelete: 'cascade' }),
    dateIn: t.date({ mode: 'date' }).notNull(),
    dateOut: t.date({ mode: 'date' }),
    brandId: t
      .integer()
      .notNull()
      .references(() => brands.id, { onDelete: 'restrict' }),
    repairNo: t.text().notNull(),
    article: t.text(),
    warrantyTypeId: t
      .integer()
      .notNull()
      .references(() => warrantyTypes.id, { onDelete: 'restrict' }),
    serialNo: t.text(),
    serviceLevelTypeId: t
      .integer()
      .notNull()
      .references(() => serviceLevelTypes.id, { onDelete: 'restrict' }),
    comments: t.text(),
    ...timestamps
  },
  (table) => [
    t.index('idx_reportitems_report_id').on(table.reportId),
    t.index('idx_reportitems_serial_no').on(table.serialNo),
    t.index('idx_reportitems_brand_id').on(table.brandId),
    t.index('idx_reportitems_warranty_type_id').on(table.warrantyTypeId),
    t
      .index('idx_reportitems_service_level_type_id')
      .on(table.serviceLevelTypeId)
  ]
);

// --- Relations ---

export const partnersRelations = relations(partners, ({ many }) => ({
  partnerBrands: many(partnerBrands),
  reports: many(reports)
}));

export const brandsRelations = relations(brands, ({ many }) => ({
  partnerBrands: many(partnerBrands),
  reportItems: many(reportItems)
}));

export const partnerBrandsRelations = relations(partnerBrands, ({ one }) => ({
  partner: one(partners, {
    fields: [partnerBrands.partnerId],
    references: [partners.id]
  }),
  brand: one(brands, {
    fields: [partnerBrands.brandId],
    references: [brands.id]
  })
}));

export const reportsRelations = relations(reports, ({ one, many }) => ({
  partner: one(partners, {
    fields: [reports.partnerId],
    references: [partners.id]
  }),
  reportItems: many(reportItems)
}));

export const warrantyTypesRelations = relations(warrantyTypes, ({ many }) => ({
  reportItems: many(reportItems)
}));

export const serviceLevelTypesRelations = relations(
  serviceLevelTypes,
  ({ many }) => ({
    reportItems: many(reportItems)
  })
);

export const reportItemsRelations = relations(reportItems, ({ one }) => ({
  report: one(reports, {
    fields: [reportItems.reportId],
    references: [reports.id]
  }),
  brand: one(brands, {
    fields: [reportItems.brandId],
    references: [brands.id]
  }),
  warrantyType: one(warrantyTypes, {
    fields: [reportItems.warrantyTypeId],
    references: [warrantyTypes.id]
  }),
  serviceLevelType: one(serviceLevelTypes, {
    fields: [reportItems.serviceLevelTypeId],
    references: [serviceLevelTypes.id]
  })
}));

// --- Types ---

// Select types (for reading data)
export type SelectPartner = typeof partners.$inferSelect;
export type SelectUser = typeof users.$inferSelect;
export type SelectBrand = typeof brands.$inferSelect;
export type SelectPartnerBrand = typeof partnerBrands.$inferSelect;
export type SelectReport = typeof reports.$inferSelect;
export type SelectWarrantyType = typeof warrantyTypes.$inferSelect;
export type SelectServiceLevelType = typeof serviceLevelTypes.$inferSelect;
export type SelectReportItem = typeof reportItems.$inferSelect;

// Insert types (for writing data, often used with Zod for validation)
export const insertPartnerSchema = createInsertSchema(partners);
export const insertUserSchema = createInsertSchema(users);
export const insertBrandSchema = createInsertSchema(brands);
export const insertPartnerBrandSchema = createInsertSchema(partnerBrands);
export const insertReportSchema = createInsertSchema(reports);
export const insertWarrantyTypeSchema = createInsertSchema(warrantyTypes);
export const insertServiceLevelTypeSchema =
  createInsertSchema(serviceLevelTypes);
export const insertReportItemSchema = createInsertSchema(reportItems);

// You can also define basic insert types if not using Zod directly here
export type InsertPartner = typeof partners.$inferInsert;
export type InsertUser = typeof users.$inferInsert;
export type InsertBrand = typeof brands.$inferInsert;
export type InsertPartnerBrand = typeof partnerBrands.$inferInsert;
export type InsertReport = typeof reports.$inferInsert;
export type InsertWarrantyType = typeof warrantyTypes.$inferInsert;
export type InsertServiceLevelType = typeof serviceLevelTypes.$inferInsert;
export type InsertReportItem = typeof reportItems.$inferInsert;
