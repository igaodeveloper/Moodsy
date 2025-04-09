"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AnimatedLogo from "@/components/welcome/animated-logo";
import AuthButtons from "@/components/welcome/auth-buttons";

export default function WelcomeScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleGuestContinue = () => {
    setIsLoading(true);
    // Navigate to MoodFeed
    router.push("/moodfeed");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/10 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md mx-auto flex flex-col items-center space-y-12">
        {/* Animated Logo */}
        <div className="mb-8">
          <AnimatedLogo size="lg" />
        </div>

        {/* Tagline */}
        <h2 className="text-2xl font-semibold text-center text-foreground mb-12">
          Como você está hoje?
        </h2>

        {/* Auth Buttons */}
        <AuthButtons onGuestContinue={handleGuestContinue} className="mt-8" />

        {/* Loading indicator */}
        {isLoading && (
          <div className="mt-4 text-sm text-muted-foreground">
            Carregando...
          </div>
        )}
      </div>
    </div>
  );
}
