let onlineUsers = [];

export const newConnectionHandler = (newClient) => {
  console.log("CONNECTION:", newClient.id);

  newClient.emit("greeting", { message: `Whatup ${newClient.id}!!!` });

  newClient.on("setUsername", (payload) => {
    console.log(payload);
    onlineUsers.push({ username: payload.username, socketId: newClient.id });
    newClient.emit("loggedIn", onlineUsers);
    newClient.broadcast.emit("updateOnlineUsersList", onlineUsers);
  });
  newClient.on("sendMessage", (message) => {
    console.log("MESSAGE!!!", message);
    newClient.broadcast.emit("newMessage", message);
  });
  newClient.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== newClient.id);
    newClient.broadcast.emit("updateOnlineUsersList", onlineUsers);
  });
};
