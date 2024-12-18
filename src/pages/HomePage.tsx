'use client';
import Button from '@/components/atoms/Button';
import AddStudyRoom from '@/components/organisms/AddStudyRoom';
import FavouriteRooms from "@/components/organisms/FavouriteRooms";
import LoadingScreen from '@/components/organisms/LoadingScreen';
import RoomList from '@/components/organisms/RoomList';
import { db } from '@/lib/firebase/clientApp';
import { StudyRoom } from '@/types';
import { collection, onSnapshot } from 'firebase/firestore';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const HomePage = () => {
  const [studyRooms, setStudyRooms] = useState<StudyRoom[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addStudyRoom, setAddStudyRoom] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const studyroomsRef = collection(db, 'studyrooms');
    const unsubscribe = onSnapshot(studyroomsRef, (snapshot) => {
      if (!snapshot.empty) {
        const rooms: StudyRoom[] = [];
        snapshot.forEach((doc) => {
          rooms.push({ ...doc.data(), id: doc.id } as StudyRoom);
        });
        setStudyRooms(rooms);
      } else {
        setStudyRooms([]);
      }
    });

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4 bg-primary py-6 px-10">
        <Image src={'/images/pleq_logo.png'} width={40} height={40} alt="" />
        <h1 className="text-3xl font-semibold  text-white ">
          Pleq Campus Study Rooms App
        </h1>
      </div>
      <section className=" px-10">
        <div className="flex justify-between items-center mt-8 mb-4">
          <h1 className="text-2xl font-semibold ">Study Rooms</h1>
          <Button onClick={() => setAddStudyRoom(true)}>
            Add new study room
          </Button>
        </div>
        <RoomList studyRooms={studyRooms} />
        <FavouriteRooms/>
      </section>

      <AddStudyRoom
        isOpen={addStudyRoom}
        onClose={() => setAddStudyRoom(false)}
      />
    </div>
  );
};

export default HomePage;
