// Run dotenv
require('dotenv').config();

const https = require('https');
const Discord = require('discord.js');
const Fuse = require('fuse.js');
const client = new Discord.Client();
const httpsOptions = {
    hostname: 'icanhazdadjoke.com',
    port: 443,
    path: '/',
    method: 'GET',
    headers: {
        'Accept': 'text/plain',
        'User-Agent': 'Its NOT Corona Time Discord Bot (https://github.com/reztierk/its-not-corona-time-discord-bot)'
    }
};

const fuseOptions = {
    useExtendedSearch: true,
    threshold: 0.2,
    location: 0,
    distance: 2000,
    maxPatternLength: 25,
    minMatchCharLength: 5,
    keys: [
        "content"
    ]
};

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    let msgContent = [{content: msg.content.toLowerCase().replace(/\s/g,'')}];
    let fuse = new Fuse(msgContent, fuseOptions);
    if (fuse.search('corona|covid|cov-19').length && msg.author.username !== 'It\'s NOT Corona Time') {
        msg.delete();
        req = https.request(httpsOptions, res => {
            console.log(`statusCode: ${res.statusCode}`);
            res.on('data', d => {
                console.log(d.toString());
                msg.reply('~~' + msg.content + '~~');
                msg.reply('This is a Corona free zone, try out a nice dad joke instead: \n***' + d.toString() + '***');
            })
        });
        req.on('error', error => {
            console.error(error)
        });
        req.end();
    }
});

client.login(process.env.DISCORD_TOKEN);
