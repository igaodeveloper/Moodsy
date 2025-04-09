"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MoodElement {
  id: string;
  name: string;
  description: string;
  xpCost: number;
  unlocked: boolean;
  category: "decoration" | "interactive" | "special";
  icon: string;
}

interface MoodElementsProps {
  moodMode: boolean;
  currentXP: number;
}

export default function MoodElements({
  moodMode,
  currentXP,
}: MoodElementsProps) {
  const [elements, setElements] = useState<MoodElement[]>([
    {
      id: "1",
      name: "Árvore Feliz",
      description: "Uma árvore que sorri quando você está feliz",
      xpCost: 100,
      unlocked: true,
      category: "decoration",
      icon: "🌳",
    },
    {
      id: "2",
      name: "Nuvem de Chuva",
      description: "Reflete dias melancólicos ou tristes",
      xpCost: 150,
      unlocked: true,
      category: "decoration",
      icon: "☁️",
    },
    {
      id: "3",
      name: "Fonte dos Desejos",
      description: "Faça um desejo e veja seu humor mudar",
      xpCost: 200,
      unlocked: false,
      category: "interactive",
      icon: "⛲",
    },
    {
      id: "4",
      name: "Arco-íris Mágico",
      description: "Aparece em momentos de grande felicidade",
      xpCost: 250,
      unlocked: false,
      category: "special",
      icon: "🌈",
    },
    {
      id: "5",
      name: "Banco de Reflexão",
      description: "Um lugar para sentar e refletir sobre o dia",
      xpCost: 120,
      unlocked: true,
      category: "interactive",
      icon: "🪑",
    },
    {
      id: "6",
      name: "Estrela Cadente",
      description: "Aparece aleatoriamente para trazer boa sorte",
      xpCost: 300,
      unlocked: false,
      category: "special",
      icon: "⭐",
    },
  ]);

  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredElements =
    activeCategory === "all"
      ? elements
      : elements.filter((element) => element.category === activeCategory);

  const unlockElement = (id: string) => {
    setElements(
      elements.map((element) =>
        element.id === id ? { ...element, unlocked: true } : element,
      ),
    );
  };

  return (
    <div className="bg-background p-4 rounded-lg h-full overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          {moodMode ? "Elementos de Humor Diário" : "Elementos do Mundinho"}
        </h2>
        <div className="flex gap-2">
          <Button
            variant={activeCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory("all")}
          >
            Todos
          </Button>
          <Button
            variant={activeCategory === "decoration" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory("decoration")}
          >
            Decoração
          </Button>
          <Button
            variant={activeCategory === "interactive" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory("interactive")}
          >
            Interativos
          </Button>
          <Button
            variant={activeCategory === "special" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory("special")}
          >
            Especiais
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredElements.map((element) => (
          <Card
            key={element.id}
            className={`${!element.unlocked ? "opacity-75" : ""}`}
          >
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{element.icon}</span>
                  {element.name}
                </CardTitle>
                <Badge variant={element.unlocked ? "default" : "outline"}>
                  {element.unlocked ? "Desbloqueado" : `${element.xpCost} XP`}
                </Badge>
              </div>
              <CardDescription>{element.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-24 bg-muted/50 rounded-md flex items-center justify-center">
                <span className="text-4xl">{element.icon}</span>
              </div>
            </CardContent>
            <CardFooter>
              {!element.unlocked ? (
                <Button
                  className="w-full"
                  disabled={currentXP < element.xpCost}
                  onClick={() => unlockElement(element.id)}
                >
                  {currentXP >= element.xpCost
                    ? "Desbloquear"
                    : "XP Insuficiente"}
                </Button>
              ) : (
                <Button className="w-full" variant="outline">
                  Adicionar ao Mundinho
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
