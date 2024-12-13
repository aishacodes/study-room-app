import React, { FormEvent, useState } from 'react';
import Modal from './Modal';
import { StudyRoom } from '@/types';
import { updateStudyRoom } from '@/services/studyroom.services';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

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

  const handleEditTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateStudyRoom(form);
      onClose();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Edit study room" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleEditTask}>
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
