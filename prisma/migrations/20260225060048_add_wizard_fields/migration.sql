-- AlterTable
ALTER TABLE "inquiries" ADD COLUMN     "additional_option" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "additional_price" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "email" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "file_name" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "homepage_price" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "homepage_type" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "reference_link" TEXT NOT NULL DEFAULT '';
