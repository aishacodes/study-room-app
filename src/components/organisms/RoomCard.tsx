import { StudyRoom } from '@/types';
import React, { useState } from 'react';
import Button from '../atoms/Button';
import DeleteStudyRoom from './DeleteStudyRoom';
import EditStudyRoom from './EditStudyRoom';

const RoomCard = ({ id, name, location, capacity }: StudyRoom) => {
  const [onDelete, setOnDelete] = useState(false);
  const [onEdit, setOnEdit] = useState(false);

  return (
    <div className="w-80 bg-secondary p-4 rounded-lg border border-gray-300 shadow-sm flex flex-col">
      <div className="flex-grow">
        <h3 className="font-semibold mb-4 text-lg">{name}</h3>
        <p className="text-sm text-muted-foreground mb-2">{location}</p>
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
        room={{ id, capacity, name, location }}
        isOpen={onEdit}
        onClose={() => setOnEdit(false)}
      />
    </div>
  );
};

export default RoomCard;
