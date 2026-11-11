import { useLayoutEffect } from "react";
import MessageItem from "./MessageItem";

function MessagesList({ messages }) {
  useLayoutEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length]);

  return (
    <ol className="messages">
      {messages.map((m) => (
        <MessageItem key={m._id} message={m} />
      ))}
    </ol>
  );
}

export default MessagesList;
