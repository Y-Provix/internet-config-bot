const { CommandBuilder } = require("handler.djs");
const { SlashCommandBuilder } = require("discord.js");
const { createEmbed } = require("../../modules");

module.exports = new CommandBuilder()
  .setName("server")
  .setDescription("To get all informations is server.")
  .setCooldown("10s")
  .InteractionOn(new SlashCommandBuilder().setDMPermission(false))
  .setInteractionExecution(Excute)
  .setMessageExecution(Excute);

/**
 * @param {Message} message
 */

async function Excute(message) {
  console.log(message);
  const guild = message.guild;

  const name = guild.name;
  const description = guild.description;
  const icon = guild.iconURL();

  const serverId = guild.id;
  const ownerId = guild.ownerId;
  const members = guild.memberCount;
  const joinedTimestamp = Math.floor(guild.joinedTimestamp / 1000);

  let allFields = [
    { name: "🆔 Server ID", value: serverId, inline: true },
    {
      name: "<:e:1211049830013730898> Owner",
      value: `<@${ownerId}>`,
      inline: true,
    },
    {
      name: "<:e:1211051454014431242> Create On",
      value: `<t:${joinedTimestamp}:R>`,
      inline: true,
    },
    {
      name: "<:e:1211052047546458174> Members",
      value: `${members} Members`,
      inline: true,
    },
  ];

  const embed = createEmbed(
    name,
    description,
    "Random",
    allFields,
    true,
    null,
    icon
  );
  message.replyNoMention({ embeds: [embed] });
}
