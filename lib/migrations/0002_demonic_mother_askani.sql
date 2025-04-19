ALTER TABLE "report_items" DROP CONSTRAINT "report_items_brandId_brands_id_fk";
--> statement-breakpoint
ALTER TABLE "report_items" ALTER COLUMN "brandId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "report_items" ADD CONSTRAINT "report_items_brandId_brands_id_fk" FOREIGN KEY ("brandId") REFERENCES "public"."brands"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_brands_name" ON "brands" USING btree ("name");