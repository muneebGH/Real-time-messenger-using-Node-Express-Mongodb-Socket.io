var express = require("express");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var bodyParser = require("body-parser");
var userCRUD = require("./userHandling/CRUD");
var loginValidation = require("./userHandling/loginValidation");
var messageHandler = require("./messageHandling/holdMessages");
var watsonHandler = require("./IBM-watson/nlu_handler");
var chatRoomHandler = require("./chatrooms/chatrooms_handler");

var senderId = "123";
var recieverId = "456";

userCRUD.establishConnection();
chatRoomHandler.establishConn();
messageHandler.connectMessageDb();

async function connectDB() {
  await userCRUD.establishConnection();
  await chatRoomHandler.establishConn();
  await messageHandler.connectMessageDb();
}

var path = require("path");

app.use(cookieParser());
app.use(express.static(__dirname.substring(0, __dirname.length - 6) + "/ui"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
http.listen(3301, () => {
  console.log("server listening ");
});

io.on("connection", socket => {
  console.log("socket io successfull");
});

app.get("/logout", (req, res) => {
  res.clearCookie("userName");
  res.clearCookie("chatRoomTitle");
  return res.redirect("/");
});
app.get("/", async (req, res) => {
  //  await connectDB();
  try {
    console.log(req.cookies);
    if (req.cookies.userName) {
      return res.redirect("/selectChatRoom");
    }
  } catch (error) {
    console.log("error bro haha not");
  }
  res.sendFile(path.resolve("./ui/screens/login_screen.html"));
});

app.post("/reciever", (req, res) => {
  res.cookie("recieverName", req.body.reciever);
});

app.get("/signup", (req, res) => {
  res.clearCookie("userName");
  res.sendFile(path.resolve("./ui/screens/signup_screen.html"));
});
app.get("/chat", async (req, res) => {
  // senderId = req.cookies.userName;
  // recieverId = req.cookies.recieverName;
  var user = req.cookies.userName.toString();
  console.log();
  io.emit("setUserNameChatScreen", { userName: user });

  res.sendFile(path.resolve("./ui/screens/chat_screen.html"));
});

app.get("/messages", async (req, res) => {
  var resp = await messageHandler.getAllOf(req.cookies.chatRoomTitle);

  res.send(resp);
});

app.post("/messages", (req, res) => {
  var message = {
    chatRoomTitle: req.cookies.chatRoomTitle,
    senderUserName: req.cookies.userName,
    text: req.body.text
  };

  var done = messageHandler.addMessage(message);
  io.emit("message", message);
  done ? res.sendStatus(200) : res.sendStatus(500);
});

app.post("/adduser", (req, res) => {
  //res.clearCookie("name");
  console.log(req.body);
  var failed = userCRUD.addUser(req.body);
  if (failed) {
    res.sendStatus(500);
  } else {
    res.sendStatus(200);
  }
  //res.sendFile(path.resolve("./ui/screens/chat_screen.html"));
});

app.get("/selectChatRoom", (req, res) => {
  res.sendFile(path.resolve("./ui/screens/chat_rooms_screen.html"));
});

app.get("/login", async (req, res) => {
  try {
    res.clearCookie("chatRoomTitle");
  } catch (error) {
    console.log("there wasnt any cookir of chatRoomTitle");
  }
  var email = req.param("email");
  var pass = req.param("password");
  var pass = req.param("password");
  var resp = await loginValidation.findUser(email, pass);

  try {
    res.cookie("userName", resp[0].userName);
  } catch (error) {
    console.log("no cookie saved ");
  }

  res.send(resp);
});

//ai stuff

app.post("/ai", (req, res) => {
  res.send(watsonHandler.anaylze());
});

app.get("/cookies", (req, res) => {
  res.send(req.cookies);
});

app.post("/addChatRoom", (req, res) => {
  var chatRoom = req.body;
  user = "";
  user = req.cookies.userName;
  chatRoom.user = user;
  var added = chatRoomHandler.addChatRoom(chatRoom).then(() => {
    if (added) {
      io.emit("chatRoomAdded", chatRoom);
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  });
});

app.get("/getAllChatRooms", async (req, res) => {
  var data = await chatRoomHandler.getAllChatRooms();
  res.send(data);
});

app.get("/verifyChatRoom", async (req, res) => {
  var title = req.param("title");
  var password = req.param("password");
  var data = await chatRoomHandler.validate(title, password);

  console.log("server side log verify chat room");
  console.log(data);

  try {
    if (data[0].title == title) {
      res.cookie("chatRoomTitle", data[0].title);
      res.send({ status: "true" });
    } else {
      res.send({ status: "false" });
    }
  } catch (error) {
    res.send({ status: "false" });
  }
});

//after

app.get("/myChatRoomTitle", (req, res) => {
  res.send(req.cookies.chatRoomTitle);
});
