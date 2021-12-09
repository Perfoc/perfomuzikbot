const Discord =require('discord.js')

const client= new Discord.Client();

const ytdl=require('ytdl-core')

const servers={

}
let server=undefined;

const play=async(connection,message)=>{
    const server=servers[message.guild.id];
    const stream=ytdl(server.queue[0],{
        filter:"audioonly",
        quality:"highestaudio"
    })
    server.dispatcher = connection.play(stream);
    let song=await (await ytdl.getInfo(server.queue[0])).videoDetails.title;
    server.dispatcher.on("finish",()=>{
        server.queue.shift();
        if(server.queue[0]){
            message.channel.send("Şarkı çalınıyor: "+song)
            play(connection,message)
        }
        else connection.disconnect();
    })
}

client.on("message",message=>{
  client.user.setActivity("m.yardım | Perfonline 💙", {
  type: "STREAMING",
  url: "https://www.twitch.tv/perfonline"
});
    const parsedMessage=message.content.split(" ") //!oynat URL

    switch (parsedMessage[0]) {
        case "m.oynat":
            if(!parsedMessage[1]){
            message.channel.send("Link girmelisiniz!")
            return;
            }

            if(!message.member.voice.channel){
            message.channel.send("Ses kanalı olmalıdır!")
                return;
            }

            if(!servers[message.guild.id])
            servers[message.guild.id]={
                queue:[]
            }

            server=servers[message.guild.id]
            server.queue.push(parsedMessage[1])

            if(server.queue.length<=1)
            try{
                message.member.voice.channel.join().then(connection=>{
                    play(connection,message)
                })
            }catch(e){
                console.log("hata oluştu"+e)
            }
            break;
        case "m.gec":
            if(server.dispatcher)server.dispatcher.end();
            break;
        case "m.dur":
            if(message.guild.voice.channel){
                server.dispatcher.end()
                console.log("kuyruk durduruldu")
            }
            if(message.guild.connection)
            message.guild.voice.connection.disconnect();
            break;
        case "m.yardım":
                let lem = new Discord.MessageEmbed()
  .setAuthor('Müzik', message.author.displayAvatarURL())
  .setColor('#2667FF')
  .setFooter('Bu komutu kullanan kullanıcı ' + message.author.tag, message.author.displayAvatarURL())
   .setDescription(`:white_small_square: - **m.oynat** ` + "Odaya çağırır ve şarkıyı oynatmaya başlar. \n" +
   `:white_small_square: - **m.gec** ` + "Çalan şarkıyı geçip sıradakini oynatmaya başlar. \n" +
   `:white_small_square: - **m.dur** ` + "Çalan şarkıyı ve sırayı kapatır."
   )
        .addField("» Linkler", ` [Davet Et](https://discord.com/oauth2/authorize?client_id=917952080986112043&permissions=8&scope=bot)` + "** | **" + `[Destek Sunucusu](https://discord.perfolive.ml)`  + "** | **" + `[Twitch](https://twitch.tv/perfonline)`  + "** | **" + `[Web Sitesi](https://perfolive.ml/)  `, false)
              message.channel.send(lem)
            break;
        default:
            break;
    }
})

client.login(process.env.TOKEN);