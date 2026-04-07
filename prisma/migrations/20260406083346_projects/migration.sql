-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Live',
    "thumbnail" TEXT,
    "gallery" TEXT[],
    "shortDescription" TEXT NOT NULL,
    "topFeatures" TEXT[],
    "fullDescription" TEXT NOT NULL,
    "clientSideTech" TEXT[],
    "serverSideTech" TEXT[],
    "databaseTech" TEXT NOT NULL,
    "authTech" TEXT,
    "usedLibraries" TEXT[],
    "challenges" TEXT NOT NULL,
    "solutions" TEXT NOT NULL,
    "learningOutcomes" TEXT NOT NULL,
    "futurePlans" TEXT[],
    "liveLink" TEXT,
    "githubClient" TEXT,
    "githubServer" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "complexity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "projects_slug_key" ON "projects"("slug");
