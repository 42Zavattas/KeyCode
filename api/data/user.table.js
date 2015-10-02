'use strict';

export default `
  CREATE TABLE IF NOT EXISTS users (

    id SERIAL PRIMARY KEY,

    name VARCHAR(42),
    email VARCHAR(42) UNIQUE,

    gold INTEGER DEFAULT 0,

    lognup VARCHAR(60),
    lognupat TIMESTAMPTZ,

    banned BOOLEAN,
    admin BOOLEAN

  );
`;
