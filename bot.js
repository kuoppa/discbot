var Discord = require("discord.js");
var bot = new Discord.Client();

const setting = require("./src/disc-token.json");
const ddif = require('return-deep-diff');

const commands = {
  "help" : "Shows available commands",
  "team" : "Shows current members in the Super Mega Team in dota 2",
  "yee"  : "You know.."
};

bot.on("message", msg => {
  prefix = "!";
  if(msg.author.bot) return;
  if (msg.content.startsWith(prefix+"yee")) {
    msg.channel.sendMessage("<:yee:245162008020779008>  ");
  }

  if(msg.content.startsWith('@Dominatrix')){
    msg.channel.sendMessage("Did I tell you that you could speak to me?");
  }

  if (msg.content.startsWith(prefix+"help")) {
    var helpMessage = ""
    for(var c in commands){
      helpMessage += "**"+prefix+c+"**    : "+commands[c]+"\n";
    }
    msg.channel.sendMessage(helpMessage);
  }

  if (msg.content.startsWith("!team")) {
    var thing = msg.channel.fetchPinnedMessages()
    Promise.resolve(thing).then(function(value) {
      var content = Array.from(value)[0][1].content
      msg.channel.sendMessage(content);
    }, function(value) {
      // not called
    });
  }
});

bot.on('guildCreate', guild => {
  guild.defaultChannel.sendMessage('-- Obey me, or I will ban you with my whip! --');
})

bot.on('guildMemberAdd', member => {
  let guild = member.guild;
  guild.defaultChannel.sendMessage('Säg hej till '+member.user.username+"!")
})

bot.on('guildMemberRemove', member => {
  let guild = member.guild;
  guild.defaultChannel.sendMessage(member.user.username+" stack.. ("+new Date()+")")
})

bot.on('guildMemberUpdate', (oMember, nMember) => {
  var change = ddif(oMember, nMember);
  let guild = nMember.guild;

  if(change.nickname){
    guild.defaultChannel.sendMessage(oMember.user.username+" heter nu "+nMember.nickname);
  }


  //console.log(nMember.guild.roles);


})

bot.on('ready', () => {
  bot.user.setGame('Half Life 3');
  console.log('I am ready!');
});
console.log('ff');
bot.login(setting.token);
//bot.logout();
//bot.disconnect();
/*bot.logout()
.then(() => {
console.timeEnd("logout");
process.exit(0);
});
*/
