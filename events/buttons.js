const {
  EmbedBuilder,
  ChannelType,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");
const { EventBuilder } = require("handler.djs");
const { createEmbed, createButton } = require("../modules");

require("dotenv").config();

module.exports = new EventBuilder()
  .setEvent("ButtonClick")
  .setExecution(Execute);


async function Execute(interaction) {
  if (!interaction.customId) return;
  
  // Open Ticket
  if (interaction.customId === "order") {
    let username = interaction.user.username;
    username = username.replaceAll(".", "");
    username = username.replaceAll("_", "");

    const channelCheck = await interaction.guild.channels.cache.find(
      (channel) => `${channel.name}` === username
    );
    const _201 = createEmbed(" ", "لديك تذكرة مفتوحة بالفعل", "Red");
    if (channelCheck)
      return interaction.reply({ embeds: [_201], ephemeral: true });

    const newChannel = await interaction.guild.channels.create({
      name: username,
      type: ChannelType.GuildText,
      parent: process.env.categoryTickets,
      permissionOverwrites: [
        { id: interaction.user.id, allow: ["ViewChannel", "SendMessages"] },
        { id: "1210272758429130792", deny: ["ViewChannel"] },
      ],
    });
    const _404 = createEmbed(
      " ",
      `**تم انشاء التذكرة بنجاح <#${newChannel.id}>**`,
      "Green"
    );
    interaction.reply({ embeds: [_404], ephemeral: true });

    const ticketEmbed = createEmbed(
      `${interaction.user.globalName}'s Ticket`,
      `Welcome ${interaction.user.globalName}\nقم بكتابة الباقة التي تريد ان تشترك فيها وانتظر الرد من الدعم`,
      "Random",
      null,
      true,
      null,
      interaction.user.avatarURL()
    );
    const mentionButton = createButton(
      "mentionStaffs",
      "Mention Staffs",
      ButtonStyle.Secondary,
      "📢"
    );
    const deleteButton = createButton(
      "deleteChannel",
      "Delete",
      ButtonStyle.Danger,
      "🔒"
    );
    const rows = new ActionRowBuilder().addComponents([
      mentionButton,
      deleteButton,
    ]);

    newChannel.send({ embeds: [ticketEmbed], components: [rows] });
  }

  // Mention Staffs
  if (interaction.customId === "mentionStaffs") {
    interaction.channel.send({ content: "<@&1210272805531418684>" })
    const mentionButton = createButton(
      "mentionStaffs",
      "Mention Staffs",
      ButtonStyle.Secondary,
      "📢",
      true
    );
    const deleteButton = createButton(
      "deleteChannel",
      "Delete",
      ButtonStyle.Danger,
      "🔒"
    );
    const rows = new ActionRowBuilder().addComponents([
      mentionButton,
      deleteButton,
    ]);
    interaction.update({ components: [rows] })
  }

  // Delete
  if (interaction.customId === 'deleteChannel') interaction.channel.delete();

  // Steps (PC)
  if (interaction.customId === "stepsPC") {
    interaction.reply({ files: [{ attachment: "../steps/PC.mp4", name: "PC" }] })
  }
}
