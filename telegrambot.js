// Authorized users, replace with your real IDs
var authorized_users = [
  38075702,
];

var Bot = require('node-telegram-bot');
var m = require('mraa'); //require mraa
console.log('MRAA Version: ' + m.getVersion()); //write the mraa version to the console
var analogPin0 = new m.Aio(0); //setup access analog inpuput pin 0
var analogPin1 = new m.Aio(1);
var led = new m.Gpio(2);
led.dir(m.DIR_OUT); //set the gpio direction to output
var LCD = require('jsupm_i2clcd');
//Initialize Jhd1313m1 at 0x62 (RGB_ADDRESS) and 0x3E (LCD_ADDRESS)
var myLcd = new LCD.Jhd1313m1 (0, 0x3E, 0x62);
myLcd.clear();
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
      var a = analogPin0.read();
      var resistance = (1023 - a) * 10000 / a;
      var celTemp = 1 / (Math.log(resistance / 10000) / 3975 + 1 / 298.15) - 273.15;
          bot.sendMessage({
        chat_id: message.chat.id,
        text: 'La temperatura es ' + celTemp.toFixed(2) + '°C',
      });
      break;

    case message.text == "/getlight":
     var a = analogPin1.read();
       if(a <250)
          {
             led.write(1);
          bot.sendMessage({
        chat_id: message.chat.id,
        text: 'Prendí la luz',
       });
          }
        else {
         led.write(0);
            bot.sendMessage({
        chat_id: message.chat.id,
        text: 'Apagué la luz',
            });
      }
      break;

      case message.text == "/getlcd":
          myLcd.setCursor(0,0);
          myLcd.write('Hola Guapo');
          myLcd.setCursor(1,0);
          myLcd.write('Atte: Intel Edison');
          bot.sendMessage({
        chat_id: message.chat.id,
        text: 'LCD prendida ',
      });
      break;

function isAuthorized(userid) {

  for(i = 0; i < authorized_users.length; i++)
    if(authorized_users[i ] == userid) return true;

  return false;
}
