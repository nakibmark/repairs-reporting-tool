-- 1) Stamp submitted_at when is_submitted flips true
CREATE OR REPLACE FUNCTION set_submitted_at()
RETURNS TRIGGER AS $$
BEGIN
  IF (NEW."is_submitted" = TRUE
      AND (TG_OP = 'INSERT' OR OLD."is_submitted" = FALSE))
  THEN
    NEW."submitted_at" := NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS reports_set_submitted_at ON reports;
CREATE TRIGGER reports_set_submitted_at
  BEFORE INSERT OR UPDATE ON reports
  FOR EACH ROW
  EXECUTE FUNCTION set_submitted_at();

-- 2) Enforce at least one report_item before allowing submission
CREATE OR REPLACE FUNCTION enforce_nonempty_submission()
RETURNS TRIGGER AS $$
DECLARE
  item_count INT;
BEGIN
  IF (NEW."is_submitted" = TRUE
      AND (TG_OP = 'INSERT' OR OLD."is_submitted" = FALSE))
  THEN
    SELECT COUNT(*) INTO item_count
      FROM report_items
     WHERE "report_id" = NEW.id;
    IF item_count = 0 THEN
      RAISE EXCEPTION 'Cannot submit report %: no reportItems exist', NEW.id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS reports_enforce_submission ON reports;
CREATE TRIGGER reports_enforce_submission
  BEFORE INSERT OR UPDATE ON reports
  FOR EACH ROW
  EXECUTE FUNCTION enforce_nonempty_submission();
