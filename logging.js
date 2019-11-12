const chalk = require('chalk');

class Log {
    constructor() {
    }

    logDefault(usrnme, msg) {
        console.log(usrnme + " : " + msg);
    }

    log(usrnme,msg,rgb,isCmd) {
        try {
            if(isCmd) {
                console.log(chalk.hex(rgb)(usrnme) + ": " + msg + chalk.rgb(220,20,60)(" {COMMAND}"));
            }
            else {
                console.log(chalk.hex(rgb)(usrnme) + ": " + msg);
            }
        }catch(err) {
            console.log(usrnme + " : " + msg + chalk.rgb(220,20,60)(" {COMMAND}"));
        }
    }

    logTTS(num) {
        console.log(chalk.hex("green")("Message Spoken - " + num + " - Left in the queue"));
    }
    logTTSBanphrase(msg) {
        console.log(chalk.hex("green")("Message cannot be spoken: " + msg));
    }
}


module.exports = Log;