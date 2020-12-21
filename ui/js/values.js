var createAccount = String.raw`



<label for="full_name_ca">Full name</label>
<input class="form-control" type="text" placeholder="john doe" id="full_name_ca"/>
</br>




<label for="user_name_ca">User name</label>
<input class="form-control" type="text" placeholder="johndoe123" id="user_name_ca"/>


</br>
<div id="email_form" class="form-group">
<label for="email_ca">Email address</label>
<input
  type="email"
  class="form-control"
  id="email_ca"
  aria-describedby="emailHelp"
  placeholder="Enter email"
/>
<small id="email_help" class="form-text text-muted"
  >Enter a valid email address: u will be asked to verify it.</small
>
</div>
<div id="password_form" class="form-group">
<label for="password_ca">Password</label>
<input
  type="password"
  class="form-control"
  id="password_ca"
  placeholder="Password"
/>

</div>

<button
id="create_account_2"
type="button"
class="btn btn-danger btn-lg btn-block"
>
Create Account
</button>`;

function chatRoomValue(chatRoom) {
  var type = "";
  if (chatRoom.user == "muneeb") {
    type = "featured";
  } else {
    type = "local";
  }
  return String.raw`
  <div class="card text-center rounded">
                <div class="card-header" style="background-color: #66cccc; color: #fff;">
                  ${type}
                </div>
                <div class="card-body">
                  <h5 class="card-title" >${chatRoom.title}</h5>
                  <p class="card-text">${chatRoom.discription}</p>
                 
                <input type="text" placeholder="Enter key "><br>
                  
                  <button onclick="joinChatRoom(event)" class="btn" style="background-color: #cc0066;color: #fff;margin-top: 10px;">Join Room</button>
                </div>
                <div class="card-footer text-muted" style="background-color: #66cccc;">
                  created by : ${chatRoom.user}
                </div>
              </div>
              <br><br>`;
}

function incomingMessage(text) {
  return String.raw`<div class="incoming_msg">
  <div class="incoming_msg_img">
    <img
      src="https://ptetutorials.com/images/user-profile.png"
      alt="sunil"
    />
  </div>
  <div class="received_msg">
    <div class="received_withd_msg">
      <p>${text}</p>
      <span class="time_date"> 11:01 AM | June 9</span>
    </div>
  </div>
</div>`;
}

function outgoingMessage(text) {
  return String.raw`<div class="outgoing_msg">
  <div class="sent_msg">
    <p>${text}</p>
    <span class="time_date"> 11:01 AM | June 9</span>
  </div>
</div>`;
}

function generateMessage(sender, text) {
  return String.raw` <div class="card shadow-sm">
  <div class="card-body">
    <h5
      class="card-title justify-content-center d-flex font-weight-light"
      style="color: #cc0066;"
    >
      ${sender}
    </h5>
    <p class="card-text justify-content-center d-flex">
      ${text}
    </p>
  </div>
</div>
<br>`;
}
