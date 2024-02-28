const {} = require("discord.js");
const { CommandBuilder, Message } = require("handler.djs");
const { createEmbed } = require("../../modules");
require("dotenv").config();

/**
 * @param { Message } message
 */

module.exports = new CommandBuilder()
  .setName("set")
  .setCooldown("10s")
  .OwnersOnly()
  .setMessageExecution(messageExecute);

async function messageExecute(message) {
  const args = message.content.split(" ");
  const db = message.getData("db");
  if (message.content === "-set") {
    const set = ["Essential", "Standard", "Premium", "Professional"];
    let cmdBody = "";
    set.forEach((el) => (cmdBody += `${el}\n`));
    const embed = createEmbed(
      "Set Command",
      `- **Commands**\n${cmdBody}\n- **To use set command**` +
        "```-set (command) (price)```\n- **Example**\n```-set priceEssential 80```",
      "Random",
      null,
      true,
      null,
      message.guild.iconURL()
    );
    message.reply({ embeds: [embed] });
    return;
  }

  // prices
  let prices = db.get("prices");
  let findPrices = prices.find((el) => el.name === args[1]);
  if (findPrices) {
    findPrices = findPrices.cost = parseFloat(args[2]);
    db.set("prices", prices);
    const iconURL = message.guild.iconURL();
    const priceChannel = message.guild.channels.cache.get(
      process.env.idPriceChannel
    );
    const priceMsg = await priceChannel.messages.fetch(process.env.idPriceMsg);
    let levels = ""
    for (el of prices) {
      levels += `- **[ ${el.name} ]**\n${el.amount}GB ~ ${el.cost}EGP\n\n`
    }
    const embed = createEmbed(
      "Configs Price",
      `${levels}\n\n[ <:wifi:1210551212886458419> Working ] : <:We:1210518367417405451> <:Etisalat:1210518515795103776>\n\n[ <:Visa:1210514910425911337> Payment ] : <:vodafone:1210517934380945438> <:We:1210518367417405451> <:Etisalat:1210518515795103776> <:Orange:1210518276719911022>`,
      "DarkPurple",
      null,
      false,
      { iconURL: iconURL, text: "Dark WE ~ Price" },
      iconURL
    );
    await priceMsg.edit({ embeds: [embed] });
    message.reply("<:e:1210348451188052048> **Saved**")
  }
}
