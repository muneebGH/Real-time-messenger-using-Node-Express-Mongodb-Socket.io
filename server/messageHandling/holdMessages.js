var db = require("mongoose");

async function establishConnection() {
  dbUrl = String.raw`mongodb+srv://root:iamroot@users-zkdte.mongodb.net/test?retryWrites=true&w=majority`;

  await db.connect(
    dbUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    err => {
      console.log("a user connected to messages");
      console.log("error in user connection to messages=" + err);
    }
  );
}

var Messages = new db.Schema({
  chatRoomTitle: String,
  senderUserName: String,
  text: String
});

var message = db.model("Messages", Messages);

async function addMessage(messageIn) {
  var done = true;

  await establishConnection();
  var messageToBeInserted = new message(messageIn);
  await messageToBeInserted.save(err => {
    if (err) {
      done = false;
    }
  });

  return done;
}

async function getAllOf(chatRoomTitleIn) {
  var res = await message.find({ chatRoomTitle: chatRoomTitleIn });

  return res;
}

module.exports = {
  connectMessageDb: establishConnection,
  addMessage: addMessage,
  getAllOf: getAllOf
};
