
getAdvice = function(msg) {
  var http = require('http');
  var url = 'http://api.adviceslip.com/advice';

  http.get(url, function(res){
    var body = '';

    res.on('data', function(chunk){
      body += chunk;
    });

    res.on('end', function(){
      var response = JSON.parse(body);

      msg.channel.sendMessage(response.slip.advice);
    });
  }).on('error', function(e){
    console.log("Advice got an error: ", e);
  });
}
