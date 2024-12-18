import React, { FormEvent, useState } from 'react';
import Modal from './Modal';
import { StudyRoom } from '@/types';
import {
  fetchCoordinates,
  updateStudyRoom,
  uploadFile,
} from '@/services/studyroom.services';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { handleError } from '@/lib/helper';
import Image from 'next/image';

const EditStudyRoom = ({
  isOpen,
  onClose,
  room,
}: {
  isOpen: boolean;
  onClose: () => void;
  room: StudyRoom;
}) => {
  console.log(room);
  const [form, setForm] = useState({ ...room });
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const updateField = (field: string, value: string) =>
    setForm({ ...form, [field]: value });

  const handleEditStudyRoom = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.openingHour >= form.closingHour) {
      alert('Opening hour must be earlier than closing hour!');
      return;
    }
    setLoading(true);
    try {
      const coordinates = await fetchCoordinates(form.location);
      await updateStudyRoom(room.id, {
        ...form,
        isFavourite: form.isFavourite,
        ...coordinates,
      });
      onClose();
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Edit study room" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleEditStudyRoom}>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <Input
            label="Name"
            type="text"
            required
            value={form.name}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder="Enter name"
          />
          <Input
            label="Capacity"
            type="number"
            min="0"
            required
            value={form.capacity}
            onChange={(e) => updateField('capacity', e.target.value)}
            placeholder="Capacity"
          />
          <Input
            label="Opening hoour"
            type="time"
            value={form.openingHour}
            onChange={(e) => updateField('openingHour', e.target.value)}
            required
          />
          <Input
            label="Closing hour"
            type="time"
            value={form.closingHour}
            onChange={(e) => updateField('closingHour', e.target.value)}
            required
          />
        </div>
        <Input
          type="text"
          label="Location"
          value={form.location}
          required
          onChange={(e) => updateField('location', e.target.value)}
          placeholder="Location"
        />
        <div className="mt-3">
          <Input
            label="Upload room picture"
            type="file"
            accept="image/png,image/jpeg"
            onChange={async (e) => {
              if (e.target.files?.length) {
                setUploadingImage(true);
                const img = await uploadFile(e.target.files[0]);
                if (img) updateField('image', img);
                setUploadingImage(false);
              }
            }}
          />
          {uploadingImage ? 'Uploading...' : ''}
        </div>
        {form.image && (
          <Image src={form.image} width={100} height={100} alt="Uploaded" />
        )}
        <div className="flex items-center gap-2 mt-8 justify-center">
          <Button variant="outline" onClick={() => onClose()}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Update
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditStudyRoom;
