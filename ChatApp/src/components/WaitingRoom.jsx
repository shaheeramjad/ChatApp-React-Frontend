import { Form, Button, Col, Row, FormGroup } from "react-bootstrap";
import { useState } from "react";

const WaitingRoom = ({ joinChatRoom }) => {
  const [userName, setUserName] = useState();
  const [chatRoom, setChatRoom] = useState();

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        joinChatRoom(userName, chatRoom);
      }}
    >
      <Row className="px-5 py-5">
        <Col sm="12">
          <FormGroup>
            <Form.Control
              type="text"
              placeholder="UserName"
              onChange={(e) => setUserName(e.target.value)}
            />
            <Form.Control
              type="text"
              placeholder="ChatRoom"
              onChange={(e) => setChatRoom(e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col sm="12">
          <hr />
          <Button variant="success" type="submit">
            Join Chat Room
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default WaitingRoom;
