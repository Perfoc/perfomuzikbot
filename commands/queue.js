module.exports = {
  name: "queue",
  description: "Kuyrukta bulunan şarkıları gösterir.",
  execute: (client, message, args) => {
    const { channel } = message.member.voice;
    if (!channel) {
      return message.channel.send("**You must be on any audio channel.**");
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send("**I couldn't find any songs in the queue.**");
    } 

    message.channel.send(
      `${serverQueue.songs
        .map((song, index) => index + 1 + ". " + song.title)
        .join("\n\n")}`,
      { split: true }
    );
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [''],
  permLevel: 0,
  kategori: 'Müzik'
};