-- CreateTable
CREATE TABLE "Memos" (
    "id" STRING NOT NULL,
    "title" STRING,
    "content" STRING,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Memos_pkey" PRIMARY KEY ("id")
);
