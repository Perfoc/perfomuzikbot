module.exports = {
  name: "kapat",
  description: "Botu kapatır", 
  execute(client, message) {
    const queue = message.client.queue.get(message.guild.id);
      queue.channel.leave();
      return queue.textChannel.send("Şarkı listesi kapatıldı ve bot sesli kanaldan çıkış yaptı.")
    }}