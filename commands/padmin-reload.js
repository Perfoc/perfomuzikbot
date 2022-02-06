module.exports = {
  name: "padmin-reload",
  description: "Reboot.",
execute: (client, message, args) => {
  if(message.author.bot) return;
    let command;
    if (client.commands.has(args[0])) {
      command = args[0];
    } else if (client.aliases.has(args[0])) {
      command = client.aliases.get(args[0]);
    }
    if (!command) {
      return message.channel.send("`" + args[0] + "` adında bir komut yok.");
   } else {
      message.channel.send("`" + command + "` adlı komut yeniden başlatılıyor...")
        .then(m => {
         client.reload(command)
           .then(() => {
            m.edit("`" + command + "` adlı komut başarıyla yeniden başlatıldı.");
           })
           .catch(e => {
             m.edit(`Komut yeniden başlatılırken bir hata oluştu: ${command}\n\`\`\`${e.stack}\`\`\``);
           });
       });
   }
}
};