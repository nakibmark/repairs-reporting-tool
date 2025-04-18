CREATE TYPE "public"."user_role" AS ENUM('admin', 'dealer');--> statement-breakpoint
CREATE TABLE "brands" (
	"id" "smallserial" PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	CONSTRAINT "brands_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "partner_brands" (
	"partnerId" integer NOT NULL,
	"brandName" varchar NOT NULL,
	CONSTRAINT "partner_brands_partnerId_brandName_pk" PRIMARY KEY("partnerId","brandName")
);
--> statement-breakpoint
CREATE TABLE "partners" (
	"id" serial PRIMARY KEY NOT NULL,
	"partnerNo" varchar(50) NOT NULL,
	"partnerName" varchar(255) NOT NULL,
	"city" varchar(100),
	"state" varchar(100),
	"country" varchar(100),
	"market" varchar(100),
	"region" varchar(100),
	"inclusionGroup" varchar(100),
	"partnerType" varchar(100),
	"numberWatchmakers" smallint,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "partners_partnerNo_unique" UNIQUE("partnerNo"),
	CONSTRAINT "partners_num_watchmakers_positive" CHECK ("partners"."numberWatchmakers" >= 0)
);
--> statement-breakpoint
CREATE TABLE "report_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"reportId" integer NOT NULL,
	"dateIn" date NOT NULL,
	"dateOut" date,
	"brandId" integer,
	"repairNo" varchar(100) NOT NULL,
	"article" varchar(100),
	"warrantyTypeId" integer NOT NULL,
	"serialNo" varchar(100),
	"serviceLevelTypeId" integer NOT NULL,
	"comments" text,
	"createdByUserId" integer NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reports" (
	"id" serial PRIMARY KEY NOT NULL,
	"partnerId" integer NOT NULL,
	"reportYear" integer NOT NULL,
	"reportMonth" integer NOT NULL,
	"isSubmitted" boolean DEFAULT false NOT NULL,
	"submittedAt" timestamp with time zone,
	"submissionPeriodClosesAt" timestamp with time zone NOT NULL,
	"createdByUserId" integer NOT NULL,
	"contactName" varchar(255),
	"contactEmail" varchar(255),
	"contactPhone" varchar(50),
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "reports_partner_period_unq" UNIQUE("partnerId","reportYear","reportMonth"),
	CONSTRAINT "report_month_valid" CHECK ("reports"."reportMonth" >= 1 AND "reports"."reportMonth" <= 12),
	CONSTRAINT "report_year_valid" CHECK ("reports"."reportYear" >= 2023 AND "reports"."reportYear" <= 2050)
);
--> statement-breakpoint
CREATE TABLE "service_level_types" (
	"id" "smallserial" PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"isActive" boolean DEFAULT true NOT NULL,
	CONSTRAINT "service_level_types_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"emailAddress" varchar(255) NOT NULL,
	"passwordHash" varchar(255) NOT NULL,
	"name" varchar(255),
	"phone" varchar(50),
	"role" "user_role" NOT NULL,
	"locked" boolean DEFAULT false NOT NULL,
	"partnerId" integer NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_emailAddress_unique" UNIQUE("emailAddress")
);
--> statement-breakpoint
CREATE TABLE "warranty_types" (
	"id" "smallserial" PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"isActive" boolean DEFAULT true NOT NULL,
	CONSTRAINT "warranty_types_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "partner_brands" ADD CONSTRAINT "partner_brands_partnerId_partners_id_fk" FOREIGN KEY ("partnerId") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "partner_brands" ADD CONSTRAINT "partner_brands_brandName_brands_name_fk" FOREIGN KEY ("brandName") REFERENCES "public"."brands"("name") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report_items" ADD CONSTRAINT "report_items_reportId_reports_id_fk" FOREIGN KEY ("reportId") REFERENCES "public"."reports"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report_items" ADD CONSTRAINT "report_items_brandId_brands_id_fk" FOREIGN KEY ("brandId") REFERENCES "public"."brands"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report_items" ADD CONSTRAINT "report_items_warrantyTypeId_warranty_types_id_fk" FOREIGN KEY ("warrantyTypeId") REFERENCES "public"."warranty_types"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report_items" ADD CONSTRAINT "report_items_serviceLevelTypeId_service_level_types_id_fk" FOREIGN KEY ("serviceLevelTypeId") REFERENCES "public"."service_level_types"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report_items" ADD CONSTRAINT "report_items_createdByUserId_users_id_fk" FOREIGN KEY ("createdByUserId") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reports" ADD CONSTRAINT "reports_partnerId_partners_id_fk" FOREIGN KEY ("partnerId") REFERENCES "public"."partners"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reports" ADD CONSTRAINT "reports_createdByUserId_users_id_fk" FOREIGN KEY ("createdByUserId") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_partnerId_partners_id_fk" FOREIGN KEY ("partnerId") REFERENCES "public"."partners"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_partnerbrands_partner_id" ON "partner_brands" USING btree ("partnerId");--> statement-breakpoint
CREATE INDEX "idx_partnerbrands_brand_id" ON "partner_brands" USING btree ("brandName");--> statement-breakpoint
CREATE INDEX "idx_partners_partner_no" ON "partners" USING btree ("partnerNo");--> statement-breakpoint
CREATE INDEX "idx_reportitems_report_id" ON "report_items" USING btree ("reportId");--> statement-breakpoint
CREATE INDEX "idx_reportitems_serial_no" ON "report_items" USING btree ("serialNo");--> statement-breakpoint
CREATE INDEX "idx_reportitems_brand_id" ON "report_items" USING btree ("brandId");--> statement-breakpoint
CREATE INDEX "idx_reportitems_created_by" ON "report_items" USING btree ("createdByUserId");--> statement-breakpoint
CREATE INDEX "idx_reportitems_warranty_type_id" ON "report_items" USING btree ("warrantyTypeId");--> statement-breakpoint
CREATE INDEX "idx_reportitems_service_level_type_id" ON "report_items" USING btree ("serviceLevelTypeId");--> statement-breakpoint
CREATE INDEX "idx_reports_partner_period" ON "reports" USING btree ("partnerId","reportYear","reportMonth");--> statement-breakpoint
CREATE INDEX "idx_reports_submission_status" ON "reports" USING btree ("isSubmitted","submittedAt");--> statement-breakpoint
CREATE INDEX "idx_reports_created_by" ON "reports" USING btree ("createdByUserId");--> statement-breakpoint
CREATE INDEX "idx_service_level_types_name" ON "service_level_types" USING btree ("name");--> statement-breakpoint
CREATE INDEX "idx_users_email_address" ON "users" USING btree ("emailAddress");--> statement-breakpoint
CREATE INDEX "idx_users_partner_id" ON "users" USING btree ("partnerId");--> statement-breakpoint
CREATE INDEX "idx_warranty_types_name" ON "warranty_types" USING btree ("name");