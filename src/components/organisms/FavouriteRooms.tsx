import React, { useEffect, useState } from 'react';
import RoomList from './RoomList';
import { collection, onSnapshot } from "firebase/firestore";
import { StudyRoom } from "@/types";
import { db } from "@/lib/firebase/clientApp";

const FavouriteRooms = () => {
  const [studyRooms, setStudyRooms] =  useState<StudyRoom[]>([]);

  useEffect(() => {
   
    const studyroomsRef = collection(db, 'studyrooms');
    const unsubscribe = onSnapshot(studyroomsRef, (snapshot) => {
      if (!snapshot.empty) {
        const rooms: StudyRoom[] = [];
        snapshot.forEach((doc) => {
          rooms.push({ ...doc.data(), id: doc.id } as StudyRoom);
        });
        setStudyRooms(rooms.filter(f=>f.isFavourite));
      } else {
        setStudyRooms([]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <h1 className="mt-8 mb-4 text-xl font-semibold">Favourite Rooms</h1>
      <RoomList studyRooms={studyRooms} />
    </div>
  );
};

export default FavouriteRooms;
