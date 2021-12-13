const discord = require("discord.js")

const client = new discord.Client({ disableEveryone: true, disabledEvents: ["TYPING_START"] });
const { readdirSync } = require("fs");
const { join } = require("path");
const ayarlar = require("./ayarlar.json")
client.on("ready", () => {
  console.log('Bot aktif')
  client.user.setActivity("m.yardim | Perfonline 💙", {
  type: "STREAMING",
  url: "https://www.twitch.tv/perfonline"
});
})
client.on("warn", info => console.log(info));

client.on("error", console.error)

client.commands = new discord.Collection()
client.prefix = ayarlar.prefix
client.queue = new Map();

const cmdFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"))
for (const file of cmdFiles) {
  const command = require(join(__dirname, "commands", file))
  client.commands.set(command.name, command)
} 


client.on("message", message => {
   if (message.author.bot) return;
  if (!message.guild) return;
  
  if(message.content.startsWith(ayarlar.prefix)) {
    
    const args = message.content.slice(ayarlar.prefix.length).trim().split(/ +/)
    const command = args.shift().toLowerCase();
    
    if(!client.commands.has(command)) {
      return;
    } 
  try  { 
      client.commands.get(command).execute(client, message, args)
    } catch (err) { 
      console.log(err)
      message.reply("Bir hata oluştu!")
    }
    
  }
});

client.login(process.env.TOKEN)