const ircsettings = require('./irc-settings/settings.json');
const TwitchBot = require('twitch-bot');
const MessageQueue = require('./imverbotimtts.js');
const msgModules = require('./message.js');
const Log = require('./logging.js');
const db = require('./dbConnect.js');

const Bot = new TwitchBot({
  username: ircsettings.imverbotim.username,
  oauth: ircsettings.imverbotim.password,
  channels: ['haywoodjabroni']
})

var msgs = new MessageQueue();
var LOG = new Log();
var channelTitle;

Bot.on('join', channel => {
  console.log(`Joined channel: ${channel}`)
  Bot.say('/me Ready for work KKona 7',channel);
})
 
Bot.on('error', err => {
  console.log(err)
})
 
Bot.on('message', chatter => {
  if (chatter.message[0] === ">") { 
    var userCommand = msgModules.command(chatter.message);
    var userMsg = msgModules.getTTSMessage(chatter.message);


  
    commands(chatter,userCommand,userMsg);
  }
  //TODO: COLOR BLACK CRASHES BOT 
  LOG.log(chatter.username, chatter.message,chatter.color,userCommand!=null);
})

function commands(chatter,userCommand, userMsg) {

  switch(userCommand) {
    case ">tts":
        msgs.add(userMsg); 
        break;
    case ">ping":
        Bot.say("Pong! FeelsDankMan TeaTime ", chatter.channel);
        break;
    case ">color":
        Bot.say(chatter.username + ", " + chatter.color,chatter.channel);
        break;
    case ">title":
        Bot.say(chatter.username + ", ");
        break;
    case ">setemotion":
        Bot.say(chatter.username + " is feeling " + userMsg);
        //db.addEmotion(chatter.username,userMsg);
        break;
    default:
      if(chatter.mod || chatter.username === "haywoodjabroni") {
        modCommands(chatter,userCommand, userMsg);
      }
      else {
        Bot.say(chatter.username + ", Command not found");
      }
      
        break;

  }
}

  function modCommands(chatter,userCommand,userMsg) {
    switch(userCommand) {
      case ">join":
        Bot.join(userMsg);
        Bot.say("Joining " + userMsg + "'s " + "chat!");
        break;
    
      case ">stop":
        Bot.close();
        break;

      case ">part":
        if(userMsg != null) {
          Bot.part(userMsg);
          Bot.say("Leaving " + userMsg + "'s " + "chat!");
        }
        else {
          Bot.part(channel);
          Bot.say("Leaving " + channel + "'s " + "chat!");
        }

        break;
        default:
          if(chatter.username == "haywoodjabroni") {
            //adminCommands(chatter,userCommand,userMsg);
          }
    }
  }

  function adminCommands(chatter,userCommand,userMsg) {
    switch(userCommand) {
      case ">table":
        Bot.say("Displaying table on console");
        db.showTable();
        break;
      case ">clean":
        db.deleteDuplicates();
    }
  }
