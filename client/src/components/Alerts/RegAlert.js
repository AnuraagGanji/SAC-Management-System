import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

export default function RegAlert(props) {
  const [show, setShow] = useState(false);

  function handleRegister() {
    console.log("lol");
    // Close the alert box
  }

  return (
    <>
      <Alert
        show={show}
        onClose={() => setShow(false)}
        variant="info"
        dismissible
      >
        <Alert.Heading>Register</Alert.Heading>
        <p style={{ textAlign: "justify" }}>
          Confirm registration? &#8377;{props.cost} will be deducted from your
          advances.
        </p>
        <hr />
        <div className="justify-content-end">
          <Button onClick={handleRegister} variant="outline-primary">
            Confirm
          </Button>
        </div>
      </Alert>

      {!show && <Button onClick={() => setShow(true)}>Register</Button>}
    </>
  );
}
