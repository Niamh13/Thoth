drop database if exists auth;
create database auth;

use auth;

CREATE TABLE login(
	username VARCHAR (255),
	password VARCHAR (255),
	fullname VARCHAR (255),
	email VARCHAR (255);
    PRIMARY KEY (username)
);

INSERT INTO login VALUE(
"user1", "teamProject", "Jim Jimmer", "jimjimmer@gmail.com"
);
