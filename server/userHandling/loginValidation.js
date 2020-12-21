var db = require("./CRUD");

async function findUser(email1, pass) {
  console.log(email1, pass);
  var res = await db.userDB.find(
    { email: email1, password: pass },
    (err, res) => {
      console.log("err in find user  : " + err + res);
    }
  );

  console.log("prinitg response below");
  console.log(res);

  return res;
}

module.exports = {
  findUser: findUser
};
