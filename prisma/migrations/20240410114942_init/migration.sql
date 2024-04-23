-- CreateTable
CREATE TABLE "recipe" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "recipeDetailsId" INTEGER NOT NULL,

    CONSTRAINT "recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeDetails" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "RecipeDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "recipe_title_key" ON "recipe"("title");

-- AddForeignKey
ALTER TABLE "recipe" ADD CONSTRAINT "recipe_recipeDetailsId_fkey" FOREIGN KEY ("recipeDetailsId") REFERENCES "RecipeDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
