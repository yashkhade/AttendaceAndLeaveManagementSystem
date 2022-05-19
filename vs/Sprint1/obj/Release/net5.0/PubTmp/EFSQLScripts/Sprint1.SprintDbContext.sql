IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220502060912_initial')
BEGIN
    CREATE TABLE [Employee] (
        [EmployeeId] int NOT NULL IDENTITY,
        [EmployeePassword] nvarchar(15) NOT NULL,
        [EmployeeEmailId] nvarchar(max) NOT NULL,
        [EmployeeDOB] datetime2 NOT NULL,
        [EmployeeName] nvarchar(30) NOT NULL,
        [EmployeeStatus] nvarchar(max) NULL,
        [EmployeeDesignation] nvarchar(max) NOT NULL,
        [EmployeeDepartment] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_Employee] PRIMARY KEY ([EmployeeId])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220502060912_initial')
BEGIN
    CREATE TABLE [Project] (
        [ProjectId] int NOT NULL IDENTITY,
        [ProjectName] nvarchar(40) NOT NULL,
        CONSTRAINT [PK_Project] PRIMARY KEY ([ProjectId])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220502060912_initial')
BEGIN
    CREATE TABLE [Attendance] (
        [AttendanceId] int NOT NULL IDENTITY,
        [EmployeeId] int NOT NULL,
        [AttendanceDate] datetime2 NOT NULL,
        [AttendanceCheck] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_Attendance] PRIMARY KEY ([AttendanceId]),
        CONSTRAINT [FK_Attendance_Employee_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Employee] ([EmployeeId]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220502060912_initial')
BEGIN
    CREATE TABLE [Leaves] (
        [LeaveId] int NOT NULL IDENTITY,
        [EmployeeId] int NOT NULL,
        [LeaveStartDate] datetime2 NOT NULL,
        [LeaveEndDate] datetime2 NOT NULL,
        [LeaveCount] int NOT NULL,
        [LeaveStatus] nvarchar(max) NULL,
        CONSTRAINT [PK_Leaves] PRIMARY KEY ([LeaveId]),
        CONSTRAINT [FK_Leaves_Employee_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Employee] ([EmployeeId]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220502060912_initial')
BEGIN
    CREATE TABLE [Login] (
        [Id] int NOT NULL IDENTITY,
        [Role] nvarchar(max) NULL,
        [EmployeeId] int NOT NULL,
        [Password] nvarchar(max) NULL,
        CONSTRAINT [PK_Login] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Login_Employee_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Employee] ([EmployeeId]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220502060912_initial')
BEGIN
    CREATE TABLE [EmployeeProject] (
        [EmployeeProjectId] int NOT NULL IDENTITY,
        [EmployeeId] int NOT NULL,
        [ProjectId] int NOT NULL,
        [ProjectName] nvarchar(max) NULL,
        [EpStatus] nvarchar(max) NULL,
        CONSTRAINT [PK_EmployeeProject] PRIMARY KEY ([EmployeeProjectId]),
        CONSTRAINT [FK_EmployeeProject_Employee_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Employee] ([EmployeeId]) ON DELETE CASCADE,
        CONSTRAINT [FK_EmployeeProject_Project_ProjectId] FOREIGN KEY ([ProjectId]) REFERENCES [Project] ([ProjectId]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220502060912_initial')
BEGIN
    CREATE INDEX [IX_Attendance_EmployeeId] ON [Attendance] ([EmployeeId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220502060912_initial')
BEGIN
    CREATE INDEX [IX_EmployeeProject_EmployeeId] ON [EmployeeProject] ([EmployeeId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220502060912_initial')
BEGIN
    CREATE INDEX [IX_EmployeeProject_ProjectId] ON [EmployeeProject] ([ProjectId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220502060912_initial')
BEGIN
    CREATE INDEX [IX_Leaves_EmployeeId] ON [Leaves] ([EmployeeId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220502060912_initial')
BEGIN
    CREATE INDEX [IX_Login_EmployeeId] ON [Login] ([EmployeeId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220502060912_initial')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220502060912_initial', N'5.0.1');
END;
GO

COMMIT;
GO

