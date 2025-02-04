import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row, Spinner, Alert } from "react-bootstrap";
import WaitingRoom from "./components/WaitingRoom";
import ChatRoom from "./components/ChatRoom";
import { useState, useEffect } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

function App() {
  const [conn, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (conn) {
        conn.stop();
      }
    };
  }, [conn]);

  const joinChatRoom = async (userName, chatRoom) => {
    setIsLoading(true);
    setError("");
    try {
      const conn = new HubConnectionBuilder()
        .withUrl("http://localhost:5288/Chat")
        .configureLogging(LogLevel.Information)
        .build();

      conn.on("JoinSpecificChatRoom", (userName, msg) => {
        setMessages((prev) => [
          ...prev,
          { userName: "System", msg: `${userName} ${msg}` },
        ]);
      });

      conn.on("ReceiveSpecificMessage", (userName, msg) => {
        setMessages((prev) => [...prev, { userName, msg }]);
      });

      conn.onclose(() => {
        setConnection(null);
        setMessages([]);
      });

      await conn.start();
      await conn.invoke("JoinSpecificChatRoom", { userName, chatRoom });
      setConnection(conn);
    } catch (err) {
      setError("Failed to join chat room. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (message) => {
    try {
      await conn.invoke("SendMessage", message);
    } catch (err) {
      setError("Failed to send message.");
      console.error(err);
    }
  };

  const leaveChatRoom = async () => {
    try {
      await conn.stop();
      setConnection(null);
      setMessages([]);
    } catch (err) {
      setError("Error leaving chat room");
      console.error(err);
    }
  };

  return (
    <div className="bg-light min-vh-100">
      <main>
        <Container className="py-5">
          <Row className="mb-5 text-center">
            <Col>
              <h1 className="display-4 text-primary">
                Real-Time Chat with SignalR
              </h1>
            </Col>
          </Row>

          {error && (
            <Alert variant="danger" className="mb-3">
              {error}
            </Alert>
          )}

          {!conn ? (
            <WaitingRoom joinChatRoom={joinChatRoom} isLoading={isLoading} />
          ) : (
            <ChatRoom
              messages={messages}
              sendMessage={sendMessage}
              leaveChatRoom={leaveChatRoom}
            />
          )}
        </Container>
      </main>
    </div>
  );
}

export default App;
