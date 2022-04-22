import React from "react";
import Table from "react-bootstrap/Table";

export default function HistoryTable(props) {
  return (
    <Table striped bordered responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>BITS ID</th>
          <th>Room</th>
          <th>Check-In</th>
          <th>Check-Out</th>
        </tr>
      </thead>
      <tbody>
        {props.historyList.map((user, index) => (
          <tr>
            <td>{index + 1}</td>
            <td>{user.fName}</td>
            <td>{user.lName}</td>
            <td>{user.bitsID}</td>
            <td>{user.room}</td>
            <td>{user.checkIn}</td>
            <td>{user.checkOut}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
