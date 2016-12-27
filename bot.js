var Discord = require("discord.js");
var bot = new Discord.Client();
require('./resources/messages.js');

var Chat = require('./src/chat.js');
new Chat(bot);

const setting = require("./src/disc.json");
const ddif = require('return-deep-diff');

bot.on("message", msg => {
  messages(bot, msg);
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
  console.log('I am online!');
});

bot.login(setting.token);
//bot.logout();
//bot.disconnect();
/*bot.logout()
.then(() => {
console.timeEnd("logout");
process.exit(0);
});
*/
