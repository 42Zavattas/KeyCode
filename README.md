# KeyCode

> An awesome and reactive typing game, source-code oriented.

Ever dreamed about a platform where you can train your coding typing capabilities, follow your progress without limits and compete with your friends?
At Zavatta Corp, we believe every dream can become reality if you put enough work in it.

We are very proud to announce the KeyCode project. Are you ready to follow the :rabbit2:?

### Mysterious things

    npm install || npm i

Install project dependencies

    npm run dev

Run the project in development environment

    npm run prod

Run the project for production. Isomorphic full power.

### Database

The api is powered by the PostgreSQL database server.
It is required if you want to make local testing.
Following steps are only relevant to an Archlinux configuration. For any other systems, you'll have to figure things out.

    pacman -S postgresql
    initdb --locale en_US.UTF-8 -E UTF8 -D '/var/lib/postgres/data'
    systemctl start postgresql.service
    createdb keycode-dev

You may have to add yourself in the postgres group.
