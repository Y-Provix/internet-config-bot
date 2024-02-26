const { SlashCommandBuilder } = require("discord.js");
const { CommandBuilder } = require("handler.djs");
const { createEmbed } = require("../../modules");


module.exports = new CommandBuilder()
  .setName("emojis")
  .setDescription("To get all emojis is server.")
  .setCooldown("10s")
  .OwnersOnly()
  .InteractionOn(new SlashCommandBuilder().setDMPermission(false))
  .setMessageExecution(messageExecute)
  .setInteractionExecution(InteractionExecution);

async function messageExecute(message) {
  let msg = "";
  const emojis = message.guild.emojis.cache.map((e) => {
    msg += `${e} **-** \` ${e.id}\`\n`;
  });
  const embed = createEmbed("Server's Emojis", msg, "Random", null, true);
  message.replyNoMention({ embeds: [embed] });
}
async function InteractionExecution(interaction) {
  let msg = "";
  const emojis = interaction.guild.emojis.cache.map((e) => {
    msg += `${e} **-** \` ${e.id}\`\n`;
  });
  const embed = createEmbed("Server's Emojis", msg, "Random", null, true);
  interaction.replyNoMention({ embeds: [embed] });
}