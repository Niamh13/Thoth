drop
database if exists auth;
create
database auth;

use
auth;

CREATE TABLE login
(
    username VARCHAR(255),
    password VARCHAR(255),
    fullname VARCHAR(255),
    email    VARCHAR(255),
    PRIMARY KEY (username)
);

CREATE TABLE books (
    bookId VARCHAR(255),
    title VARCHAR(MAX),
    image VARCHAR(MAX),
    author VARCHAR(MAX),
    publisher VARCHAR(MAX),
    publishDate VARCHAR(MAX),
    pageCount VARCHAR(MAx),
    category VARCHAR(MAX),
    rating VARCHAR(MAX),
    PRIMARY KEY (bookId)
);

CREATE TABLE user1 (
    bookId VARCHAR(255)
)

INSERT INTO login VALUE(
'user1', 'teamProject', 'Jim Jimmer', 'jimjimmer@gmail.com'
);
