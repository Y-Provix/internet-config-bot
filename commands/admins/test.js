const { CommandBuilder } = require("handler.djs");
const { createEmbed } = require("../../modules");



module.exports = new CommandBuilder()
  .setName("test")
  .setCooldown("10s")
  .OwnersOnly()
  .setMessageExecution(messageExecute)

async function messageExecute(message) {
    console.log("s");
    message.reply({ files: [videoFilePath] });
    console.log("e");
    const replyBot = await message.reply({
      content: "<a:e:1211607498474397777> **Loading video**",
    });
    if (fs.existsSync(videoFilePath)) {
      replyBot.delete();
    } else {
      replyBot.edit("Error");
    }
}