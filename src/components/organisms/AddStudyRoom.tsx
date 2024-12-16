import React, { FormEvent, useState } from 'react';
import Input from '../atoms/Input';
import { createStudyRoom } from '@/services/studyroom.services';
import Button from '../atoms/Button';
import { mapApiKey } from '@/lib/firebase/clientApp';
import Modal from './Modal';

const AddStudyRoom = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const defaultForm = {
    name: '',
    lat: 0,
    lng: 0,
    capacity: 0,
    location: '',
    openingHour: '',
    closingHour: '',
  };
  const [form, setForm] = useState(defaultForm);
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

  const handleAddTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const coordinates = await fetchCoordinates();
      await createStudyRoom({ ...form, ...coordinates });
      setForm(defaultForm);
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleAddTask}>
        <h1 className="text-2xl font-semibold mb-4">Add New Study Room</h1>
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
          onChange={(e) => updateField('location', e.target.value)}
          placeholder="Enter a location"
        />
        <div className="flex items-center gap-2 mt-8 justify-center">
          <Button variant="outline" onClick={() => onClose()}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Add Room
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddStudyRoom;
