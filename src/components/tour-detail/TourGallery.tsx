import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TourGalleryProps {
  images: string[];
  title: string;
}

export const TourGallery = ({ images, title }: TourGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* Main Gallery Grid */}
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-4 gap-2 h-[500px] rounded-2xl overflow-hidden">
          {/* Main Image - Large */}
          <div
            className="col-span-4 md:col-span-2 md:row-span-2 relative group cursor-pointer"
            onClick={() => {
              setSelectedImage(0);
              setIsLightboxOpen(true);
            }}
          >
            <img
              src={images[0]}
              alt={`${title} - Main view`}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
              <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Smaller Images */}
          {images.slice(1, 5).map((image, index) => (
            <div
              key={index}
              className="relative group cursor-pointer overflow-hidden"
              onClick={() => {
                setSelectedImage(index + 1);
                setIsLightboxOpen(true);
              }}
            >
              <img
                src={image}
                alt={`${title} - View ${index + 2}`}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                <Maximize2 className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              {index === 3 && images.length > 5 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white text-2xl font-heading font-bold">
                    +{images.length - 5} photos
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white">
            {selectedImage + 1} / {images.length}
          </div>

          {/* Previous Button */}
          <button
            onClick={prevImage}
            className="absolute left-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Main Image */}
          <div className="max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-4">
            <img
              src={images[selectedImage]}
              alt={`${title} - View ${selectedImage + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Next Button */}
          <button
            onClick={nextImage}
            className="absolute right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Thumbnail Strip */}
          <div className="absolute bottom-4 left-0 right-0 z-10">
            <div className="flex items-center justify-center gap-2 overflow-x-auto px-4 pb-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    index === selectedImage
                      ? 'border-white scale-110'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
