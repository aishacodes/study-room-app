import { StudyRoom } from '@/types';
import React, { useState } from 'react';
import DeleteStudyRoom from './DeleteStudyRoom';
import EditStudyRoom from './EditStudyRoom';
import Image from 'next/image';
import StarIcon from '../atoms/StarIcon';
import { updateStudyRoom } from '@/services/studyroom.services';

const RoomCard = ({
  id,
  name,
  location,
  lat,
  lng,
  capacity,
  openingHour,
  closingHour,
  image,
  isFavourite,
}: StudyRoom) => {
  const [onDelete, setOnDelete] = useState(false);
  const [onEdit, setOnEdit] = useState(false);

  const toggleFav = (id: string) => {
    updateStudyRoom(id, {
      isFavourite: !isFavourite,
    });
  };

  return (
    <div className="flex gap-2 bg-secondary p-4  rounded-lg border border-gray-300 shadow-sm items-start relative">
      <Image
        src={image}
        className="w-14 h-14 rounded-full"
        width={60}
        height={60}
        alt=""
      />
      <div className="flex-grow">
        <h3 className="font-semibold text-lg mb-2">{name}</h3>
        <div className="flex justify-between  items-center mb-1">
          <p className="text-sm text-muted-foreground text-gray-700 ">
            Location: {location}
          </p>
          <a
            href={`https://www.google.com/maps?q=${lat},${lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 text-xs text-blue-700 underline"
          >
            View on Google Maps
          </a>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <p>
            Opening hour: {openingHour} - {closingHour}
          </p>
          <p>{capacity} seat</p>
        </div>
      </div>
      <div className=" flex items-center gap-2 absolute top-2 right-2">
        <StarIcon
          color={isFavourite ? 'yellow' : 'gray'}
          onClick={() => toggleFav(id)}
        />
        <button onClick={() => setOnEdit(true)}>
          <Image
            width={20}
            height={20}
            alt=""
            src="/svgs/edit.svg"
            className=" cursor-pointer w-6 h-6 "
          />
        </button>
        <button onClick={() => setOnDelete(true)}>
          <Image
            width={20}
            height={20}
            alt=""
            src="/svgs/delete.svg"
            className=" cursor-pointer w-6"
          />{' '}
        </button>
      </div>
      <DeleteStudyRoom
        id={id}
        isOpen={onDelete}
        onClose={() => setOnDelete(false)}
      />
      <EditStudyRoom
        room={{
          id,
          capacity,
          name,
          lat,
          lng,
          location,
          openingHour,
          closingHour,
          image,
          isFavourite,
        }}
        isOpen={onEdit}
        onClose={() => setOnEdit(false)}
      />
    </div>
  );
};

export default RoomCard;
