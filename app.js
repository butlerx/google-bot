if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

var Botkit = require('botkit');
var os = require('os');

var controller = Botkit.slackbot({
    debug: true,
});

var bot = controller.spawn({
    token: process.env.token
}).startRTM();

controller.hears(['google (.*)', 'lmg (.*)'], 'ambient', function(bot, message) {
    var url = '';
    var args = message.match[0].split(' ');
    if (args[0] === 'google') {
      url = google(message.match[1]);
    } else {
      url = letme(message.match[1]);
    }
    bot.reply(message, url)
});

function urlencode(str) {
  str = escape(str);
  str = str.replace(/\+/g, '%2B');
  str = str.replace(/%20/g, '+');
  str = str.replace(/\*/g, '%2A');
  str = str.replace(/\//g, '%2F');
  str = str.replace(/\@/g, '%40');
  return str;
};

function letme(str) {
  str = urlencode(str);
  var url = 'http://letmegooglethatforyou.com/?q=' + str;
  return url;
}

function google(str) {
  str = urlencode(str);
  var url = 'https://google.ie/?q=' + str;
  return url;
}
