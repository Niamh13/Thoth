drop database if exists auth;
create database auth;

use auth;

CREATE TABLE login(
	username VARCHAR (255),
	password VARCHAR (255),
    PRIMARY KEY (username)
);

INSERT INTO login VALUE(
"user1", "teamProject"
);