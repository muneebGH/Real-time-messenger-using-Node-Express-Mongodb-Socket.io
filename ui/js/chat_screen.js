var socket = io();

var senderInUI = "123";
var recieverInUi = "456";

$(() => {
  $("#send_message").click(sendMessage);
});

function sendMessage() {
  var text = $("#type_message").val();
  $.post("http://localhost:3301/messages", text);
}

socket.on("message", insertMessage);

function getMessages() {
  $.get("http://localhost:3301/messages", data => {
    data.forEach(element => {
      insertMessage(element);
    });
  });
}

function insertMessage(message) {
  if (message.sender == senderInUI) {
    $("#all_messages").append(outgoingMessage(message.text));
  } else {
    $("#all_messages").append(incomingMessage(message.text));
  }
}
