import React, { FormEvent, useState } from 'react';
import Input from '../atoms/Input';
import { createStudyRoom } from '@/services/studyroom.services';
import Button from '../atoms/Button';

const AddStudyRoom = () => {
  const [form, setForm] = useState({ name: '', location: '', capacity: 0 });
  const [loading, setLoading] = useState(false);

  const updateField = (field: string, value: string) =>
    setForm({ ...form, [field]: value });

  const handleAddTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createStudyRoom(form);
      setForm({ name: '', location: '', capacity: 0 })
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleAddTask} className="w-3/4">
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
        label="Location"
        value={form.location}
        required
        onChange={(e) => updateField('location', e.target.value)}
        placeholder="Location"
      />
      <Button type="submit" loading={loading} className="mt-4">
        Add Room
      </Button>
    </form>
  );
};

export default AddStudyRoom;
