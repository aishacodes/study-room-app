import React, { FormEvent, useState } from 'react';
import Input from '../atoms/Input';
import { createStudyRoom } from '@/services/studyroom.services';
import Button from '../atoms/Button';
import { mapApiKey } from '@/lib/firebase/clientApp';

const AddStudyRoom = () => {
  const [form, setForm] = useState({
    name: '',
    lat: 0,
    lng: 0,
    capacity: 0,
    location: '',
  });
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
      setForm({ ...form, lat, lng });
    } else {
      alert('Location not found!');
    }
  };
  const handleAddTask = async () => {
    try {
      setLoading(true);
      await createStudyRoom({ ...form });
      setForm({ name: '', lat: 0, lng: 0, location: '', capacity: 0 });
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await fetchCoordinates();
        handleAddTask();
      }}
      className="w-3/4"
    >
      <h1 className="text-2xl font-semibold mt-8 mb-4">Add New Study Room</h1>
      <div className="flex gap-2 mb-2">
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
      </div>
      <Input
        type="text"
        value={form.location}
        onChange={(e) => updateField('location', e.target.value)}
        placeholder="Enter a location"
      />
      <Button type="submit" loading={loading} className="mt-4">
        Add Room
      </Button>
    </form>
  );
};

export default AddStudyRoom;
