const Discord = require('discord.js');
const client = new Discord.Client();

client.on('message', message => {
  if (!message.content.startsWith('/')) return; // Ignore messages that don't start with a slash

  const args = message.content.slice(1).split(/ +/);
  const command = args.shift().toLowerCase();

  try {
    // Load the command module and call the run function
    const commandModule = require(`./commands/${command}.js`);
    commandModule.run(client, message, args);
  } catch (error) {
    console.error(error);
    message.channel.send(`There was an error executing the command: ${error.message}`);
  }
});

client.login(process.env.TOKEN)
