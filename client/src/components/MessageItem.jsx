import React from "react";
import { useState } from "react";
import { ws } from "../api";
import MessageForm from "./MessageForm";

const MessageItem = ({ message }) => {
  const [isEditing, setIsEditing] = useState(false);

  const { _id, body, createdAt, updatedAt } = message;
  const isEdited = createdAt !== updatedAt;

  const handleDelete = () => ws.deleteMessage(_id);

  const handleUpdate = (newBody) => {
    if (newBody !== body) {
      ws.updateMessage(_id, newBody);
    }
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li className="li">
        <MessageForm
          initialBody={body}
          onSubmit={handleUpdate}
          submitText="Save"
          onCancel={() => setIsEditing(false)}
        />
      </li>
    );
  }

  return (
    <li className="li">
      <div className="message">
        <span>{body}</span>
        <p>
          {new Date(createdAt).toLocaleTimeString()}
          {isEdited && " (edited)"}
        </p>
      </div>
      <div className="message-actions">
        <button className="btn" onClick={() => setIsEditing(true)}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default MessageItem;
