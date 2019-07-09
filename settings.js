const APIServerPort = process.env.PORT || 3000;

const database = {
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT || 27017,
};

module.exports = {
    database,
    APIServerPort,
};