/*
  Warnings:

  - You are about to drop the column `isDelete` on the `Item` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Item] DROP COLUMN [isDelete];
ALTER TABLE [dbo].[Item] ADD [isDeleted] BIT NOT NULL CONSTRAINT [Item_isDeleted_df] DEFAULT 0;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
