module.exports = {
  name: "şarkı",
  description: "Anlık çalan şarkıyı gösterir",
  execute (client, message, args) {
    
      const { channel } = message.member.voice;
    if (!channel) {
      return message.channel.send("**Herhangi bir ses kanalında bulunmalısınız.**");
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send("**Herhangi bir şarkı oynatmıyorum.**");
    }
    message.channel.send('**Şuanda Oynatılan Şarkı. - **' + serverQueue.songs[0].title)

    
    
    
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [''],
  permLevel: 0,
  kategori: 'Müzik'
};