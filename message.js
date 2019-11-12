function command(msg) {
    newMsg = msg.split(" ");
    return newMsg[0];
  }

  function getTTSMessage(msg){
    msgAsArray = msg.split(" ");
    newMessage = "";
    for(i = 0;i < msgAsArray.length;i++){
      if(i != 0){
        newMessage = newMessage + msgAsArray[i] + " ";
      }
    }
    return newMessage;
  }


  module.exports = { 
    command, getTTSMessage
  }
