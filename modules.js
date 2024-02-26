const { EmbedBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const createEmbed = function (
  Title = " ",
  Description = " ",
  Color = "Random",
  Fields,
  Timestamp = false,
  Footer,
  Thumbnail,
  ImageEmbed
) {
  const embed = new EmbedBuilder()
    .setTitle(Title)
    .setDescription(Description)
    .setColor(Color);

  if (Fields) embed.addFields(Fields);
  if (Timestamp) embed.setTimestamp();
  if (Footer) embed.setFooter(Footer);
  if (Thumbnail) embed.setThumbnail(Thumbnail);
  if (ImageEmbed) embed.setImage(ImageEmbed);

  return embed;
};

const createButton = function (
  Id = " ",
  Label = " ",
  Style,
  Emoji,
  Disabled = false,
  Link
) {
  const button = new ButtonBuilder()
    .setCustomId(Id)
    .setLabel(Label)
    .setStyle(Style)
    .setDisabled(Disabled);

  if (Emoji) button.setEmoji(Emoji);
  if (Link) button.setURL(Link);

  return button;
};
module.exports = { createEmbed, createButton };
