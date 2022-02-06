  
const { Util } = require("discord.js");
const { YOUTUBE_API_KEY } = require("../ayarlar.json");
const ytdl = require("ytdl-core");
const YoutubeAPI = require("simple-youtube-api");
const youtube = new YoutubeAPI(YOUTUBE_API_KEY);
const Discord = require('discord.js')
const { play } = require("../system/music-en.js") 
module.exports = {
  name: "play",
  description: "Botu odaya çağırır ve şarkı oynatmaya başlar.",
  async execute(client, message, args) {

    if (!args.length) {
      return message.channel.send("**You have to enter the song name or url.**");
    }
    
    const { channel } = message.member.voice;
    if (!channel) {
      
      return message.channel.send("**You must be on any audio channel.**");
    }



    const targetsong = args.join(" ");
    const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
    const playlistPattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
    const urlcheck = videoPattern.test(args[0]);

    if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
      return message.channel.send("**The playlist cannot be played.**");
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    const queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      loop: false,
      volume: 100,
      playing: true
    };

    let songData = null;
    let song = null;

    if (urlcheck) {
      try {
         
         const result = await youtube.searchVideos(args[0], 1)
         if(!result[0]) return message.channel.send('**Wrong url.**')
        songData = await ytdl.getInfo(result[0].url,{});
       
        console.log(songData)
        song = {
           title: songData.videoDetails.title,
           url: songData.videoDetails.video_url,
           duration: songData.videoDetails.lengthSeconds,
           thumbnail : songData.videoDetails.thumbnails[0].url,
           author : songData.videoDetails.author.name,
           wiews : songData.videoDetails.viewCount,
          likes : {
          trues : songData.videoDetails.likes.toLocaleString()
         // falses :songData.videoDetails.dislikes.toLocaleString()
         }
        };

      } catch (error) {
        if (message.include === "copyright") {
          return message
            .reply("**This video cannot be played due to copyright reasons.**")
            .catch(console.error);
        } else {
          console.error(error);
        }
      }
    } else {
      try {
         const result = await youtube.searchVideos(targetsong, 1)
        if(!result[0]) return message.channel.send('**No search results found.**')
        songData = await ytdl.getInfo(result[0].url)
         song = {
           title: songData.videoDetails.title,
           url: songData.videoDetails.video_url,
           duration: songData.videoDetails.lengthSeconds,
           thumbnail : songData.videoDetails.thumbnails[0].url,
           author : songData.videoDetails.author.name,
           wiews : songData.videoDetails.viewCount,
          likes : {
          trues : songData.videoDetails.likes.toLocaleString()
          //falses :songData.videoDetails.dislikes.toLocaleString()
         }
  
        };

      } catch (error) {
        console.error(error)
      }
    }
    
    if(serverQueue) {
      serverQueue.songs.push(song)
      return serverQueue.textChannel.send( new Discord.MessageEmbed()
        .setAuthor('Added to Queue!',message.author.avatarURL({format : "png",dynamic : true}))
        .setTitle(song.title)
        .setURL(song.url)
        .setThumbnail(song.thumbnail)
        .addField('Channel',song.author,true)
        .addField('Song Second',song.duration,true)
        .addField('Views',song.wiews.toLocaleString(),true)
        .addField('Like 👍',song.likes.trues,true))
      .catch(console.error)
    } else {
      queueConstruct.songs.push(song);
    }
    if(!serverQueue) message.client.queue.set(message.guild.id, queueConstruct)
    
     if (!serverQueue) {
      try {
    
        queueConstruct.connection = await channel.join();
        play(song, message)
      } catch (error) {
        console.error(`Could not join voice channel: ${error}`);
        message.client.queue.delete(message.guild.id);
        await channel.leave();
      }
    }
    
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [''],
  permLevel: 0,
  kategori: 'Müzik'
};