import { io } from "socket.io-client";
import {
  newMessageError,
  newMessageSuccess,
  deleteMessageSuccess,
  deleteMessageError,
  updateMessageSuccess,
  updateMessageError,
} from "../store/slices/messagesSlice";
import CONSTANTS from "./../constants";

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
} = CONSTANTS;

const socket = io("ws://localhost:5000");

export const createMessage = (payload) => socket.emit(NEW_MESSAGE, payload);

export const deleteMessage = (id) => {
  socket.emit(DELETE_MESSAGE, id);
};

export const updateMessage = (id, body) => {
  socket.emit(UPDATE_MESSAGE, { id, body });
};

export const bringStoreToSocket = (store) => {
  socket.on(NEW_MESSAGE_SUCCESS, (payload) => {
    store.dispatch(newMessageSuccess(payload));
  });

  socket.on(NEW_MESSAGE_ERROR, (error) => {
    store.dispatch(newMessageError(error));
  });
  socket.on(DELETE_MESSAGE_SUCCESS, (id) => {
    store.dispatch(deleteMessageSuccess(id));
  });
  socket.on(DELETE_MESSAGE_ERROR, (error) => {
    store.dispatch(deleteMessageError(error));
  });

  socket.on(UPDATE_MESSAGE_SUCCESS, (payload) => {
    store.dispatch(updateMessageSuccess(payload));
  });
  socket.on(UPDATE_MESSAGE_ERROR, (error) => {
    store.dispatch(updateMessageError(error));
  });
};
