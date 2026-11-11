const { Server } = require("socket.io");
const { Message } = require("./models");
const {
  SOCKET_EVENTS: {
    NEW_MESSAGE,
    NEW_MESSAGE_SUCCESS,
    NEW_MESSAGE_ERROR,
    DELETE_MESSAGE,
    DELETE_MESSAGE_SUCCESS,
    DELETE_MESSAGE_ERROR,
    UPDATE_MESSAGE,
    UPDATE_MESSAGE_SUCCESS,
    UPDATE_MESSAGE_ERROR,
  },
} = require("./constants");

const initSocket = (httpServer) => {
  const io = new Server(httpServer, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    socket.on(NEW_MESSAGE, async (payload) => {
      try {
        const createdMessage = await Message.create(payload);
        io.emit(NEW_MESSAGE_SUCCESS, createdMessage);
      } catch (err) {
        socket.emit(NEW_MESSAGE_ERROR, {
          error: err.message ?? "Error",
        });
      }
    });

    socket.on(DELETE_MESSAGE, async (id) => {
      try {
        const deleteMessage = await Message.findByIdAndDelete(id);
        if (!deleteMessage)
          return socket.emit(DELETE_MESSAGE_ERROR, {
            error: "Message not found",
          });

        io.emit(DELETE_MESSAGE_SUCCESS, id);
      } catch (err) {
        socket.emit(DELETE_MESSAGE_ERROR, {
          error: err.message ?? "Error",
        });
      }
    });

    socket.on(UPDATE_MESSAGE, async ({ id, body }) => {
      try {
        const updatedMessage = await Message.findByIdAndUpdate(
          id,
          { body },
          { new: true, runValidators: true }
        );

        if (!updatedMessage) {
          return socket.emit(UPDATE_MESSAGE_ERROR, {
            error: "Message not found",
          });
        }

        io.emit(UPDATE_MESSAGE_SUCCESS, updatedMessage);
      } catch (err) {
        socket.emit(UPDATE_MESSAGE_ERROR, {
          error: err.message ?? "Error",
        });
      }
    });
  });
};

module.exports = initSocket;
