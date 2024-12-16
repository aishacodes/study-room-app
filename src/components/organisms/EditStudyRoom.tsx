import React, { FormEvent, useState } from 'react';
import Modal from './Modal';
import { StudyRoom } from '@/types';
import { updateStudyRoom } from '@/services/studyroom.services';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { mapApiKey } from "@/lib/firebase/clientApp";

const EditStudyRoom = ({
  isOpen,
  onClose,
  room,
}: {
  isOpen: boolean;
  onClose: () => void;
  room: StudyRoom;
}) => {
  const [form, setForm] = useState({ ...room });
  const [loading, setLoading] = useState(false);

  const updateField = (field: string, value: string) =>
    setForm({ ...form, [field]: value });

  const fetchCoordinates = async () => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        form.location
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
  const handleEditTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.openingHour >= form.closingHour) {
      alert('Opening hour must be earlier than closing hour!');
      return;
    }
    setLoading(true);
    try {
      const coordinates = await fetchCoordinates();
      await updateStudyRoom({ ...form, ...coordinates });
      onClose();
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Edit study room" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleEditTask}>
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
