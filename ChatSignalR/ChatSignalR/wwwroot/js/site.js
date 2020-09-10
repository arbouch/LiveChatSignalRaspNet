var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
connection.on("ReceiveMessage", function (fromUser, message) {
    var msg = fromUser + ": " + message;
    var li = document.createElement("li");
    li.textContent = msg
    $("#list").prepend(li);
});
connection.on("UserConnected", function (ConnectionId) {
    var GroupElement = document.getElementById("group");
    var option = document.createElement("option");
    option.text = ConnectionId;
    option.value = ConnectionId;
    GroupElement.add(option)
});
connection.on("UserDisconnected", function (ConnectionId) {
    var GroupElement = document.getElementById("group");
    for (i = 0; i < GroupElement.length; i++) {
        if (GroupElement.option[i].value == ConnectionId) {
            GroupElement.remove(i);
        }
    }
});
connection.start();
//$("#btnSend").on("click", function () {
document.getElementById("btnSend").addEventListener("click", function (event){
    //var fromUser = $("#txtUser").val();
    var fromUser = document.getElementById("txtUser").value;

    //var message = $("#TxtMessage").val();
    var message = document.getElementById("TxtMessage").value;
    var GroupElement = document.getElementById("group");
    var groupValue = GroupElement.options[GroupElement.selectedIndex].value;
    if (groupValue === "all" || groupValue === "MySelf") {
        var method = groupValue === "all" ? "sendMessage" : " SendMessageToCaller";
        connection.invoke(method, fromUser, message);

    }
    else {
        connection.invoke("SendMessageToUser", groupValue,fromUser, message);

    }
});