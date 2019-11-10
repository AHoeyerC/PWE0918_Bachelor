const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    endpoint: process.env.API_URL,
    masterKey: process.env.API_KEY,
    port: process.env.PORT,
    mongodbPassword: process.env.MONGODB_PASSWORD,
    secretKey: process.env.JWT_KEY
};

//Denne fil læser environment variables fra .env filer gennem 'dotenv' packagen.
//Dernæst anvendes 'config.js' module-filen til at mappe .env variablerne til mere letlæselige navne
//Variablerne kan nu tilgås gennem 'const { variabelnavn } = require('./config');
//eksempel: const { port, endpoint } = require('./config'); ... Hiver port og endpoint ud af config filen