-- CreateTable
CREATE TABLE "UserData" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "heardFrom" TEXT NOT NULL,
    "photo" JSONB NOT NULL,
    "phone" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "comments" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserData_pkey" PRIMARY KEY ("id")
);
