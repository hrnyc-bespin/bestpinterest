CREATE DATABASE bespinterest;

use bespinterest;

CREATE TABLE posts (
  id int NOT NULL,
  photoUrl varchar(1000),
  info varchar(1000),
  PRIMARY KEY(ID)

);

CREATE TABLE users (
  id int NOT NULL,
  username varchar(50),
  userPassword varchar(50),
  profilePic varchar(1000),
  userInfo varchar (1000),
  PRIMARY KEY(ID)
);

CREATE TABLE boards (
  id int NOT NULL,
  FOREIGN KEY(post_id) REFERENCES posts(id),
  FOREIGN KEY(user_id) REFERENCES users(id),
  PRIMARY KEY(ID)
);


ALTER TABLE posts
add FOREIGN KEY(board_id) REFERENCES boards(id),