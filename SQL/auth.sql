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

CREATE TABLE books
(
    bookId      VARCHAR(255),
    title       VARCHAR(255),
    image       VARCHAR(255),
    author      VARCHAR(255),
    publisher   VARCHAR(255),
    publishDate VARCHAR(255),
    pageCount   VARCHAR(255),
    category    VARCHAR(255),
    rating      VARCHAR(255),
    PRIMARY KEY (bookId)
);

CREATE TABLE user1
(
    bookId VARCHAR(255)
);

INSERT INTO login VALUE ('user1', 'teamProject', 'Jim Jimmer', 'jimjimmer@gmail.com');
