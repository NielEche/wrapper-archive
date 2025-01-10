'use client';

import { useState } from 'react';

const Series = ({ series }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="bg-off grid lg:grid-cols-3 grid-cols-3 gap-0 text-black py-4">
      {series.map((photoseries) => (
        <div key={photoseries.id} className="lg:p-6 p-2">
          <img
            src={photoseries.image.url}
            width={300}
            height={200}
            alt={photoseries.title}
            className="object-cover mx-auto flex seriesCover cursor-pointer"
            onClick={() => handleImageClick(photoseries.image.url)}
          />
        </div>
      ))}

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[1000]"
          onClick={closeModal}
        >
          <div
            className="relative bg-off  shadow-lg p-4 max-w-lg mx-auto border-black border"
            onClick={(e) => e.stopPropagation()}  >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600">
              ✕
            </button>
            <img
              src={selectedImage}
              alt="Selected"
              className="object-contain max-w-full max-h-[600px] "
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Series;
