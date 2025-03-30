BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Item] ADD [isDelete] BIT NOT NULL CONSTRAINT [Item_isDelete_df] DEFAULT 0;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
