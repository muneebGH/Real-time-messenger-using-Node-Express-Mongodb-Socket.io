var db = require("mongoose");

async function establishConnection() {
  dbUrl = String.raw`mongodb+srv://root:iamroot@users-zkdte.mongodb.net/test?retryWrites=true&w=majority`;

  await db.connect(
    dbUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    err => {
      console.log("a user connected to chatroom ");
      console.log("error in user connection =" + err);
    }
  );
}

var chatRoomSchema = new db.Schema({
  title: String,
  discription: String,
  password: String,
  user: String
});

var chatRoom = db.model("Chatrooms", chatRoomSchema);

async function addChatRoom(chatRoomIn) {
  var done = true;

  console.log("adding chatroom below");
  console.log(chatRoomIn);

  var chatRoomToBeInserted = new chatRoom(chatRoomIn);
  await chatRoomToBeInserted.save(err => {
    console.log(err);
    if (err) {
      done = false;
    }
  });

  return done;
}

async function getAll() {
  var res = await chatRoom.find({});
  return res;
}

async function validateChatRoom(titleIn, passwordIn) {
  var yes = "";
  var res = await chatRoom.find(
    { title: titleIn, password: passwordIn },
    (err, res) => {
      console.log("err in find chatroom  : " + err);
    }
  );
  console.log("prinitng response chatroom db below");
  console.log(res);
  return res;
}

module.exports = {
  addChatRoom: addChatRoom,
  getAllChatRooms: getAll,
  establishConn: establishConnection,
  validate: validateChatRoom
};
