const { EventBuilder } = require("handler.djs");
const { createEmbed } = require("../modules");
require("dotenv").config();

module.exports = new EventBuilder()
  .setEvent("guildMemberAdd")
  .setExecution(Execute);

async function Execute(interaction) {
  if (interaction.bot) return interaction.kick("No bots!");
  
  const embed = createEmbed(
    `<:e:1210344213615611965> Welcome ${interaction.user.globalName}`,
    `- <:e:1210551797299552286> مرحبا بالعضو رقم **${interaction.guild.memberCount}**\n- <:e:1210551212886458419> اشتري **كونفج** واحصل عل انترنت\n- <:e:1210341929191997481> <#1210280319761252382> لدينا افضل الاسعار هنا `,
    "Random",
    null,
    true,
    null,
    interaction.user.avatarURL()
  );
  interaction.guild.channels.cache
    .get(process.env.welcomeChannel)
    .send({ embeds: [embed] });
}
