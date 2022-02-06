const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
module.exports = {
  name: "invite",
  description: "Botu sunucuna davet eder", 
  execute(client, message) {
  message.channel.send(new Discord.MessageEmbed()
                      .setDescription(
    `
\[Click here to add the bot to your server.](https://discord.com/api/oauth2/authorize?client_id=920043470968750101&permissions=8&scope=bot)\n
`)
                       .setColor("ffc300")
                      )    
}
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [''],
  permLevel: 0,
  kategori: 'Müzik'
};