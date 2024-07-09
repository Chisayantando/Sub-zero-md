const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou({ nomCom: "menu", categorie: "Menu" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm: commandList } = require(__dirname + "/../framework/zokou");
    var coms = {};
    var mode = "public";
    if ((s.MODE).toLowerCase() !== "yes") {
        mode = "private";
    }
    commandList.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });
    moment.tz.setDefault(s.TZ);
    // Create a date and time in GMT
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');
    let infoMsg =  `
┏━━━━━━━❏Sub-zero❏━━━━━━┓
┃ ⿻${mode} mode
┃ ⿻User : ${s.OWNER_NAME}
┣━━❏Sub-zero Info❏ 
┃
┃ ⿻Library : WS Baileys
️┃ ⿻Prefix : ${s.PREFIXE}
️┃ ⿻Date : ${date}
┃ ⿻Time : ${temps}
┃ ⿻Tools : ${commandList.length}
┃ ⿻Ram : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
┃ ⿻Host : ${os.platform()}
┣━━━━━━━❏Sub-zero❏━━━━━━┓
┗━━━━━━━❏Version1❏━━━━━━┛\n\n`;
    let menuMsg = `
┏━━━━━━━━━━┓
┣❏Sub-zero
┣❏©Ntando
┗━━━━━━━━━━┛
`;
    // Random Bible verses
    const bibleVerses = [
        "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope. - Jeremiah 29:11",
        "The Lord is my shepherd; I shall not want. - Psalm 23:1",
        "I can do all things through him who strengthens me. - Philippians 4:13",
        // Add more Bible verses here
    ];
    const randomVerse = bibleVerses[Math.floor(Math.random() * bibleVerses.length)];
    menuMsg += `Bible Verse: ${randomVerse}\n\n`;
    for (const cat in coms) {
        menuMsg += `┏━━━━━⚼ ${cat}`;
        for (const cmd of coms[cat]) {
            menuMsg += `
┣ ⃟  ${cmd}`;
        }
        menuMsg += `
┗━━━━━━━━━━━━━━┛\n`
    }
    menuMsg += `
︎┏━━━━━━━━━━━━━━━━━━━━━━┓
️┣❏Sub-zero❏
┣❏©Ntando
┗━━━━━━━━━━━━━━━━━━━━━━┛
┏━━━━━━━━━━━━━━━━━━━━━━┓
┗━━━━━━━━━━━━━━━━━━━━━━┛
`;

    var lien = mybotpic();

    if (lien.match(/\.(mp4|gif)$/i)) {
        try {
            zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis _subzero_, développer Ntando" , gifPlayback : true }, { quoted: ms });
        }
        catch (e) {
            console.log("🥵🥵 Menu erreur " + e);
            repondre("🥵🥵 Menu erreur " + e);
        }
    } 
    // Vérification pour .jpeg ou .png
    else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
        try {
            zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis _subzero_, développer Ntando" }, { quoted: ms });
        }
        catch (e) {
            console.log("🥵🥵 Menu erreur " + e);
            repondre("🥵🥵 Menu erreur " + e);
        }
    } 
    else {
        repondre(infoMsg + menuMsg);
    }
});
