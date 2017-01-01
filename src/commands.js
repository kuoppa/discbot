const commands = require("./../resources/commands.json");
const db = require("./../resources/database.json");
var fs = require('fs');

class Commands {
  constructor(bot) {
    this.bot = bot;

    this.bot.on("message", msg => this.relay(msg));
  }

  relay(msg) {
    if (msg.author.bot) {
      return; 
    }

    var cmd = commands.command_prefix

    if (!msg.content.startsWith(cmd)) {
      return; 
    }

    var message = msg.content.substring(1).toLowerCase();

    for (var command of commands.commands) {
      var trigger = false;
      if (message.startsWith("set")) {
        if (message.startsWith(command.command.toLowerCase())) {
          var splitted = message.split(command.command.toLowerCase());
          var splitted = splitted.pop();
          if (splitted.trim() != "") {
            message = splitted;
            trigger = true;
          }
        }
      } else {
        trigger = command.command.toLowerCase() === message;
      }

      if (trigger) {
        var response = command.response;
        if (typeof response === "object") {
          if (response.type === "api") {
            this.relayAsApi(response, message, msg);
          }

          if (response.type === "function") {
            this.relayAsFunction(response, message, msg);
          }
        }

        if (typeof response === "string") {
          msg.channel.sendMessage(eval(response));
        }
        return;
      }
    }
  }

  help(args, message, orig) {
    var help = ``;
    for (var command of commands.commands) {
      help += `**${commands.command_prefix}${command.command}:** ${command.description}\n\n`;
    }
    orig.author.sendMessage(help);
  }

  setter(args, message, orig) {
    db[args.name] = message;
    fs.writeFile(__dirname + "/../resources/database.json", JSON.stringify(db), function(err) {
      if(err) {
          return console.log(err);
      }
    });
  }

  relayAsFunction(response, message, orig) {
    this[response.function](response.args, message, orig);
  }

  relayAsApi(response, message, orig) {
    var http = require('http');
    var apiUrl = response.api;
    var url = require('url');

    if (url.parse(apiUrl).protocol == "https:") {
      http = require('https');
    }

    http.get(apiUrl, function(res){
      var body = '';

      res.on('data', function(chunk){
        body += chunk;
      });

      res.on('end', function(){
        var msg = JSON.parse(body);

        for (var arg of response.args) {
          msg = msg[arg];
        }

        orig.channel.sendMessage(msg);
      });
    }).on('error', function(e){
      console.log("Error requesting api: ", e);
    });
  }

}

module.exports = Commands;
