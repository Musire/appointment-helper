-- 1. Add the new date column allowing NULL temporarily so existing rows don't break
ALTER TABLE "Appointment" ADD COLUMN "date" TIMESTAMP(3);

-- 2. Populate the new 'date' column by truncating the old startTime to midnight
UPDATE "Appointment" 
SET "date" = DATE_TRUNC('day', "startTime");

-- 3. Make the 'date' column NOT NULL now that it is fully populated
ALTER TABLE "Appointment" ALTER COLUMN "date" SET NOT NULL;

-- 4. Create temporary columns to hold our calculated minutes from midnight
ALTER TABLE "Appointment" ADD COLUMN "new_startTime" INTEGER;
ALTER TABLE "Appointment" ADD COLUMN "new_endTime" INTEGER;

-- 5. Extract hours and minutes from the old timestamps and convert them to raw minutes
UPDATE "Appointment" 
SET 
  "new_startTime" = (EXTRACT(HOUR FROM "startTime") * 60) + EXTRACT(MINUTE FROM "startTime"),
  "new_endTime" = (EXTRACT(HOUR FROM "endTime") * 60) + EXTRACT(MINUTE FROM "endTime");

-- 6. Now it is safe to drop the old DateTime columns
ALTER TABLE "Appointment" DROP COLUMN "startTime";
ALTER TABLE "Appointment" DROP COLUMN "endTime";

-- 7. Rename our calculated integer columns to match your Prisma schema expectations
ALTER TABLE "Appointment" RENAME COLUMN "new_startTime" TO "startTime";
ALTER TABLE "Appointment" RENAME COLUMN "new_endTime" TO "endTime";

-- 8. Enforce the NOT NULL constraint on our new integer columns
ALTER TABLE "Appointment" ALTER COLUMN "startTime" SET NOT NULL;
ALTER TABLE "Appointment" ALTER COLUMN "endTime" SET NOT NULL;

-- 9. Handle the minor adjustment you made to createdAt
ALTER TABLE "Appointment" ALTER COLUMN "createdAt" DROP DEFAULT;

-- 10. Drop old indexes and set up your updated composite indexes safely
DROP INDEX IF EXISTS "Appointment_storeId_startTime_idx";
DROP INDEX IF EXISTS "Appointment_staffId_startTime_idx";
CREATE INDEX "Appointment_storeId_date_startTime_idx" ON "Appointment"("storeId", "date", "startTime");
CREATE INDEX "Appointment_staffId_date_startTime_idx" ON "Appointment"("staffId", "date", "startTime");
