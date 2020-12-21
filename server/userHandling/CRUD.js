var db = require("mongoose");

async function establishConnection() {
  dbUrl = String.raw`mongodb+srv://root:iamroot@users-zkdte.mongodb.net/test?retryWrites=true&w=majority`;

  db.connect(
    dbUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    err => {
      console.log("a user connected to users");
      console.log("error in user connection to users =" + err);
    }
  );
}

var UserSchema = new db.Schema({
  fullName: String,
  userName: String,
  email: String,
  password: String
});

var UserModel = db.model("Users", UserSchema);

async function addUserToDB(user) {
  var done = true;
  await establishConnection();

  console.log("adding user below");
  console.log(user);

  var userToBeInserted = new UserModel(user);
  userToBeInserted.save(err => {
    console.log(err);
    if (err) {
      done = false;
    }
  });

  return done;
}

module.exports = {
  addUser: addUserToDB,
  establishConnection: establishConnection,
  userDB: UserModel
};
