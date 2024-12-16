import React from 'react'
import RoomCard from "./RoomCard"
import { StudyRoom } from "@/types"

const RoomList = ({studyRooms}:{studyRooms:StudyRoom[]}) => {
  
  return (
    <div className="grid md:grid-cols-autofill gap-4">
    {studyRooms.map((room) => (
      <RoomCard {...room} key={room.id} />
    ))}
  </div>
  )
}

export default RoomList