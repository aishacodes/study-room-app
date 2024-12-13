import React, { ReactNode, useRef } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import Image from 'next/image';

const Modal = ({
  title,
  children,
  onClose,
  isOpen,
}: {
  title?: string;
  children: ReactNode;
  onClose: () => void;
  isOpen: boolean;
}) => {
  const modalRef = useRef(null);
  useClickOutside(modalRef, onClose);

  return (
    <>
      {isOpen ? (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-30">
          <div
            ref={modalRef}
            className="my-8 bg-white px-3 md:px-6 pt-8 rounded-lg w-11/12 md:w-2/3 lg:w-1/2 text-black relative max-h-[90vh] flex flex-col"
          >
            {title ? <h2 className="text-xl font-bold mb-4">{title}</h2> : null}
            <Image
              width={24}
              height={24}
              alt=""
              src="/svgs/CirrcleX.svg"
              className="absolute right-3 top-3 cursor-pointer"
              onClick={onClose}
            />
            <div className="overflow-y-auto flex-grow pb-8" role="dialog">
              {children}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
