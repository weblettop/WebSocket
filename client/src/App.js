import { useEffect } from "react";
import { connect } from "react-redux";
import { getMessagesThunk } from "./store/slices/messagesSlice";
import { ws } from "./api";
import MessagesList from "./components/MessagesList";
import MessageForm from "./components/MessageForm";
import "./App.css";

function App({ messages, isFetching, error, limit, get }) {
  useEffect(() => {
    get(limit);
  }, [limit, get]);

  const addMessage = (body) => ws.createMessage({ body });

  return (
    <div className="container">
      <header className="header">
        <div className="name">WS Chat</div>
      </header>
      {error && (
        <div className="error">
          ERROR: {error.error ?? error.message ?? "Unknown error"}
        </div>
      )}
      {isFetching && (
        <div className="loading">Messages is loading. Please, wait...</div>
      )}
      {!isFetching && <MessagesList messages={messages} />}
      <MessageForm onSubmit={addMessage} submitText="Send" className="form" />
    </div>
  );
}

const mapStateToProps = ({ chat }) => chat;

const mapDispatchToProps = (dispatch) => ({
  get: (limit) => dispatch(getMessagesThunk(limit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
