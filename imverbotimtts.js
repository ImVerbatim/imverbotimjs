const tts = require('say');
const Log = require('./logging.js');
const Filter = require('bad-words');


var LOG = new Log();

class MessageQueue {
    constructor() { 
        this.messages = [];
        this.isSpeaking = false;
        this.customFilter = new Filter({ placeHolder: 'x'});
        this.limit = 10;
    }

    add(message) {
        this.messages.unshift(message);
        if(this.isSpeaking == false) {
            this.speak(null,1.3);
            return true;
        }
    }
    pop() {
        return this.messages.pop();
    }
    peak() {
        return this.messages[this.messages.length-1]
    }

    speak(type,speed) {
        this.isSpeaking = true;
        if(this.peak().includes('ni')) {
            LOG.logTTSBanphrase(this.pop());
            return;
        }
        tts.speak(this.pop(),null, speed,(err) => {
        if (err) {
            return console.error(err)
        }
        LOG.logTTS(this.messages.length);
        this.isSpeaking = false;
        if(this.messages.length > 0) {
            this.speak(null,1.3);
        }

        });
      }


}

module.exports = MessageQueue;


