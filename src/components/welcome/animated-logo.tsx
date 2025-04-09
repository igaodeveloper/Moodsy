"use client";

import { useEffect, useState } from "react";

interface AnimatedLogoProps {
  size?: "sm" | "md" | "lg";
}

export default function AnimatedLogo({ size = "lg" }: AnimatedLogoProps) {
  const [isAnimating, setIsAnimating] = useState(true);

  // Size classes based on the size prop
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  useEffect(() => {
    // Start animation when component mounts
    setIsAnimating(true);

    // Animation completes after 2 seconds
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative ${sizeClasses[size]} mx-auto`}>
      {/* Logo circle with pulsing animation */}
      <div
        className={`absolute inset-0 rounded-full bg-primary ${isAnimating ? "animate-pulse" : ""}`}
      />

      {/* Inner circle with mood icon */}
      <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
        <div className="text-primary text-2xl font-bold">
          {/* Simple mood icon - can be replaced with an actual SVG/image */}
          <span className="text-4xl">😊</span>
        </div>
      </div>

      {/* Animated rings around the logo */}
      <div
        className={`absolute -inset-4 rounded-full border-4 border-primary/30 ${isAnimating ? "animate-ping" : ""} opacity-75`}
      />
      <div
        className={`absolute -inset-8 rounded-full border-2 border-primary/20 ${isAnimating ? "animate-ping" : ""} opacity-50 delay-100`}
      />
    </div>
  );
}
