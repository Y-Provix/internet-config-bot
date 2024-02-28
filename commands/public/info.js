const { CommandBuilder, Message } = require("handler.djs");
const { createEmbed } = require("../../modules");
const { getData } = require("../../telegram");
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
require("dotenv").config();

/**
 * @param { Message } message
 */

module.exports = new CommandBuilder()
  .setName("info")
  .setCooldown("30s")
  .OwnersOnly()
  .setMessageExecution(messageExecute);

async function messageExecute(message) {
  if (message.content.split(" ").length !== 2)
    return message.reply("```-info (Name)```");
  const id = message.author.id;
  const name = message.content.split(" ")[1];
  const db = message.getData("db");
  let requisites = db.get("requisites");
  let waitMsg;
  console.log(requisites.length);

  for (let u = 0; u < requisites.length; u++) {
    if (requisites[u].id === id && requisites[u].name === name)
      return message.reply("You waiting your data!");
  }

  // ------------------------------------------------------------------- \\
  const sendData = async () => {
    if (waitMsg) waitMsg.delete();
    const clientTelegram = message.getData("clientTelegram");
    const body = await getData(clientTelegram, message);
    if (!body.status) return deleteUser();
    const embed = createEmbed(
      "Info",
      `
    **[ <:e:1211050505174786139> Username ]: **${body.Email}\n
    **[ <:e:1210509603297820732> Enabled ]: **${body.Enabled}\n
    **[ <:e:1210551212886458419> Connection status ]: **${body.Connection_status}\n
    **[ <:e:1211959215451545670> Active ]: **${body.Active}\n
    **[ <:e:1211051454014431242> Expire Date ]: **${body.Expire_Date}\n\n
    **[ 🔼 Upload ]: **${body.Upload}\n
    **[ 🔽 Download ]: **${body.Download}\n
    **[ 📊 Total: ]: **${body.Total}
    `,
      "Random",
      null,
      true,
      null,
      message.guild.iconURL()
    );
    await body.replyLoading.edit({ content: " ", embeds: [embed] });
    deleteUser();

    function deleteUser() {
      requisites = db.get("requisites");
      for (let u = 0; u < requisites.length; u++) {
        if (requisites[u].id === id && requisites[u].name === name) {
          requisites.splice(u, 1);
        }
      }
      db.set("requisites", requisites);
    }
  };
  // ------------------------------------------------------------------- \\

  if (requisites.length === 0) {
    sendData();
    requisites.push({ id: id, name: name });
    db.set("requisites", requisites);
    return;
  }

  let NumUser = requisites.length;
  requisites.push({ id: id, name: name });
  db.set("requisites", requisites);
  waitMsg = await message.reply(
    `<a:e:1211607498474397777> **Waiting ${NumUser} users**`
  );

  for (let i = 0; i <= 500; i++) {
    await sleep(1000);
    requisites = db.get("requisites");

    for (let u = 0; u < requisites.length; u++) {
      if (requisites[u].id === id && requisites[u].name === name) {
        if (u === 0) {
          sendData();
          return;
        }
        let msg = `<a:e:1211607498474397777> **Waiting ${u} users**`;
        if (waitMsg.content !== msg)
          waitMsg.edit(`<a:e:1211607498474397777> **Waiting ${u} users**`);
      }
    }
  }
}
