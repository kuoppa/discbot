const commands = {
  "help" : "Shows available commands",
  "team" : "Shows current members of the SuperMegaTeam in dota 2",
  "yee"  : "You know..",
  "ping" : "Pings the members of Super Mega Team",
  "joke" : "Joke there is.."
};

messages = function(bot, msg) {
  prefix = "!";

  if(msg.author.bot) return;
  if (msg.content.startsWith(prefix+"yee")) {
    msg.channel.sendMessage("<:yee:245162008020779008>  ");
  }


  if(msg.content.content('<@263313776554672128>')){
    msg.channel.sendMessage("Did I tell you that you were allowed to talk to me? taste my whip!");
  }


  if(msg.content.startsWith(prefix+'joke')){
    msg.channel.sendMessage("I don't tell jokes..");
  }

  //Todo: This isn't working for some reason.
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
      helpMessage += "**"+prefix+c+"** "+commands[c]+"\n\n";
    }
    msg.author.sendMessage(helpMessage);
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


}
