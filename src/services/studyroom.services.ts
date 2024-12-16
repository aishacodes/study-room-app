import { db, mapApiKey, storage } from '@/lib/firebase/clientApp';
import { StudyRoom } from '@/types';
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from 'firebase/storage';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from 'firebase/firestore';
import { handleError } from '@/lib/helper';

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

export const uploadFile = async (image: File) => {
  if (image === null) {
    alert('Please select an image');
    return null;
  }
  const imageRef = storageRef(storage, `images/${image.name}`);
  try {
    const snapshot = await uploadBytes(imageRef, image);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  } catch (error) {
    handleError(error);
  }
};

export const fetchCoordinates = async (location: string) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      location
    )}&key=${mapApiKey}`
  );
  const data = await response.json();
  if (data.results.length > 0) {
    const { lat, lng } = data.results[0].geometry.location;
    return { lat, lng };
  } else {
    alert('Location not found on map!');
  }
};
