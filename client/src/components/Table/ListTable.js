import React from "react";
import Table from "react-bootstrap/Table";

export default function ListTable(props) {
  return (
    <Table striped bordered responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>BITS ID</th>
          <th>Check-in Time</th>
          <th>Time left (hh:mm)</th>
        </tr>
      </thead>
      <tbody>
        {props.userList.map((user, index) => (
          <tr>
            <td>{index + 1}</td>
            <td>{user.fName}</td>
            <td>{user.lName}</td>
            <td>{user.bitsmail}</td>
            <td>{user.CheckIn}</td>
            <td>{user.TimeLeft}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
