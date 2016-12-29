const setting = require("./../resources/disc.json");
var fs = require('fs');

const commands = {
  "help" : "Shows available commands",
  "team" : "Shows current members of the SuperMegaTeam in dota 2",
  "yee"  : "You know..",
  "ping" : "Pings target that is set by 'setPingTarget'",
  "joke" : "Joke there is..",
  "setPingTarget" : "sets the ping target",
  "advice": "You might get a good or at least not that bad advice."
  "chuck" : "Gives you the true fact about a Chuck Norris thingie."
};

messages = function(bot, msg) {
  prefix = "!";

  if(msg.author.bot) return;
  if (msg.content.startsWith(prefix+"yee")) {
    msg.channel.sendMessage("<:yee:245162008020779008>  ");
  }

  if(msg.content == '<@263313776554672128>'){
    msg.channel.sendMessage("Did I tell you that you were allowed to talk to me? taste my whip!");
  }

  if(msg.content.startsWith(prefix+'joke')){
    msg.channel.sendMessage("I don't tell jokes..");
  }

  if (msg.content.startsWith(prefix+"setPingTarget")) {
    var split = msg.content.split(" ");
    if (typeof split[1] !== "undefined") {
      setting.pingTarget = split[1];
    }
    fs.writeFile(__dirname + "/../resources/disc.json", JSON.stringify(setting), function(err) {
      if(err) {
          return console.log(err);
      }

      console.log("The file was saved!");
    });
  }

//Kanske vi kan göra detta lite bättre?
  if(msg.content.startsWith(prefix+'advice')){
    getAdvice(msg);
  }

  if(msg.content.startsWith(prefix+'chuck')){
    getNorris(msg);
  }

  if (msg.content.startsWith(prefix+"ping")) {
    msg.channel.sendMessage(`${setting.pingTarget} ASSEMBLE!.`);
  }

  if (msg.content.startsWith(prefix+"help")) {
    var helpMessage = ""
    for(var c in commands){
      helpMessage += "**"+prefix+c+"** "+commands[c]+"\n\n";
    }
    msg.author.sendMessage(helpMessage);
  }

  if (msg.content.startsWith(prefix+"!team")) {
    var thing = msg.channel.fetchPinnedMessages()
    Promise.resolve(thing).then(function(value) {
      var content = Array.from(value)[0][1].content
      msg.channel.sendMessage(content);
    }, function(value) {
      // not called
    });
  }


}
