
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, and Azure
-- --------------------------------------------------
-- Date Created: 07/31/2013 09:51:14
-- Generated from EDMX file: C:\Users\steve.p\documents\visual studio 2012\Projects\PerlServer\PerlServer\Models\perlServer.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [perlDb];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK__ChangeNot__Statu__34C8D9D1]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ChangeNotes] DROP CONSTRAINT [FK__ChangeNot__Statu__34C8D9D1];
GO
IF OBJECT_ID(N'[dbo].[FK_Documents_ChangeNotes]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Documents] DROP CONSTRAINT [FK_Documents_ChangeNotes];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[ChangeNotes]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ChangeNotes];
GO
IF OBJECT_ID(N'[dbo].[ChangeNoteStates]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ChangeNoteStates];
GO
IF OBJECT_ID(N'[dbo].[Documents]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Documents];
GO
IF OBJECT_ID(N'[dbo].[OriginationNotes]', 'U') IS NOT NULL
    DROP TABLE [dbo].[OriginationNotes];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'ChangeNotes'
CREATE TABLE [dbo].[ChangeNotes] (
    [ChangeNoteId] uniqueidentifier  NOT NULL,
    [ChangeNoteNumber] int  NOT NULL,
    [VersionNumber] int  NOT NULL,
    [ChangeDescription] nchar(500)  NOT NULL,
    [ChangeDate] datetime  NOT NULL,
    [Status] uniqueidentifier  NOT NULL,
    [OriginationNote_OriginationNoteId] uniqueidentifier  NOT NULL
);
GO

-- Creating table 'ChangeNoteStates'
CREATE TABLE [dbo].[ChangeNoteStates] (
    [ChangeNoteStateId] uniqueidentifier  NOT NULL,
    [Code] varchar(10)  NOT NULL,
    [DisplayOrder] int  NOT NULL
);
GO

-- Creating table 'Documents'
CREATE TABLE [dbo].[Documents] (
    [DocumentId] uniqueidentifier  NOT NULL,
    [DocumentURL] nvarchar(500)  NOT NULL
);
GO

-- Creating table 'OriginationNotes'
CREATE TABLE [dbo].[OriginationNotes] (
    [OriginationNoteId] uniqueidentifier  NOT NULL,
    [OriginationNoteNumber] int IDENTITY(1,1) NOT NULL,
    [RevisionNumber] int  NOT NULL,
    [DocumentName] nchar(200)  NOT NULL,
    [DocumentDescription] nchar(500)  NOT NULL,
    [DocumentNumber] int  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [ChangeNoteId] in table 'ChangeNotes'
ALTER TABLE [dbo].[ChangeNotes]
ADD CONSTRAINT [PK_ChangeNotes]
    PRIMARY KEY CLUSTERED ([ChangeNoteId] ASC);
GO

-- Creating primary key on [ChangeNoteStateId] in table 'ChangeNoteStates'
ALTER TABLE [dbo].[ChangeNoteStates]
ADD CONSTRAINT [PK_ChangeNoteStates]
    PRIMARY KEY CLUSTERED ([ChangeNoteStateId] ASC);
GO

-- Creating primary key on [DocumentId] in table 'Documents'
ALTER TABLE [dbo].[Documents]
ADD CONSTRAINT [PK_Documents]
    PRIMARY KEY CLUSTERED ([DocumentId] ASC);
GO

-- Creating primary key on [OriginationNoteId] in table 'OriginationNotes'
ALTER TABLE [dbo].[OriginationNotes]
ADD CONSTRAINT [PK_OriginationNotes]
    PRIMARY KEY CLUSTERED ([OriginationNoteId] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [Status] in table 'ChangeNotes'
ALTER TABLE [dbo].[ChangeNotes]
ADD CONSTRAINT [FK__ChangeNot__Statu__34C8D9D1]
    FOREIGN KEY ([Status])
    REFERENCES [dbo].[ChangeNoteStates]
        ([ChangeNoteStateId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK__ChangeNot__Statu__34C8D9D1'
CREATE INDEX [IX_FK__ChangeNot__Statu__34C8D9D1]
ON [dbo].[ChangeNotes]
    ([Status]);
GO

-- Creating foreign key on [DocumentId] in table 'Documents'
ALTER TABLE [dbo].[Documents]
ADD CONSTRAINT [FK_Documents_ChangeNotes]
    FOREIGN KEY ([DocumentId])
    REFERENCES [dbo].[ChangeNotes]
        ([ChangeNoteId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [OriginationNote_OriginationNoteId] in table 'ChangeNotes'
ALTER TABLE [dbo].[ChangeNotes]
ADD CONSTRAINT [FK_OriginationNoteChangeNote]
    FOREIGN KEY ([OriginationNote_OriginationNoteId])
    REFERENCES [dbo].[OriginationNotes]
        ([OriginationNoteId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_OriginationNoteChangeNote'
CREATE INDEX [IX_FK_OriginationNoteChangeNote]
ON [dbo].[ChangeNotes]
    ([OriginationNote_OriginationNoteId]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------