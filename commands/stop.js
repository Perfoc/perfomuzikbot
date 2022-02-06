module.exports = {
  name: "stop",
  description: "Botu kapatır", 
  execute(client, message) {
    const queue = message.client.queue.get(message.guild.id);
      queue.channel.leave();
      return queue.textChannel.send("The playlist and bot debuted on the audio channel.")
    }}