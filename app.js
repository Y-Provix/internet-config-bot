const { Client } = require('discord.js');
const { Application } = require('handler.djs');
const { join } = require('node:path');
const mongooose = require('mongoose');
const db = require('pro.db');
require('dotenv').config();
async function s() {
    const client = new Client({ intents: [ process.env.intent ] });
    mongooose.connection.on('connected', () => {
        console.log('Connected mongoose');
    });
   // await mongooose.connect(process.env.mongooseURL || null);
    console.log(["1210291955125321788", "848608724611235860", "922496123480993852"]);
    new Application(client, {
        prefix: '-',
        owners: ["1210291955125321788", "848608724611235860", "922496123480993852"],
        commandsPath: join(__dirname, 'commands'),
        EventsPath: join(__dirname, 'events')
    });

    client.Application.setData({ db: db })
    client.Application.build()
    client.login(process.env.token)
}s();