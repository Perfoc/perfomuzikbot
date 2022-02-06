module.exports = {
  name: "skip",
  description: "Çalan şarkıyı kapatır ve sonraki şarkıyı açar.",
  execute(client, message, args) {
    const { channel } = message.member.voice;

    if (!channel) {
      return message.channel.send("**You must be on any audio channel.**");
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send("**There is no song I can skip.**");
    }
    serverQueue.connection.dispatcher.end();
    message.channel.send("✅ **| Song passed.**");
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [''],
  permLevel: 0,
  kategori: 'Müzik'
};