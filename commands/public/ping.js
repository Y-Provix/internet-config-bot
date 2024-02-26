const { CommandBuilder } = require("handler.djs");
const {
  SlashCommandBuilder,
  EmbedBuilder
} = require("discord.js");
const { createEmbed, createButton } = require("../../modules");
const fs = require("fs");
const path = require("path");
const videoFilePath = path.join(__dirname, "..", "..", "steps/PC.mp4");
module.exports = new CommandBuilder()
  .setName("ping")
  .setDescription("Test the bots response time.")
  .setCooldown("10s")
  .InteractionOn(new SlashCommandBuilder().setDMPermission(false))
  .setMessageExecution(interactionExecution)
  .setInteractionExecution(interactionExecution);

/**
 * @param {Message} message
 */

async function interactionExecution(message) {
  console.log(message);
  let now = message ? message.createdTimestamp : interaction.createdTimestamp;
  const controller = message ?? interaction;
  const msg = await controller.reply({ content: "**🏓 Pong...**" });
  now = Date.now() - now;
  const embed = new EmbedBuilder()
    .setColor("DarkPurple")
    .setDescription(
      `**⏰ Discord API: ${controller.client.ws.ping}ms\n📊 Time Taken: ${now}ms**`
    )
    .setTimestamp();

  controller.editMsg = (obj) =>
    interaction ? interaction.editReply(obj) : msg.edit(obj);
  controller.editMsg({ content: "", embeds: [embed] });
}
