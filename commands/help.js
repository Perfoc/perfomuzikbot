const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
module.exports = {
  name: "help",
  description: "Komutları gösterir.", 
  execute(client, message) {
  message.channel.send(new Discord.MessageEmbed()
                      .setDescription(
    `
\`${ayarlar.PREFIX}play <song-name/url>\` : **Plays a Song.** \n
\`${ayarlar.PREFIX}skip\` : **Skips to next song.**\n
\`${ayarlar.PREFIX}pause\` : **Stop the song.**\n
\`${ayarlar.PREFIX}continue\` : **Resumes the stopped song.**\n
\`${ayarlar.PREFIX}queue\` : **Shows the song queue.**\n
\`${ayarlar.PREFIX}stop\` : **Deletes the bot's queue and leaves the room.**\n
\`${ayarlar.PREFIX}song\` : **Says the name of the song being played.**\n
\`${ayarlar.PREFIX}invite\` : **Drops bot invite link.**\n
\`${ayarlar.PREFIX}yardım\` : **Türkçe yardım menüsü.**\n
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