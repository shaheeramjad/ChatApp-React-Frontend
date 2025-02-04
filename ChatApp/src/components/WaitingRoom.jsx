import { Form, Button, Col, Row, FormGroup, Alert } from "react-bootstrap";
import { useState } from "react";

const WaitingRoom = ({ joinChatRoom }) => {
  const [userName, setUserName] = useState("");
  const [chatRoom, setChatRoom] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorMessage("");

    if (!userName || !chatRoom) {
      setErrorMessage("Both fields are required.");
      return;
    }

    setIsLoading(true);

    joinChatRoom(userName, chatRoom).finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="px-5 py-5">
        <Col sm="12">
          <FormGroup>
            <Form.Control
              type="text"
              placeholder="UserName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              isInvalid={!userName && errorMessage}
            />
            <Form.Control
              type="text"
              placeholder="ChatRoom"
              value={chatRoom}
              onChange={(e) => setChatRoom(e.target.value)}
              isInvalid={!chatRoom && errorMessage}
            />
            <Form.Control.Feedback type="invalid">
              {errorMessage}
            </Form.Control.Feedback>
          </FormGroup>
        </Col>
        <Col sm="12">
          <hr />
          <Button variant="success" type="submit" disabled={isLoading}>
            {isLoading ? "Joining..." : "Join Chat Room"}
          </Button>
        </Col>
      </Row>
      {errorMessage && (
        <Alert variant="danger" className="mt-3">
          {errorMessage}
        </Alert>
      )}
    </Form>
  );
};

export default WaitingRoom;
