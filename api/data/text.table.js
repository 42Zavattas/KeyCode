'use strict';

export default `
  CREATE TABLE IF NOT EXISTS texts (

    id SERIAL PRIMARY KEY,

    data VARCHAR(1000) NOT NULL,
    author INTEGER REFERENCES users (id),

    votes INTEGER,
    approved BOOLEAN DEFAULT false,

    rating INTEGER,
    ratingcount INTEGER

  );
`;
