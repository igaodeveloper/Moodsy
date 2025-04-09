"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface AuthButtonsProps {
  onGuestContinue?: () => void;
  className?: string;
}

export default function AuthButtons({
  onGuestContinue,
  className = "",
}: AuthButtonsProps) {
  const router = useRouter();

  const handleSignIn = () => {
    // Navigate to sign in page (to be implemented)
    router.push("/signin");
  };

  const handleCreateAccount = () => {
    // Navigate to create account page (to be implemented)
    router.push("/signup");
  };

  const handleGuestContinue = () => {
    if (onGuestContinue) {
      onGuestContinue();
    } else {
      // Navigate to MoodFeed as guest
      router.push("/moodfeed");
    }
  };

  return (
    <div
      className={`flex flex-col space-y-4 w-full max-w-xs mx-auto ${className}`}
    >
      <Button
        variant="default"
        className="w-full py-6 text-base font-medium transition-all hover:scale-105"
        onClick={handleSignIn}
      >
        Entrar
      </Button>

      <Button
        variant="outline"
        className="w-full py-6 text-base font-medium transition-all hover:scale-105"
        onClick={handleCreateAccount}
      >
        Criar conta
      </Button>

      <Button
        variant="ghost"
        className="w-full py-6 text-base font-medium transition-all hover:scale-105"
        onClick={handleGuestContinue}
      >
        Continuar como visitante
      </Button>
    </div>
  );
}
