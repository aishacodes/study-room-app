import { StudyRoom } from '@/types';

export const mockRooms: StudyRoom[] = [
  {
    id: '1',
    capacity: 3,
    closingHour: '23:30',
    image:
      'https://firebasestorage.googleapis.com/v0/b/study-room-firebase.firebasestorage.app/o/images%2Fth-4196513686.png?alt=media&token=f7234ae1-1b10-4ff7-af10-c1e165dd8220',
    lat: 35.1374021,
    lng: -3.8502617,
    location: 'Imzouren',
    name: 'PLEQ office',
    openingHour: '20:30',isFavourite:false
  },
  {
    id: '2',
    capacity: 3,
    closingHour: '23:30',
    image:
      'https://firebasestorage.googleapis.com/v0/b/study-room-firebase.firebasestorage.app/o/images%2Fth-4196513686.png?alt=media&token=f7234ae1-1b10-4ff7-af10-c1e165dd8220',
    lat: 52.0811565,
    lng: 4.3241628,
    location: 'Imzouren',
    name: 'Block 20',
    openingHour: '20:30',isFavourite:false
  },
];
