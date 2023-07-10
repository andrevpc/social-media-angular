USE master
GO

IF EXISTS(SELECT * FROM SYS.DATABASES WHERE NAME = 'projetoAngular')
	DROP DATABASE projetoAngular

CREATE DATABASE	projetoAngular
go

USE projetoAngular
GO

CREATE TABLE Users(
	Id INT IDENTITY(1,1) PRIMARY KEY,
	Email VARCHAR(100) NOT NULL,
	Username VARCHAR(100) NOT NULL,
	UserPassword VARCHAR(100) NOT NULL,
	ProfilePic VARCHAR(MAX),
	Age DATE NOT NULL,
	Salt VARCHAR(20) NOT NULL --Segurança (Salting (de 6 a 12 caracteres) + SlowHashing)
)

CREATE TABLE Follows(
	Id INT IDENTITY(1,1) PRIMARY KEY,
	FollowerID INT FOREIGN KEY REFERENCES Users(Id) NOT NULL,
	UserID INT FOREIGN KEY REFERENCES Users(Id) NOT NULL
)

CREATE TABLE Forums(
	Id INT IDENTITY(1,1) PRIMARY KEY,
	ForumPhoto VARCHAR(MAX),
	Title VARCHAR(100) NOT NULL,
	ForumDescription VARCHAR(100),
	Created DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
	OwnerID INT FOREIGN KEY REFERENCES Users(Id) NOT NULL
)

CREATE TABLE Posts(
	Id INT IDENTITY(1,1) PRIMARY KEY,
	Title VARCHAR(100),
	PostMessage VARCHAR(MAX) NOT NULL,
	Upload VARCHAR(MAX),
	Likes INT,
	OwnerID INT FOREIGN KEY REFERENCES Users(Id) NOT NULL,
	ForumID INT FOREIGN KEY REFERENCES Forums(Id) NOT NULL,
	PostsID INT FOREIGN KEY REFERENCES Posts(Id),
	Created DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
)

CREATE TABLE Likes(
	Id INT IDENTITY(1,1) PRIMARY KEY,
	IsLike BIT NOT NULL,
	OwnerID INT FOREIGN KEY REFERENCES Users(Id) NOT NULL,
	PostsID INT FOREIGN KEY REFERENCES Posts(Id) NOT NULL
)

CREATE TABLE Positions(
	Id INT IDENTITY(1,1) PRIMARY KEY,
	Nome VARCHAR(100) NOT NULL,
	Tier INT NOT NULL,
	ForumID INT FOREIGN KEY REFERENCES Forums(Id) NOT NULL,
)

CREATE TABLE HasPosition(
	Id INT IDENTITY(1,1) PRIMARY KEY,
	PositionID INT FOREIGN KEY REFERENCES Positions(Id) NOT NULL,
	UsuarioID INT FOREIGN KEY REFERENCES Users(Id) NOT NULL
)

CREATE TABLE Permission(
	Id INT IDENTITY(1,1) PRIMARY KEY,
	Nome VARCHAR(100) NOT NULL,
)

CREATE TABLE HasPermission(
	Id INT IDENTITY(1,1) PRIMARY KEY,
	PositionID INT FOREIGN KEY REFERENCES Positions(Id) NOT NULL,
	PermissionID INT FOREIGN KEY REFERENCES Permission(Id) NOT NULL
)

CREATE TABLE Token(
	Token VARCHAR(12) PRIMARY KEY,
	OwnerID INT FOREIGN KEY REFERENCES Users(Id) NOT NULL
)

GO

CREATE TRIGGER LikeTrigger
	ON Likes
	AFTER INSERT
AS
BEGIN
	DECLARE
	@PostID INT, @IsLike BIT
	SELECT @IsLike = IsLike, @PostID = PostsID FROM INSERTED

	IF @IsLike = 1
		UPDATE Posts
		SET Posts.Likes = Posts.Likes + 1 
		WHERE Posts.ID = @PostID
	ELSE 
		UPDATE Posts 
		SET Posts.Likes = Posts.Likes -1
		WHERE Posts.ID = @PostID
END

GO

CREATE TRIGGER RemoveLikeTrigger
	ON Likes
	AFTER DELETE
AS
BEGIN
	DECLARE
	@PostID INT, @IsLike BIT
	SELECT @IsLike = IsLike, @PostID = PostsID FROM DELETED

	IF @IsLike = 1
		UPDATE Posts
		SET Posts.Likes = Posts.Likes - 1 
		WHERE Posts.ID = @PostID
	ELSE 
		UPDATE Posts 
		SET Posts.Likes = Posts.Likes + 1
		WHERE Posts.ID = @PostID
END
GO

INSERT INTO Permission VALUES ('All')
INSERT INTO Permission VALUES ('Post')
INSERT INTO Permission VALUES ('Vote')
INSERT INTO Permission VALUES ('RemovePosts')
INSERT INTO Permission VALUES ('RemoveMembers')
INSERT INTO Permission VALUES ('EditPosts')
INSERT INTO Permission VALUES ('ChangePositions')
INSERT INTO Permission VALUES ('CreatePositions')
INSERT INTO Permission VALUES ('DeleteForum')

GO
CREATE TRIGGER OwnerRelation
	ON Forums
	AFTER INSERT
AS 
BEGIN
	DECLARE 
	@OwnerID INT,
	@ForumID INT,
	@PositionID INT,
	@PermissionID INT

	SELECT @ForumID = ID, @OwnerID = OwnerID FROM inserted

	INSERT INTO Positions (ForumID, Nome, Tier) VALUES (@ForumID, 'Owner', 1)
	SELECT @PositionID = ID FROM Positions WHERE ForumID = @ForumID

	INSERT INTO HasPosition (UsuarioID, PositionID) VALUES (@OwnerID, @PositionID)

	SELECT @PermissionID = ID FROM Permission WHERE Nome = 'All'
	INSERT INTO HasPermission(PermissionID, PositionID) VALUES (@PermissionID, @PositionID)
END

select * from Users
select * from Forums
select * from Posts
select * from Follows