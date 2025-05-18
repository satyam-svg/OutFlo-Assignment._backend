/*
  Warnings:

  - You are about to drop the `_CampaignAccounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `campaign_accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `campaigns` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CampaignAccounts" DROP CONSTRAINT "_CampaignAccounts_A_fkey";

-- DropForeignKey
ALTER TABLE "_CampaignAccounts" DROP CONSTRAINT "_CampaignAccounts_B_fkey";

-- DropForeignKey
ALTER TABLE "campaign_accounts" DROP CONSTRAINT "campaign_accounts_account_id_fkey";

-- DropForeignKey
ALTER TABLE "campaign_accounts" DROP CONSTRAINT "campaign_accounts_campaign_id_fkey";

-- DropTable
DROP TABLE "_CampaignAccounts";

-- DropTable
DROP TABLE "accounts";

-- DropTable
DROP TABLE "campaign_accounts";

-- DropTable
DROP TABLE "campaigns";

-- CreateTable
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "CampaignStatus" NOT NULL DEFAULT 'Active',
    "leads" TEXT[],
    "accountIds" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);
