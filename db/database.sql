
CREATE TABLE "user" (
    uid UUID NOT NULL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    nickname VARCHAR(30) NOT NULL
);

CREATE TABLE tag (
    id SERIAL,
    creator UUID NOT NULL,
    name VARCHAR(40),
    sortorder INTEGER DEFAULT 0,
    FOREIGN KEY (creator) REFERENCES "user" (uid)
);
