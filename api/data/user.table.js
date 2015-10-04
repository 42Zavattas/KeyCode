'use strict';

export default `
  CREATE TABLE IF NOT EXISTS users (

    id SERIAL PRIMARY KEY,

    name VARCHAR,
    avatar VARCHAR,
    email VARCHAR(42) UNIQUE,

    gold INTEGER DEFAULT 0,

    banned BOOLEAN,
    admin BOOLEAN,

    githubId INTEGER

  );
`;
