import { Form, FormControl, InputGroup, Button } from "react-bootstrap";
import { useState } from "react";

const SendMessageForm = ({ sendMessage }) => {
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
  };

  return (
    <Form onSubmit={handleSubmit} className="send-message-form">
      <InputGroup className="mb-3">
        <InputGroup.Text>Chat</InputGroup.Text>
        <FormControl
          onChange={handleChange}
          value={message}
          placeholder="Type a Message"
        ></FormControl>
        <Button type="submit" variant="primary" disabled={!message}>
          Send Message
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SendMessageForm;
