const { EventBuilder } = require('handler.djs');

module.exports = new EventBuilder()
    .setEvent('ready')
    .setExecution(Execute)

async function Execute(interaction) {
    console.log(`${interaction.user.username} is ready 😀`);
}