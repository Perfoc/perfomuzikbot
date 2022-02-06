module.exports = {
  name: "song",
  description: "Anlık çalan şarkıyı gösterir",
  execute (client, message, args) {
    
      const { channel } = message.member.voice;
    if (!channel) {
      return message.channel.send("**You must be on any audio channel.**");
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send("**I am not playing any songs.**");
    }
    message.channel.send(serverQueue.songs[0].title + ' - **Currently Playing Song.**')

    
    
    
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [''],
  permLevel: 0,
  kategori: 'Müzik'
};