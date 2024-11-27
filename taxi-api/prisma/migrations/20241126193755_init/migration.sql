-- CreateTable
CREATE TABLE "Ride" (
    "id" SERIAL NOT NULL,
    "customer_id" TEXT NOT NULL,
    "driver_id" INTEGER,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "distance" TEXT,
    "duration" TEXT,
    "cost" DOUBLE PRECISION,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ride_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Driver" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT NOT NULL DEFAULT 'Descrição padrão',
    "car" TEXT NOT NULL DEFAULT 'Carro padrão',
    "rating" TEXT NOT NULL DEFAULT 'Nenhuma avaliação',
    "min_distance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "max_distance" DOUBLE PRECISION NOT NULL DEFAULT 500,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;
