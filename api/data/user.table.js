'use strict';

export default `
  CREATE TABLE IF NOT EXISTS users (

    id SERIAL PRIMARY KEY,

    name VARCHAR(42) NOT NULL,
    email VARCHAR(42) UNIQUE,

    lognup VARCHAR(60),
    lognupat TIMESTAMPTZ,

    banned BOOLEAN,
    admin BOOLEAN

  );
`;
