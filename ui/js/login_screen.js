$(() => {
  console.log(document.cookie);
  $("login_button").click(validateUser);
});

function addUser() {
  var user = {
    fullname: $("#full_name_ca").val(),
    userName: $("#user_name_ca").val(),
    email: $("#email_ca").val(),
    password: $("#password_ca").val()
  };

  $.post("http://localhost:3301/adduser", user);
}

function validateUser() {
  user = {
    email: $("#email_login").val(),
    password: $("#password_login").val()
  };

  console.log("validate user called ");
  $.get(
    `http://localhost:3301/login?email=${user.email}&password=${user.password}`,
    data => {
      console.log("inside function");
      console.log(data);
      console.log(user);

      try {
        if (data[0].password == user.password) {
          console.log("yes called ");
          document.cookie.userName = data[0].userName;
          window.location.href = "http://localhost:3301/selectChatRoom";
        } else {
          alert("no man u cannot fool me ");
        }
      } catch (error) {
        alert("Again plzz ");
      }
    }
  );
}
