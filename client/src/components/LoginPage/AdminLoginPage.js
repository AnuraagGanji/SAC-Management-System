import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./LoginPage.css";
import Axios from "axios";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [room, setRoom] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0 && room.length > 0;
  }

  function handleSubmit(event) {
    Axios.post("http://localhost:2000/adminlogin", {
      bitsID: email,
      password: password,
      room: room,
    }).then((response) => console.log(response));
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>BITS ID: </Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password: </Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="room">
          <Form.Label>Room: </Form.Label>
          <Form.Control
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
        </Form.Group>
        <Button
          style={{ marginTop: "4%" }}
          block
          size="lg"
          type="submit"
          disabled={!validateForm()}
        >
          Login
        </Button>
      </Form>
    </div>
  );
}
