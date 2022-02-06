module.exports = {
  name: "padmin-reboot",
  description: "Reboot.",
execute: (client, message, args) => {
	  if(message.author.bot) return;
      message.channel.send(`Bot yeniden başlatılıyor...`);
      process.exit(0);
    }
}