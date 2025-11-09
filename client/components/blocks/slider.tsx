"use client";

import { useState } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import type { SliderBlock } from "@/lib/types";
import { StrapiImage } from "../strapi-image";

export default function Slider({ data }: { data: SliderBlock }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const files = data.files;

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? files.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === files.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (!files || files.length === 0) {
    return null;
  }

  return (
    <div className="my-8 relative">
      <div className="relative w-full h-96 rounded-lg overflow-hidden">
        <StrapiImage
          image={files[currentIndex]}
          fill
          className="object-cover"
        />
      </div>

      <button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-primary p-2 rounded-full shadow-md hover:bg-primary/80 text-background"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary p-2 rounded-full shadow-md hover:bg-primary/80 text-background"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="flex justify-center mt-4 gap-2">
        {files.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-primary" : "bg-muted"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
