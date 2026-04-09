const SpiralBinding = () => {
  const rings = Array.from({ length: 13 }, (_, i) => i);

  return (
    <div className="relative w-full h-6 sm:h-8 flex items-center justify-center z-10">
      <div className="absolute inset-x-4 sm:inset-x-8 flex justify-between">
        {rings.map((i) => (
          <div key={i} className="relative flex flex-col items-center">
            {/* Ring */}
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-muted-foreground/40 bg-background shadow-sm" />
            {/* Wire going up behind */}
            <div className="absolute -top-1.5 w-0.5 h-3 bg-muted-foreground/30 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpiralBinding;
