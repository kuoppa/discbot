var Discord = require("discord.js");
var bot = new Discord.Client();

const setting = require("./src/disc.json");
const ddif = require('return-deep-diff');

const commands = {
  "help" : "Shows available commands",
  "team" : "Shows current members of the SuperMegaTeam in dota 2",
  "yee"  : "You know..",
  "ping" : "Pings the members of Super Mega Team"
};

bot.on("message", msg => {
  prefix = "!";
  if(msg.author.bot) return;
  if (msg.content.startsWith(prefix+"yee")) {
    msg.channel.sendMessage("<:yee:245162008020779008>  ");
  }


  if(msg.content.startsWith('<@263313776554672128>')){
    msg.channel.sendMessage("Did I tell you that you were allowed to talk to me? taste my whip!");
  }

  if (msg.content.startsWith(prefix+"ping")) {
    for(var m in msg.member._roles){
      if(msg.member._roles[m] !== setting.smtid){
        msg.channel.sendMessage("@SuperMegaTeam");
      }
    }
  }


  if (msg.content.startsWith(prefix+"help")) {
    var helpMessage = ""
    for(var c in commands){
      helpMessage += "**"+prefix+c+"**\n"+commands[c]+"\n\n";
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
