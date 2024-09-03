-- CreateTable
CREATE TABLE "Tables" (
    "id" SERIAL NOT NULL,
    "tableNo" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "Tables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Locations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Companies" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,

    CONSTRAINT "Companies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Locations_companyId_key" ON "Locations"("companyId");

-- AddForeignKey
ALTER TABLE "Tables" ADD CONSTRAINT "Tables_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Locations" ADD CONSTRAINT "Locations_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
