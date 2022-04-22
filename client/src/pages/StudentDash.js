import React from "react";
import StudentHeader from "../components/Headers/StudentHeader";
import RoomCard from "../components/RoomCard/RoomCard";

export default function StudentDash() {
  const rooms = [
    { name: "Gym", current: 10, capacity: 30, registrationReq: true },
    { name: "Badminton", current: 8, capacity: 8, registrationReq: false },
    { name: "VM322", current: 2, capacity: 10, registrationReq: true },
  ];

  return (
    <div>
      <StudentHeader />
      <div className="studentCards">
        {rooms.map((room) => (
          <RoomCard
            key="//TODO"
            name={room.name}
            current={room.current}
            capacity={room.capacity}
            registrationReq={room.registrationReq}
          />
        ))}
      </div>
    </div>
  );
}
