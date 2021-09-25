SET sql_safe_updates = FALSE;

USE defaultdb;
DROP DATABASE IF EXISTS sussyballs CASCADE;
CREATE DATABASE IF NOT EXISTS sussyballs;

USE sussyballs;

CREATE TABLE leaderboard (
    name TEXT,
    score INTEGER 
);