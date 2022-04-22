// This page shows the summary of each room
import React from "react";
import Header from "../components/Headers/Header";
import RoomCard from "../components/RoomCard/RoomCard";

export default function Home() {
  const rooms = [
    { name: "Gym", current: 10, capacity: 30, registrationReq: true },
    { name: "Badminton", current: 8, capacity: 8, registrationReq: false },
    { name: "VM322", current: 2, capacity: 10, registrationReq: true },
  ];

  return (
    <div>
      <Header />
      <div className="studentCards">
        {rooms.map((room) => (
          <RoomCard
            key="//TODO"
            name={room.name}
            current={room.current}
            capacity={room.capacity}
            registrationReq={false}
          />
        ))}
      </div>
    </div>
  );
}
