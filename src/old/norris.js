
getNorris = function(msg) {
  var http = require('https');
  var url = 'https://api.chucknorris.io/jokes/random';

  http.get(url, function(res){
    var body = '';

    res.on('data', function(chunk){
      body += chunk;
    });

    res.on('end', function(){
      var response = JSON.parse(body);
      msg.channel.sendMessage(response.value);
    });
  }).on('error', function(e){
    console.log("Advice got an error: ", e);
  });
}
