import Image from 'next/image';
import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="h-screen w-screen bg-primary flex flex-col items-center justify-center">
      <Image
        src={'/images/pleq_logo.png'}
        width={200}
        height={200}
        alt={''}
        className="animate-scale-in-out"
      />
      <p className="text-3xl font-semibold  mb-4 bg-primary text-white py-6 px-10">
        Pleq Campus Study Rooms App
      </p>
    </div>
  );
};

export default LoadingScreen;
