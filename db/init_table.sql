USE item_management;

CREATE TABLE [dbo].[Item] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [type] NVARCHAR(1000) NOT NULL,
    [category] NVARCHAR(1000) NOT NULL,
    [price] FLOAT(53) NOT NULL,
    [description] NVARCHAR(1000),
    [imageUrl] NVARCHAR(1000),
    [stock] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Item_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [isDelete] BIT NOT NULL CONSTRAINT [Item_isDelete_df] DEFAULT 0,
    CONSTRAINT [Item_pkey] PRIMARY KEY CLUSTERED ([id])
);