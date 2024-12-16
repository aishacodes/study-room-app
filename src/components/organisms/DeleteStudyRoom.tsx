import React, { useState } from 'react';
import Modal from './Modal';
import Button from '../atoms/Button';
import { deleteStudyRoom } from '@/services/studyroom.services';
import { handleError } from '@/lib/helper';

const DeleteStudyRoom = ({
  isOpen,
  id,
  onClose,
}: {
  isOpen: boolean;
  id: string;
  onClose: () => void;
}) => {
  const [loading, setLoading] = useState(false);

  const handleDeleteStudyRoom = async () => {
    try {
      setLoading(true);
      await deleteStudyRoom(id);
      onClose();
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <p>Are you sure you want to delete this study room?</p>
        <div className="flex items-center gap-2 mt-8 justify-center">
          <Button variant="outline" onClick={() => onClose()}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            loading={loading}
            onClick={handleDeleteStudyRoom}
          >
            Yes
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteStudyRoom;
