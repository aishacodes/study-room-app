import { db } from '@/lib/firebase/clientApp';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from 'firebase/firestore';

export interface StudyRoom {
  id?: string;
  name: string;
  location: string;
  capacity: number;
}

const COLLECTION_NAME = 'studyrooms';

const studyroomsRef = collection(db, COLLECTION_NAME);

export const getStudyRooms = () => {
  return onSnapshot(studyroomsRef, (snapshot) => {
    if (!snapshot.empty) {
      const rooms = [];
      snapshot.forEach((doc) => {
        rooms.push({ ...doc.data, id: doc.id });
      });
    }
  });
 
};

export const createStudyRoom = async (
  room: Omit<StudyRoom, 'id'>
): Promise<string> => {
  const docRef = await addDoc(studyroomsRef, room);
  return docRef.id;
};

export const updateStudyRoom = async (room: StudyRoom): Promise<void> => {
  const { id, ...updateData } = room;
  await updateDoc(doc(db, COLLECTION_NAME, id!), updateData);
};

export const deleteStudyRoom = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
};

