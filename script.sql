USE [UiT]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Questions]') AND type in (N'U'))
ALTER TABLE [dbo].[Questions] DROP CONSTRAINT IF EXISTS [FK_Questions_Chapters_ChapterID]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Chapters]') AND type in (N'U'))
ALTER TABLE [dbo].[Chapters] DROP CONSTRAINT IF EXISTS [FK_Chapters_Subjects_SubjectID]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Users]') AND type in (N'U'))
ALTER TABLE [dbo].[Users] DROP CONSTRAINT IF EXISTS [DF__Users__Role__160F4887]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 25/07/2018 15:10:08 ******/
DROP TABLE IF EXISTS [dbo].[Users]
GO
/****** Object:  Table [dbo].[Subjects]    Script Date: 25/07/2018 15:10:08 ******/
DROP TABLE IF EXISTS [dbo].[Subjects]
GO
/****** Object:  Table [dbo].[Questions]    Script Date: 25/07/2018 15:10:08 ******/
DROP TABLE IF EXISTS [dbo].[Questions]
GO
/****** Object:  Table [dbo].[Chapters]    Script Date: 25/07/2018 15:10:08 ******/
DROP TABLE IF EXISTS [dbo].[Chapters]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 25/07/2018 15:10:08 ******/
DROP TABLE IF EXISTS [dbo].[__EFMigrationsHistory]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 25/07/2018 15:10:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[__EFMigrationsHistory]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
/****** Object:  Table [dbo].[Chapters]    Script Date: 25/07/2018 15:10:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Chapters]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Chapters](
	[ChapterID] [int] IDENTITY(1,1) NOT NULL,
	[ChapterName] [nvarchar](max) NULL,
	[SubjectID] [int] NOT NULL,
 CONSTRAINT [PK_Chapters] PRIMARY KEY CLUSTERED 
(
	[ChapterID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO
/****** Object:  Table [dbo].[Questions]    Script Date: 25/07/2018 15:10:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Questions]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Questions](
	[QuestionID] [int] IDENTITY(1,1) NOT NULL,
	[HelpPython] [nvarchar](max) NULL,
	[TextPython] [nvarchar](max) NULL,
	[TextMathematica] [nvarchar](max) NULL,
	[ChapterID] [int] NOT NULL,
	[Title] [nvarchar](max) NULL,
	[CorrectAnswer] [nvarchar](max) NULL,
	[HelpMathematica] [nvarchar](max) NULL,
 CONSTRAINT [PK_Questions] PRIMARY KEY CLUSTERED 
(
	[QuestionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO
/****** Object:  Table [dbo].[Subjects]    Script Date: 25/07/2018 15:10:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Subjects]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Subjects](
	[SubjectID] [int] IDENTITY(1,1) NOT NULL,
	[SubjectName] [nvarchar](max) NULL,
 CONSTRAINT [PK_Subjects] PRIMARY KEY CLUSTERED 
(
	[SubjectID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO
/****** Object:  Table [dbo].[Users]    Script Date: 25/07/2018 15:10:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Users]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](max) NULL,
	[LastName] [nvarchar](max) NULL,
	[Username] [nvarchar](max) NULL,
	[PasswordHash] [varbinary](max) NULL,
	[PasswordSalt] [varbinary](max) NULL,
	[Role] [int] NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20180702113041_InitialCreate', N'2.1.0-rtm-30799')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20180716083200_addQuestionTitle', N'2.1.0-rtm-30799')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20180717141302_AddedChapterID', N'2.1.0-rtm-30799')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20180717141814_ProbablyTheFinal', N'2.1.0-rtm-30799')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20180719113125_AddedUserFunctionality', N'2.1.0-rtm-30799')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20180720140810_User roles', N'2.1.0-rtm-30799')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20180725122940_UpdateQuestion', N'2.1.1-rtm-30846')
SET IDENTITY_INSERT [dbo].[Chapters] ON 

INSERT [dbo].[Chapters] ([ChapterID], [ChapterName], [SubjectID]) VALUES (1, N'Trees', 1)
INSERT [dbo].[Chapters] ([ChapterID], [ChapterName], [SubjectID]) VALUES (2, N'T1', 1)
INSERT [dbo].[Chapters] ([ChapterID], [ChapterName], [SubjectID]) VALUES (3, N'sub2', 2)
INSERT [dbo].[Chapters] ([ChapterID], [ChapterName], [SubjectID]) VALUES (4, N'Sub2', 2)
INSERT [dbo].[Chapters] ([ChapterID], [ChapterName], [SubjectID]) VALUES (7, N'Newly added Chapter', 1)
INSERT [dbo].[Chapters] ([ChapterID], [ChapterName], [SubjectID]) VALUES (8, N'Discrete new', 2)
INSERT [dbo].[Chapters] ([ChapterID], [ChapterName], [SubjectID]) VALUES (9, N'Chapter 1', 3)
SET IDENTITY_INSERT [dbo].[Chapters] OFF
SET IDENTITY_INSERT [dbo].[Questions] ON 

INSERT [dbo].[Questions] ([QuestionID], [HelpPython], [TextPython], [TextMathematica], [ChapterID], [Title], [CorrectAnswer], [HelpMathematica]) VALUES (8, N'bug fix', N'bug fix', N'bug fix', 1, N'bug fix', N'1', N'a')
INSERT [dbo].[Questions] ([QuestionID], [HelpPython], [TextPython], [TextMathematica], [ChapterID], [Title], [CorrectAnswer], [HelpMathematica]) VALUES (14, N'2', N'2', N'2', 1, N'2', N'1', N'a')
INSERT [dbo].[Questions] ([QuestionID], [HelpPython], [TextPython], [TextMathematica], [ChapterID], [Title], [CorrectAnswer], [HelpMathematica]) VALUES (1019, N'tututu', N'tututu', N'tututu', 2, N'tututu', N'1', N'a')
INSERT [dbo].[Questions] ([QuestionID], [HelpPython], [TextPython], [TextMathematica], [ChapterID], [Title], [CorrectAnswer], [HelpMathematica]) VALUES (1020, N'ASDASD', N'ASDASDA', N'SASD', 2, N'Loops', N'1', N'a')
INSERT [dbo].[Questions] ([QuestionID], [HelpPython], [TextPython], [TextMathematica], [ChapterID], [Title], [CorrectAnswer], [HelpMathematica]) VALUES (1022, N'aaa', N'aaa', N'aaa', 7, N'Question Title', N'1', N'a')
INSERT [dbo].[Questions] ([QuestionID], [HelpPython], [TextPython], [TextMathematica], [ChapterID], [Title], [CorrectAnswer], [HelpMathematica]) VALUES (1023, N'asd', N'asd', N'asd', 3, N'Vanja', N'1', N'a')
SET IDENTITY_INSERT [dbo].[Questions] OFF
SET IDENTITY_INSERT [dbo].[Subjects] ON 

INSERT [dbo].[Subjects] ([SubjectID], [SubjectName]) VALUES (1, N'Introduction')
INSERT [dbo].[Subjects] ([SubjectID], [SubjectName]) VALUES (2, N'Calculus')
INSERT [dbo].[Subjects] ([SubjectID], [SubjectName]) VALUES (3, N'Discrete Maths')
SET IDENTITY_INSERT [dbo].[Subjects] OFF
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([Id], [FirstName], [LastName], [Username], [PasswordHash], [PasswordSalt], [Role]) VALUES (1, N'jan', N'jan', N'jan', 0x158F6E8A86CDB59647C8BC17B1365A6781F5CE498D70DF961AD523AA1C4E3BF81F70AC2D6671AB43C6910704833007A3CD7ACFDAB5DDD06D6FFE62F7E07A6ACF, 0x251E60EAE032C4068BB4F42DA5E8B5FAB9EFA415FD41866EC5CBB48559D1071AE914FD19D3CDEF005114966E7ABB4C8DB973DFAA6DEF75CCAA53B9645A2541595FB83E2FDE10B61B46F46E3395516F77F468CD3E956611BB0C1955DF575DC4865EA1F610ACE14ABA5B2459992C5A62C648BCBEF3C0BCEAE0ADD338DEB7A47639, 1)
INSERT [dbo].[Users] ([Id], [FirstName], [LastName], [Username], [PasswordHash], [PasswordSalt], [Role]) VALUES (2, N'test', N'test', N'test', 0xC6B4993A91701E9187D6B5576C0D7A6B991167D9A6A642449C8CCE2327836BECC7D66D7F8B6DBA37DCAF7666DAEF3A78EBA767B63D2EEC2192371728ADFE2FF6, 0xB4C758034FF36F1971AB0C2EA9B4079F6DF22702C4C37E496DEBC2D11C5AD78EAA06ACA2D6D78C20AF07A2E1A5D50EAEFBCFBC4024BEE608826287DEF552E52A532328D884178453F8E9C150E57772C7AD40797F9957C28B2E5AC1653CFD6D4E7F34967E072738980FCF829DDC8C1BA5B68595366C77FA883BE192189EFC95DC, 1)
INSERT [dbo].[Users] ([Id], [FirstName], [LastName], [Username], [PasswordHash], [PasswordSalt], [Role]) VALUES (3, N'Vanja', N'Popovic', N'vanja', 0x98833AEDA0A0C5B2705EB668540CAB48C93251B95641F478EE10572DBA5128EDFE020E0C7817E32EF17BF0E454C834B297C40E566377443D4186CADC04577CF0, 0xEC8E16F30AA219DE75FA88EF20517D7F1E4A30DCA57DE756E6DE3C6F13D52F640CBCB569D7313FACE84BD67E95386E463A12A9B15CE1EC4D918C0D219323E5A8604CBFD19673B736310ED02A9769F21AC674C07D66C17AFEB2121E4E0E61706FEB089B0127F431652D84FAE3FCFE2CDD893EC892183C3062B5A0248B91533083, 1)
INSERT [dbo].[Users] ([Id], [FirstName], [LastName], [Username], [PasswordHash], [PasswordSalt], [Role]) VALUES (4, N't', N't', N't', 0xEE9DF655C3301BCD82697E0D269D79839D565DDA4C17C18CB35A8AD19991C7A70954534AF333E3465EF06ABC614D3021C2BE983DFF2A5B7BC51DDB7B24F9FF31, 0x1D90B3B8B020DA74D9E92B276A73DE3E3976EBB78D74344651EB909E4ED438DD8778D6943AA2A190C21292279A382016E3ECB3DADE9453C58337CF3F1E8FD4A6F523EE5EE49A7A675FC6C90F57267A50BB0B60230FCA9B4F4C686D78E7DF255E4B3D71AD96E7F0B0B2C0AD37FB1E55BC5C09FA3B664DFC393A1CC795B9FFC2FB, 1)
INSERT [dbo].[Users] ([Id], [FirstName], [LastName], [Username], [PasswordHash], [PasswordSalt], [Role]) VALUES (5, N'fanta', N'fanta', N'fanta', 0x26EB9B3E0103B671E403770E0F2622FE513B2D2D3A6A3C3F26228311261F9910AF0A18E41429BE99282368CF64D45AC0274FC7D9D3646AB1488102AB36536AC2, 0x404E33FE9781DE51C11982BD50F049834F2CAE545BE8CAD856610056626BE0A650E63D30DF675CD4CE538D4912E5F9D906FB4B08FD23C4CFF4EE012A67ED8C6918AAC2AB64B118CCFFE9C6005FC6B2F082027EBFA2C2C441A1F6D7AD252937996B5283E52783BF5B9AC41ACF3CCFAF02163164AF069B4E7417D20FAF26B2CA02, 1)
INSERT [dbo].[Users] ([Id], [FirstName], [LastName], [Username], [PasswordHash], [PasswordSalt], [Role]) VALUES (6, N'mix', N'mix', N'mix', 0xC42FAA8483228EFA7E2F17CD28F04FF1255988C8BB088F9EA8FF5D85B658B872D8E4B9EC64F4B340B4F808F9321F83A195519DBD53FB2D0B9FEF3D25A014538C, 0x98FC6020BA10732F54C4AECBEA88C7FFCD2CB93EC7317966AE9B17BD6FF37B30B09F3F92C368782E9FB8EB669A3B7FDD37309E3A48C7513D015C02CCE3DAF58CD2AA951097B09D2C68490DA85BFA21595DA3F69571FBFB8F7013B52DF224A31115FC919B9F1822453EB14799F8DD959EC37518610C33E5796C5B43E9542C40C5, 1)
INSERT [dbo].[Users] ([Id], [FirstName], [LastName], [Username], [PasswordHash], [PasswordSalt], [Role]) VALUES (7, N'Vanjaaa ', N'Popovic', N'test1', 0x7D821C22238268E99A68BDCE900BCC9DA11EDE7433EE18D0555829ABEF3491289B90EBD489B099652267EC492692BB4DE5E271B446193C3518142152190EBCD0, 0xD4816C3D922ECADA9635BC9D9E5BE3BA49CE1F1939EFC80C891C1BFDBF4FFB1DDD99C8C1364D3A9502C554ED175FCB7ABA0BAFDEA3A20F456978D3693F447819DFC11A8046A7ED1C27FF21F21F86BBEDD6086491B6E279D9FCE126DCB327DC88F7C09F9EE3A2FCFBD4C87510CE1E31F3F1E97498BA4BAA8921844353696D259A, 1)
INSERT [dbo].[Users] ([Id], [FirstName], [LastName], [Username], [PasswordHash], [PasswordSalt], [Role]) VALUES (8, N'cola', N'cola', N'cola', 0xB9399948CBA63C82CF8CCCE7BE079F3D1253886359268FD3C6DEAAC7CB8DC9C140D49A2117D175CD31FC26FED0ABC4FB20F4DCCAFF7C73FD4185018F9A8B81BA, 0x87EABF051F4DAD17555F323E5604D85747B991F89CC9AA923A6A692F5A1C1C7DE73826F7427D5D7BD143C43097E1577A62738EF4ED32D8968A8071F4B7E3935AFA1532A2481E7E7F9B5E2E30991EEF526ADD9CC3C6644178862118C6A2B0F2821EB77D182A2395665DF430D10FD25D13B1F07569628278488A6506A31161404B, 2)
SET IDENTITY_INSERT [dbo].[Users] OFF
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[DF__Users__Role__160F4887]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[Users] ADD  DEFAULT ((0)) FOR [Role]
END

GO
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Chapters_Subjects_SubjectID]') AND parent_object_id = OBJECT_ID(N'[dbo].[Chapters]'))
ALTER TABLE [dbo].[Chapters]  WITH CHECK ADD  CONSTRAINT [FK_Chapters_Subjects_SubjectID] FOREIGN KEY([SubjectID])
REFERENCES [dbo].[Subjects] ([SubjectID])
ON DELETE CASCADE
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Chapters_Subjects_SubjectID]') AND parent_object_id = OBJECT_ID(N'[dbo].[Chapters]'))
ALTER TABLE [dbo].[Chapters] CHECK CONSTRAINT [FK_Chapters_Subjects_SubjectID]
GO
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Questions_Chapters_ChapterID]') AND parent_object_id = OBJECT_ID(N'[dbo].[Questions]'))
ALTER TABLE [dbo].[Questions]  WITH CHECK ADD  CONSTRAINT [FK_Questions_Chapters_ChapterID] FOREIGN KEY([ChapterID])
REFERENCES [dbo].[Chapters] ([ChapterID])
ON DELETE CASCADE
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Questions_Chapters_ChapterID]') AND parent_object_id = OBJECT_ID(N'[dbo].[Questions]'))
ALTER TABLE [dbo].[Questions] CHECK CONSTRAINT [FK_Questions_Chapters_ChapterID]
GO
