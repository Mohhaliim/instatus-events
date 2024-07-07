import React from 'react';

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="dot w-2 h-2 bg-white rounded-full mx-1"></div>
      <div className="dot w-2 h-2 bg-white rounded-full mx-1"></div>
      <div className="dot w-2 h-2 bg-white rounded-full mx-1"></div>
    </div>
  );
};
