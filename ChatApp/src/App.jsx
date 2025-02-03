import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import WaitingRoom from "./components/WaitingRoom";
import ChatRoom from "./components/ChatRoom";
import { useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

function App() {
  const [conn, setConnection] = useState();
  const [messages, setMessages] = useState([]);

  const joinChatRoom = async (userName, chatRoom) => {
    try {
      const conn = new HubConnectionBuilder()
        .withUrl("http://localhost:5288/Chat")
        .configureLogging(LogLevel.Information)
        .build();
      // Set Handler
      conn.on("JoinSpecificChatRoom", (userName, msg) => {
        console.log("msg: " + msg + "name: " + userName);
      });

      conn.on("ReceiveSpecificMessage", (userName, msg) => {
        console.log("msg: " + msg + "name: " + userName);
        setMessages((messages) => [...messages, { userName, msg }]);
      });

      await conn.start();
      await conn.invoke("JoinSpecificChatRoom", { userName, chatRoom });
      setConnection(conn);
    } catch (error) {
      console.error(error);
    }
  };

  const sendMessage = async (message) => {
    try {
      await conn.invoke("SendMessage", message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <main>
        <Container>
          <Row className="px-5 py-5">
            <Col sm="12" className="text-center">
              <h1 className="font-weight-light">
                Welcome to Real Time Chat Application by SignalR
              </h1>
            </Col>
          </Row>
          {!conn ? (
            <WaitingRoom joinChatRoom={joinChatRoom} />
          ) : (
            <ChatRoom messages={messages} sendMessage={sendMessage} />
          )}
        </Container>
      </main>
    </div>
  );
}

export default App;
