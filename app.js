const { Client } = require("discord.js");
const { Application } = require("handler.djs");
const { join } = require("node:path");
const mongooose = require("mongoose");
const puppeteer = require("puppeteer");
const db = require("pro.db");
const { loginTelegram } = require("./telegram");
require("dotenv").config();

async function s() {
  const client = new Client({ intents: [process.env.intent] });
  mongooose.connection.on("connected", () => {
    console.log("Connected mongoose");
  });
  // await mongooose.connect(process.env.mongooseURL || null);
  new Application(client, {
    prefix: "-",
    owners: ["1210291955125321788", "848608724611235860", "922496123480993852"],
    commandsPath: join(__dirname, "commands"),
    EventsPath: join(__dirname, "events"),
  });

  
  client.Application.setData({ db: db, puppeteer: puppeteer });
  client.Application.build();
  client.login(process.env.token);
  
  const clientTelegram = await loginTelegram(puppeteer)
  client.Application.setData({ clientTelegram: clientTelegram });
}
s();
