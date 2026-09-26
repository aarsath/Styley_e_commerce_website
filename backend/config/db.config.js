require('dotenv').config();

const databaseHost = process.env.DB_HOST.trim();
const databaseUrl = databaseHost.startsWith('mongodb://') || databaseHost.startsWith('mongodb+srv://')
    ? `${databaseHost.replace(/\/+$/, '')}/${process.env.DB_NAME}`
    : `mongodb://${databaseHost}:27017/${process.env.DB_NAME}`;

module.exports = {
    url: databaseUrl
};