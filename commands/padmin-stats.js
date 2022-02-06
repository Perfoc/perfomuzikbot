const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
module.exports = {
  name: "padmin-stats",
  description: "İstatistik.",
  execute: (client, message, args) => {
        if(message.author.bot) return;
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle("İstatistikler")
            .addField(" \u200B ", "**Toplan kanal:** : ` " + `${client.channels.cache.size}` + " `")
            .addField(" \u200B ", "**Toplam sunucu:** : ` " + `${client.guilds.cache.size}` + " `")
            .addField(" \u200B ", "**Toplam kullanıcı:** : ` " + `${client.users.cache.size}` + " `")
        message.channel.send(exampleEmbed);
    }
}