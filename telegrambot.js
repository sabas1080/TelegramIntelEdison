// Authorized users, replace with your real IDs
var authorized_users = [
  32473742,
];

// Include required libraries
//var sensorLib = require('node-dht-sensor');
var Bot = require('node-telegram-bot');
var m = require('mraa'); //require mraa
console.log('MRAA Version: ' + m.getVersion()); //write the mraa version to the console
// Initialize relay board (using onoff library)
//var Gpio = require('onoff').Gpio,
//  relay1 = new Gpio(2, 'out'),
//  relay2 = new Gpio(3, 'out');
var analogPin0 = new m.Aio(0); //setup access analog inpuput pin 0
// Turn both the relays off
//relay1.writeSync(0);
//relay2.writeSync(0);

// Initialize and start Telegram BOT (insert your real token)
var bot = new Bot({
  token: '119549880:AAHVXowcYOdrI4z2gXVFtcEWUZ9ABsu1Kz8'
});

// Attach event on every received message
bot.on('message', function (message) {
  parseMessage(message);
});

// Start the bot
bot.start();
console.log("BOT ready!");

// Function that handles a new message
function parseMessage(message) {

  //if(!isAuthorized(message.from.id)) return;

  switch(true) {

    case message.text == "/gettemp":
    var analogValue = analogPin0.read();
      bot.sendMessage({
        chat_id: message.chat.id,
        text: 'Actual temperature: ' + analogValue + '°C',
      });
      break;

    case message.text == "/getouts":
      bot.sendMessage({
        chat_id: message.chat.id,
        text: 'Actual outputs status:\nOutput 1 is ' + relay1.readSync() + '\nOutput 2 is ' + relay2.readSync(),
      });
      break;
  /*  case /^\/setout1/.test(message.text):
      var command = message.text.replace("/setout1 ", "");
      if(command.toLowerCase() == "on") {
        relay1.writeSync(1);
        bot.sendMessage({
          chat_id: message.chat.id,
          text: 'Output 1 turned ON',
        });
      } else if(command.toLowerCase() == "off") {
        relay1.writeSync(0);
        bot.sendMessage({
          chat_id: message.chat.id,
          text: 'Output 1 turned OFF',
        });
      } else
        bot.sendMessage({
          chat_id: message.chat.id,
          text: 'Unknown command: ' + command,
        });
    break;
*/
  /*  case /^\/setout2/.test(message.text):
      var command = message.text.replace("/setout2 ", "");
      if(command.toLowerCase() == "on") {
        relay2.writeSync(1);
        bot.sendMessage({
          chat_id: message.chat.id,
          text: 'Output 2 turned ON',
        });
      } else if(command.toLowerCase() == "off") {
        relay2.writeSync(0);
        bot.sendMessage({
          chat_id: message.chat.id,
          text: 'Output 2 turned OFF',
        });
      } else
        bot.sendMessage({
          chat_id: message.chat.id,
          text: 'Unknown command: ' + command,
        });
    break;*/
  }
}


// Function that checks if the user is authorized (its id is in the array)
function isAuthorized(userid) {

  for(i = 0; i < authorized_users.length; i++)
    if(authorized_users[i ] == userid) return true;

  return false;
}
