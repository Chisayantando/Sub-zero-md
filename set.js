const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNktkWGFrcWw3d210Qk1BU1pPMkorNGk2T1loMm94MTRMdCsvT1QzeVYwWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicjNheExUTDhDTWw5dllPenZVV1I1clY2MXllTEwzZ29Cb09lVnMybjFBST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLS00yamZ6aVE3YVVZOWpmNjY3RzErSFB2Rlp4aUpLdzR6N29MUDZNaDFRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJIblNTUnpJZXZ0SXhONVMxcHY2dVcyOW9Pcjd6VjhncWRURVgySXlPa0Y0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFCTWhNN3FvcENRdUs0Z2JyUEpaMHJneXRrL0VXWG1mSm9GMWJUZUJhMFE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZtSit1UHR5NXp1aUlwYnQwVGVqL2F0UXIrcnYrWlVTTFJJS1NXdXNiMTg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNE80emxJVVI0M2NEL0JKTnNFUlpITjVVbjVBMHVaWmFxU3dmN0FTdVdrWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidGVxRmo0M0V5d2VhRVNEZDloV3dCdjBzNjByZEk2WUVkMUF5aklHMGJubz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik56TXo1Wmt3bnJwdUFWUERrbHM3ZzFQa1o4aG5YbjFsSm9MUDhFNkZlaFFabmk3OTRaWUVRNy9aQ2ZlOXo2ZE9VSUJFYlhjb1RvNXhhL0RJTnpDa2lRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTUyLCJhZHZTZWNyZXRLZXkiOiJvN0FHQXgyQ2p4aWZkc0N5bUlrYWhBdHN2R1JHRlRzdnE5dmNKWUxlYUVnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJQeFQtTXJ6alRNMlh4S003UkYzM01nIiwicGhvbmVJZCI6IjRlYWI5OGRjLTI1NTMtNGJlNi1hNDczLWExMGIxNjFkMjBkNCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJGdjlvYVExY2hVWHFXZ3VLOGRVT1FibzVNUUU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMmhzZS9TQ1gzTFhkbGVjSzh1ZzNrS0dGMkJZPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjVYSEdZWUE1IiwibWUiOnsiaWQiOiIyNjM3ODE2ODY1Njg6NUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTmE4LzdRRUVKNnE0YlFHR0FNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiRjlRYjVlTng4MmtVNlg2VExXbGdPR21vcS96NzZlK1RrdGVXNzZFUmwxWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiL0NUaUlPVmFWdmZtOU9KVm1iR3hObXhpYmJncXRHT3pDRzc1aTYvc01DZ2NaUEdZeThKQ0prckl6Tm5pbXl3c0FoSWMxTjVaQzNMY0xXRmQvSVNHRFE9PSIsImRldmljZVNpZ25hdHVyZSI6InNGeGQrUzlKOGdXY0ErWHJrZnJyS1ZnTU1iUXp4QTZVSWFNc1dOdVp1MjlQKzFwajRhUFFYeGpWcUFCVHA5a0p5Mk0vSlNyYjRGRHErci9zTWpJN2lBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzgxNjg2NTY4OjVAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUmZVRytYamNmTnBGT2wra3kxcFlEaHBxS3Y4Kytudms1TFhsdStoRVpkVyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMTI1OTMwNywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFLRzQifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "263785028126",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
