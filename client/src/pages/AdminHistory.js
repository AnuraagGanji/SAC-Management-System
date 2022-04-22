import React from "react";
import { useParams } from "react-router-dom";
import AdminHeader from "../components/Headers/AdminHeader";
import HistoryTable from "../components/Table/HistoryTable";

export default function AdminHistory(props) {
  const { room } = useParams();
  const history = [
    {
      fName: "John",
      lName: "Doe",
      bitsID: "f20200000",
      room: "Gym",
      checkIn: "11:34 AM Wednesday, April 18, 2022",
      checkOut: "12:40 AM Wednesday, April 18, 2022",
    },
    {
      fName: "Jane",
      lName: "Doe",
      bitsID: "f20200000",
      room: "Badminton",
      checkIn: "1:12 AM Wednesday, April 17, 2022",
      checkOut: "2:00 AM Wednesday, April 17, 2022",
    },
    {
      fName: "lul",
      lName: "aao",
      bitsID: "f20200420",
      room: "VM322",
      checkIn: "12:12 AM Wednesday, April 18, 2022",
      checkOut: "2:00 AM Wednesday, April 18, 2022",
    },
  ];

  return (
    <div>
      <AdminHeader room={room} />
      <HistoryTable historyList={history} />;
    </div>
  );
}
