'use client';
import AddStudyRoom from '@/components/organisms/AddStudyRoom';
import RoomCard from '@/components/organisms/RoomCard';
import { db } from '@/lib/firebase/clientApp';
import { StudyRoom } from '@/types';
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

const HomePage = () => {
  const [studyRooms, setStudyRooms] = useState<StudyRoom[]>([]);

  useEffect(() => {
    const studyroomsRef = collection(db, 'studyrooms');
    const unsubscribe = onSnapshot(studyroomsRef, (snapshot) => {
      if (!snapshot.empty) {
        const rooms: StudyRoom[] = [] ;
        snapshot.forEach((doc) => {
          rooms.push({ ...doc.data(), id: doc.id } as StudyRoom);
        });
        setStudyRooms(rooms);
        return;
      }
      setStudyRooms([]);

    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="py-6 px-10">
      <h1 className="text-3xl font-semibold  mb-4">
        Pleq Campus Study Rooms App
      </h1>
      <AddStudyRoom />
      <section>
        <h1 className="text-2xl font-semibold mt-8 mb-4">Study Rooms</h1>
        <div className="flex flex-wrap gap-4">
          {studyRooms.map((room, index) => (
            <RoomCard {...room} key={`room-${index}`} />
          ))}
          {/* {loading
            ? studyRooms.map((room, index) => (
                <RoomCard {...room} key={`room-${index}`} />
              ))
            : Array(8)
                .fill('')
                .map((_, index) => (
                  <LoadingSkeleton type="card" key={`room-skeleton-${index}`} />
                ))} */}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
