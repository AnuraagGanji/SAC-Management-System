import React from "react";
import { useParams } from "react-router-dom";
import AdminHeader from "../components/Headers/AdminHeader";
import CheckInForm from "../components/CheckInForm/CheckInForm";
import ListTable from "../components/Table/ListTable";

export default function AdminDash() {
  const { room } = useParams();

  const users = [
    {
      fName: "john",
      lName: "doe",
      bitsID: "f20200000",
      checkInTime: "11:02 AM",
      remainingTime: "00:58",
    },
    {
      fName: "jane",
      lName: "doe",
      bitsID: "f20200000",
      checkInTime: "11:02 AM",
      remainingTime: "00:58",
    },
    {
      fName: "lum",
      lName: "aao",
      bitsID: "f20200069",
      checkInTime: "11:42 AM",
      remainingTime: "00:08",
    },
  ];

  return (
    <div>
      <AdminHeader room={room} />
      <CheckInForm room={room} />
      <ListTable userList={users} />
    </div>
  );
}
