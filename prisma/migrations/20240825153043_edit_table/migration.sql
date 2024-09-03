-- DropForeignKey
ALTER TABLE "Locations" DROP CONSTRAINT "Locations_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Tables" DROP CONSTRAINT "Tables_locationId_fkey";

-- CreateTable
CREATE TABLE "Addons" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "addonCategoryId" INTEGER NOT NULL,

    CONSTRAINT "Addons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AddonCategories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AddonCategories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Addons" ADD CONSTRAINT "Addons_addonCategoryId_fkey" FOREIGN KEY ("addonCategoryId") REFERENCES "AddonCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
