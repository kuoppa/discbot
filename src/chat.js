const emojis = {
  yee: "<:yee:245162008020779008>"
}

const conversation = [
  {
    triggers: ["where is everyone"],
    responses: ["i don't know", "why would i know?", "in space!", "somewhere thats not here"]
  },
  {
    triggers: ["what time is it"],
    responses: [
      function() {
        var currentdate = new Date(); 
        return  "It's "
                + currentdate.getHours() 
                + " O'Clock ...ish"
      },
      function() {
        var currentdate = new Date(); 
        return  "It's "
                + currentdate.getHours() + ":"
                + ((currentdate.getMinutes() < 10) ? ("0" + currentdate.getMinutes()) : currentdate.getMinutes())
      },
      "Is it really easier to write than to look at your clock?"
    ]
  },
  {
    triggers: [
      function() {
        var rnd = Math.floor(Math.random() * 200);

        return rnd == 124 ? true : false;
      }
    ],
    responses: [
      emojis.yee,
      "What are you talking about?",
      "haha thats so funny..."
    ]
  },
  {
    triggers: [
      function(msg) {
        if (msg.content.match(/(?:.*)?\:yee\:(?:.*)?/mig)) {
          var rnd = Math.floor(Math.random() * 10);
          return rnd == 4 ? true : false;
        }

        return false;
      }
    ],
    responses: [
      emojis.yee
    ]
  }
];

class Chat {
  constructor(bot) {
    this.bot = bot;

    this.bot.on("message", msg => this.relay(msg));
  }

  relay(msg) {
    if (msg.author.bot !== false) {
      return; 
    }

    for (var convo of conversation) {
      for (var trigger of convo.triggers) {
        var triggered = false;
        if (typeof trigger === "function") {
          triggered = trigger(msg);
        } else {
          if (!msg.content.startsWith('<@' + this.bot.user.id + '>')) {
            if (!msg.content.endsWith('<@' + this.bot.user.id + '>')) {
              continue;
            }
          }

          triggered = msg.content.match(trigger)
        }

        if (triggered) {
          var randomResponse = Math.floor(Math.random() * convo.responses.length);
          var response = convo.responses[randomResponse];

          if (typeof response === "function") {
            response = response();
          }

          if (typeof response !== "undefined") {
            msg.channel.sendMessage(response);
          }
        }
      }
    }
  }

}

module.exports = Chat;
