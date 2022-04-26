import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminHeader from "../components/Headers/AdminHeader";
import CheckInForm from "../components/CheckInForm/CheckInForm";
import ListTable from "../components/Table/ListTable";
import Axios from "axios";
import { capitalize } from "lodash";
import { useNavigate } from "react-router-dom";

export default function AdminDash() {
  const { room } = useParams();
  let navigate = useNavigate();

  // const users = [
  //   {
  //     fName: "john",
  //     lName: "doe",
  //     bitsID: "f20200000",
  //     checkInTime: "11:02 AM",
  //     remainingTime: "00:58",
  //   },
  //   {
  //     fName: "jane",
  //     lName: "doe",
  //     bitsID: "f20200000",
  //     checkInTime: "11:02 AM",
  //     remainingTime: "00:58",
  //   },
  //   {
  //     fName: "lum",
  //     lName: "aao",
  //     bitsID: "f20200069",
  //     checkInTime: "11:42 AM",
  //     remainingTime: "00:08",
  //   },
  // ];

  // const dummyData = {
  //   name: "",
  //   current: 0,
  //   capacity: 0,
  //   registrationReq: true,
  //   registered: true,
  //   cost: 0,
  // };
  const [users, setUsers] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:2000/api/admindash", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) => {
      console.log("something");
      if (response.data.error) {
        alert("Please log in");
        navigate("../adminlogin");
      } else {
        console.log(response.data);
        setUsers(response.data);
      }
    });
  }, []);

  return (
    <div>
      <AdminHeader room={room} />
      <h2 className="roomTitle">{capitalize(room)}</h2>
      <div className="forms">
        <CheckInForm room={room} button="Check In" action="checkin" />
        <CheckInForm room="" button="Check Out" action="checkout" />
      </div>
      <ListTable userList={users} />
    </div>
  );
}
