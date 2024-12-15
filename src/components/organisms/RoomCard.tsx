import { StudyRoom } from '@/types';
import React, { useState } from 'react';
import Button from '../atoms/Button';
import DeleteStudyRoom from './DeleteStudyRoom';
import EditStudyRoom from './EditStudyRoom';
import Image from 'next/image';

const RoomCard = ({ id, name, location, lat, lng, capacity }: StudyRoom) => {
  const [onDelete, setOnDelete] = useState(false);
  const [onEdit, setOnEdit] = useState(false);

  return (
    <div className="w-auto bg-secondary p-4 rounded-lg border border-gray-300 shadow-sm flex flex-col">
      <div className="flex-grow">
        <Image
          src={'/images/study-room.jpg'}
          className="w-20 h-20 rounded-full"
          width={100}
          height={100}
          alt=""
        />
        <h3 className="font-semibold mb-4 text-lg">{name}</h3>
        <p className="text-sm text-muted-foreground mb-2">
          Location: {location}
          <a
            href={`https://www.google.com/maps?q=${lat},${lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 text-xs text-blue-700 underline"
          >
            View on Google Maps
          </a>
        </p>
        <p className="text-sm">Capacity: {capacity}</p>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <Button variant="outline" onClick={() => setOnEdit(true)}>
          Edit
        </Button>
        <Button variant="destructive" onClick={() => setOnDelete(true)}>
          Delete
        </Button>
      </div>
      <DeleteStudyRoom
        id={id}
        isOpen={onDelete}
        onClose={() => setOnDelete(false)}
      />
      <EditStudyRoom
        room={{ id, capacity, name, lat, lng, location }}
        isOpen={onEdit}
        onClose={() => setOnEdit(false)}
      />
    </div>
  );
};

export default RoomCard;
