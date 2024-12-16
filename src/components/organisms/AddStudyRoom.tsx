import React, { FormEvent, useState } from 'react';
import Input from '../atoms/Input';
import {
  createStudyRoom,
  fetchCoordinates,
  uploadFile,
} from '@/services/studyroom.services';
import Button from '../atoms/Button';
import Modal from './Modal';
import Image from 'next/image';
import { handleError } from '@/lib/helper';

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
    image: '',
  };
  const [form, setForm] = useState({ ...defaultForm });
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const updateField = (field: string, value: string) =>
    setForm({ ...form, [field]: value });

  const handleAddStudyRoom = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.openingHour >= form.closingHour) {
      alert('Opening hour must be earlier than closing hour!');
      return;
    }
    setLoading(true);
    try {
      const coordinates = await fetchCoordinates(form.location);
      await createStudyRoom({ ...form, ...coordinates });
      alert("Study room added successfully")
      setForm(defaultForm);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleAddStudyRoom}>
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
            type="number"   min="0"
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
          label="Location" required
          value={form.location}
          onChange={(e) => updateField('location', e.target.value)}
          placeholder="Enter a location"
        />
        <div className="mt-3">
          <Input required
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
          {uploadingImage ? 'Uploading image...' : ''}
        </div>
        {form.image && (
          <Image src={form.image} width={100} height={100} alt="Uploaded" />
        )}
        <div className="flex items-center gap-2 mt-10 justify-center">
          <Button variant="outline" onClick={() => onClose()}>
            Cancel
          </Button>
          <Button
            type="submit"
            loading={loading}
            disabled={loading || uploadingImage}
          >
            Add Room
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddStudyRoom;
