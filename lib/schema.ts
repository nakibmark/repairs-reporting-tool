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
    partnerNo: t.varchar({ length: 50 }).notNull().unique(), // Business identifier
    partnerName: t.varchar({ length: 255 }).notNull(),
    city: t.varchar({ length: 100 }),
    state: t.varchar({ length: 100 }),
    country: t.varchar({ length: 100 }),
    market: t.varchar({ length: 100 }),
    region: t.varchar({ length: 100 }),
    inclusionGroup: t.varchar({ length: 100 }),
    partnerType: t.varchar({ length: 100 }),
    numberWatchmakers: t.smallint(),
    ...timestamps
  },
  (table) => [
    t.index('idx_partners_partner_no').on(table.partnerNo),
    t.check(
      'partners_num_watchmakers_positive',
      sql`${table.numberWatchmakers} >= 0`
    )
  ]
);

// Users Table: Stores login credentials and links to Partners
export const users = table(
  'users',
  {
    id: t.serial().primaryKey(),
    emailAddress: t.varchar({ length: 255 }).notNull().unique(),
    passwordHash: t.varchar({ length: 255 }).notNull(), // Store hashed passwords only!
    name: t.varchar({ length: 255 }),
    phone: t.varchar({ length: 50 }),
    role: userRoleEnum().notNull(), // Use the ENUM type
    locked: t.boolean().notNull().default(false),
    partnerId: t
      .integer()
      .notNull()
      .references(() => partners.id, { onDelete: 'restrict' }),
    ...timestamps
  },
  (table) => [
    t.index('idx_users_email_address').on(table.emailAddress),
    t.index('idx_users_partner_id').on(table.partnerId)
  ]
);

// Brands Table: Lookup table for watch brands
export const brands = table('brands', {
  id: t.smallserial().primaryKey(),
  name: t.varchar('name', { length: 100 }).notNull().unique()
});

// PartnerBrands Join Table: Manages the Many-to-Many relationship
export const partnerBrands = table(
  'partner_brands',
  {
    partnerId: t
      .integer()
      .notNull()
      .references(() => partners.id, { onDelete: 'cascade' }),
    brandName: t
      .varchar()
      .notNull()
      .references(() => brands.name, { onDelete: 'cascade' })
  },
  (table) => [
    t.primaryKey({ columns: [table.partnerId, table.brandName] }),
    t.index('idx_partnerbrands_partner_id').on(table.partnerId),
    t.index('idx_partnerbrands_brand_id').on(table.brandName)
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
    createdByUserId: t
      .integer()
      .notNull()
      .references(() => users.id, { onDelete: 'restrict' }),
    contactName: t.varchar({ length: 255 }),
    contactEmail: t.varchar({ length: 255 }),
    contactPhone: t.varchar({ length: 50 }),
    ...timestamps
  },
  (table) => [
    t
      .unique('reports_partner_period_unq')
      .on(table.partnerId, table.reportYear, table.reportMonth), // Explicit unique constraint name
    t
      .index('idx_reports_partner_period')
      .on(table.partnerId, table.reportYear, table.reportMonth),
    t
      .index('idx_reports_submission_status')
      .on(table.isSubmitted, table.submittedAt),
    t.index('idx_reports_created_by').on(table.createdByUserId),
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
    name: t.varchar({ length: 100 }).notNull().unique(),
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
    name: t.varchar({ length: 100 }).notNull().unique(),
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
    brandId: t.integer().references(() => brands.id),
    repairNo: t.varchar({ length: 100 }).notNull(),
    article: t.varchar({ length: 100 }),
    warrantyTypeId: t
      .integer()
      .notNull()
      .references(() => warrantyTypes.id, { onDelete: 'restrict' }),
    serialNo: t.varchar({ length: 100 }),
    serviceLevelTypeId: t
      .integer()
      .notNull()
      .references(() => serviceLevelTypes.id, { onDelete: 'restrict' }),
    comments: t.text(),
    createdByUserId: t
      .integer()
      .notNull()
      .references(() => users.id, { onDelete: 'restrict' }),
    ...timestamps
  },
  (table) => [
    t.index('idx_reportitems_report_id').on(table.reportId),
    t.index('idx_reportitems_serial_no').on(table.serialNo),
    t.index('idx_reportitems_brand_id').on(table.brandId),
    t.index('idx_reportitems_created_by').on(table.createdByUserId),
    t.index('idx_reportitems_warranty_type_id').on(table.warrantyTypeId),
    t
      .index('idx_reportitems_service_level_type_id')
      .on(table.serviceLevelTypeId)
  ]
);

// --- Relations ---

export const partnersRelations = relations(partners, ({ one, many }) => ({
  users: many(users),
  partnerBrands: many(partnerBrands),
  reports: many(reports)
}));

export const usersRelations = relations(users, ({ one, many }) => ({
  partner: one(partners, {
    fields: [users.partnerId],
    references: [partners.id]
  }),
  createdReports: many(reports, { relationName: 'CreatedByReports' }), // Explicit relation name needed if multiple relations point to the same table
  createdReportItems: many(reportItems, {
    relationName: 'CreatedByReportItems'
  })
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
    fields: [partnerBrands.brandName],
    references: [brands.id]
  })
}));

export const reportsRelations = relations(reports, ({ one, many }) => ({
  partner: one(partners, {
    fields: [reports.partnerId],
    references: [partners.id]
  }),
  createdByUser: one(users, {
    fields: [reports.createdByUserId],
    references: [users.id],
    relationName: 'CreatedByReports' // Match the relation name in usersRelations
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
  createdByUser: one(users, {
    fields: [reportItems.createdByUserId],
    references: [users.id],
    relationName: 'CreatedByReportItems' // Match the relation name in usersRelations
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
