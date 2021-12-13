module.exports = {
  name: "durdur",
  description: "Çalan şarkıyı durdurur.",
  execute (client, message, args) {
  const { channel } = message.member.voice;
    if (!channel) {
    
      return message.channel.send("**Herhangi bir ses kanalında bulunmalısınız.**");
    }
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send("**Duraklatabileceğim bir şarkı bulamadım.**");
    }
    if(!serverQueue.playing) return message.channel.send('**Şarkılar Zaten Duraklatılmış.**')
    if(serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause(true)
      
      return message.channel.send("✅ **| Oynatılan şarkı duraklatıldı.**")
  }  
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [''],
  permLevel: 0,
  kategori: 'Şarkı'
};