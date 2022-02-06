module.exports = {
  name: "continue", 
  description: "Durdurulmuş şarkıya devam eder.",
  execute (client, message, args) {
      const { channel } = message.member.voice;
    if (!channel) {
      return message.channel.send("**You must be on any audio channel.**");
    }
    const serverQueue = message.client.queue.get(message.guild.id);
    if(!serverQueue) return message.channel.send('**No song being played.**')
    if(serverQueue.playing) return message.channel.send(`There is no standing song.`)
 if(serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume(true)
  
  return message.channel.send("✅ **| The paused song resumed.**") 
 } 
    
    message.channel.send("**There is no paused song.**")
    
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [''],
  permLevel: 0,
  kategori: 'Müzik'
};