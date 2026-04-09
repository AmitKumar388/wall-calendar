import { format } from "date-fns";
import { getMonthImage } from "@/lib/monthImages";
import { useState, useEffect } from "react";

interface HeroImageProps {
  currentMonth: Date;
}

const HeroImage = ({ currentMonth }: HeroImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [prevImage, setPrevImage] = useState<string | null>(null);
  const currentImage = getMonthImage(currentMonth);

  useEffect(() => {
    setImageLoaded(false);
    const img = new Image();
    img.src = currentImage;
    img.onload = () => {
      setImageLoaded(true);
      setPrevImage(currentImage);
    };
  }, [currentImage]);

  return (
    <div className="relative overflow-hidden bg-muted" style={{ aspectRatio: "16/9" }}>
      {/* Previous image as fallback */}
      {prevImage && prevImage !== currentImage && (
        <img
          src={prevImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {/* Current image with fade-in */}
      <img
        src={currentImage}
        alt={`${format(currentMonth, "MMMM yyyy")} scenery`}
        width={1280}
        height={720}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent" />

      {/* Wave decoration at bottom */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{ height: "60px" }}
      >
        <path
          d="M0,60 C200,120 400,0 600,60 C800,120 1000,0 1200,60 L1200,120 L0,120 Z"
          className="fill-accent"
          opacity="0.85"
        />
        <path
          d="M0,80 C300,120 500,40 800,80 C1000,110 1100,60 1200,80 L1200,120 L0,120 Z"
          className="fill-card"
        />
      </svg>

      {/* Month/year overlay */}
      <div className="absolute top-4 right-5 sm:top-6 sm:right-7 text-right">
        <p className="text-primary-foreground/80 text-sm sm:text-base font-body tracking-widest drop-shadow-md">
          {format(currentMonth, "yyyy")}
        </p>
        <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-primary-foreground drop-shadow-lg">
          {format(currentMonth, "MMMM").toUpperCase()}
        </p>
      </div>
    </div>
  );
};

export default HeroImage;
