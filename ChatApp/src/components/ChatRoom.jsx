import { Button, Form, ListGroup, Stack } from "react-bootstrap";
import { useState } from "react";

export default function ChatRoom({ messages, sendMessage, leaveChatRoom }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-muted">Chat Room</h2>
        <Button variant="danger" onClick={leaveChatRoom}>
          Leave Chat
        </Button>
      </div>

      <ListGroup className="mb-3 chat-messages">
        {messages.map((msg, index) => (
          <ListGroup.Item
            key={index}
            className={`message ${
              msg.userName === "System" ? "system-message" : ""
            }`}
          >
            <Stack direction="horizontal" gap={3}>
              <strong
                className={
                  msg.userName === "System" ? "text-muted" : "text-primary"
                }
              >
                {msg.userName}:
              </strong>
              <span>{msg.msg}</span>
            </Stack>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="d-flex gap-2">
          <Form.Control
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <Button variant="primary" type="submit">
            Send
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}
