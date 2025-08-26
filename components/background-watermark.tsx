interface BackgroundWatermarkProps {
  children: React.ReactNode;
  className?: string;
}

export function BackgroundWatermark({
  children,
  className = "",
}: BackgroundWatermarkProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="opacity-5 transform -rotate-12">
          <img
            src="skillmind-software.png"
            alt="SkillMind Software Watermark"
            className="w-96 h-96 object-contain"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
