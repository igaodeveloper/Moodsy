"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface MissionProps {
  className?: string;
}

interface Mission {
  id: number;
  emoji: string;
  title: string;
  xp: number;
  reward: string;
  completed: boolean;
}

export default function DailyMissions({ className = "" }: MissionProps) {
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: 1,
      emoji: "💧",
      title: "Beber água",
      xp: 50,
      reward: "Regador",
      completed: false,
    },
    {
      id: 2,
      emoji: "🧘",
      title: "Meditar 1min",
      xp: 100,
      reward: "Almofada de meditação",
      completed: false,
    },
    {
      id: 3,
      emoji: "☀️",
      title: "Sair ao sol",
      xp: 75,
      reward: "Óculos de sol",
      completed: false,
    },
    {
      id: 4,
      emoji: "🚶",
      title: "Caminhar 10 minutos",
      xp: 80,
      reward: "Tênis colorido",
      completed: false,
    },
    {
      id: 5,
      emoji: "🌱",
      title: "Cuidar de uma planta",
      xp: 60,
      reward: "Semente mágica",
      completed: false,
    },
  ]);

  const [totalXp, setTotalXp] = useState(0);
  const [earnedItems, setEarnedItems] = useState<string[]>([]);
  const [showReward, setShowReward] = useState(false);
  const [currentReward, setCurrentReward] = useState({ xp: 0, item: "" });

  const handleCompleteMission = (id: number) => {
    const updatedMissions = missions.map((mission) => {
      if (mission.id === id && !mission.completed) {
        // Show reward animation
        setCurrentReward({ xp: mission.xp, item: mission.reward });
        setShowReward(true);

        // Update total XP and earned items
        setTotalXp((prev) => prev + mission.xp);
        setEarnedItems((prev) => [...prev, mission.reward]);

        // Hide reward after 2 seconds
        setTimeout(() => {
          setShowReward(false);
        }, 2000);

        return { ...mission, completed: true };
      }
      return mission;
    });

    setMissions(updatedMissions);
  };

  const resetMissions = () => {
    const resetMissions = missions.map((mission) => ({
      ...mission,
      completed: false,
    }));
    setMissions(resetMissions);
  };

  return (
    <div className={`min-h-screen p-6 flex flex-col ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Missões Diárias</h1>
        <div className="bg-primary/10 px-4 py-2 rounded-full">
          <span className="font-bold">{totalXp} XP</span>
        </div>
      </div>

      {/* Mission List */}
      <div className="space-y-4 mb-8">
        {missions.map((mission) => (
          <div
            key={mission.id}
            className={`p-4 rounded-lg border flex justify-between items-center transition-all ${mission.completed ? "bg-primary/10 border-primary" : "bg-background border-input"}`}
          >
            <div className="flex items-center space-x-4">
              <span className="text-2xl">{mission.emoji}</span>
              <div>
                <h3 className="font-medium">{mission.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {mission.xp} XP + {mission.reward}
                </p>
              </div>
            </div>
            <Button
              variant={mission.completed ? "ghost" : "outline"}
              className={
                mission.completed ? "opacity-50 cursor-not-allowed" : ""
              }
              onClick={() => handleCompleteMission(mission.id)}
              disabled={mission.completed}
            >
              {mission.completed ? "Concluído" : "Completar"}
            </Button>
          </div>
        ))}
      </div>

      {/* Earned Items Section */}
      {earnedItems.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Itens Conquistados:</h2>
          <div className="flex flex-wrap gap-2">
            {earnedItems.map((item, index) => (
              <div
                key={index}
                className="bg-primary/10 px-3 py-1 rounded-full text-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reset Button (for demo purposes) */}
      <Button variant="ghost" className="mt-auto" onClick={resetMissions}>
        Reiniciar Missões (Demo)
      </Button>

      {/* Reward Animation Overlay */}
      {showReward && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-background p-8 rounded-lg text-center animate-bounce">
            <h2 className="text-xl font-bold mb-2">Parabéns! 🎉</h2>
            <p className="text-lg mb-1">+{currentReward.xp} XP</p>
            <p className="text-lg">Item: {currentReward.item}</p>
          </div>
        </div>
      )}
    </div>
  );
}
