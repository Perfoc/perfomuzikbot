module.exports = {
  name: "pause",
  description: "Çalan şarkıyı durdurur.",
  execute (client, message, args) {
  const { channel } = message.member.voice;
    if (!channel) {
    
      return message.channel.send("**You must be on any audio channel.**");
    }
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send("**I couldn't find a song to pause.**");
    }
    if(!serverQueue.playing) return message.channel.send('**Songs Already Paused.**')
    if(serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause(true)
      
      return message.channel.send("✅ **| The playing song is paused.**")
  }  
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [''],
  permLevel: 0,
  kategori: 'Müzik'
};