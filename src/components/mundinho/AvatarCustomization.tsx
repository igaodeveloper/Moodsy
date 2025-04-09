"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AvatarCustomizationProps {
  moodMode?: boolean;
}

type AvatarPart = {
  id: number;
  name: string;
  image: string;
  xpRequired: number;
  unlocked: boolean;
};

export default function AvatarCustomization({
  moodMode = false,
}: AvatarCustomizationProps) {
  // Avatar parts categories
  const [heads, setHeads] = useState<AvatarPart[]>([
    { id: 1, name: "Básico", image: "👤", xpRequired: 0, unlocked: true },
    { id: 2, name: "Sorridente", image: "😊", xpRequired: 0, unlocked: true },
    { id: 3, name: "Pensativo", image: "🤔", xpRequired: 100, unlocked: true },
    { id: 4, name: "Elegante", image: "😎", xpRequired: 200, unlocked: false },
    {
      id: 5,
      name: "Misterioso",
      image: "🥸",
      xpRequired: 300,
      unlocked: false,
    },
  ]);

  const [clothes, setClothes] = useState<AvatarPart[]>([
    { id: 1, name: "Casual", image: "👕", xpRequired: 0, unlocked: true },
    { id: 2, name: "Esportivo", image: "🎽", xpRequired: 0, unlocked: true },
    { id: 3, name: "Formal", image: "🧥", xpRequired: 150, unlocked: true },
    { id: 4, name: "Praia", image: "👙", xpRequired: 250, unlocked: false },
    { id: 5, name: "Fantasia", image: "👘", xpRequired: 350, unlocked: false },
  ]);

  const [accessories, setAccessories] = useState<AvatarPart[]>([
    { id: 1, name: "Nenhum", image: "❌", xpRequired: 0, unlocked: true },
    { id: 2, name: "Chapéu", image: "🧢", xpRequired: 50, unlocked: true },
    { id: 3, name: "Óculos", image: "👓", xpRequired: 100, unlocked: true },
    { id: 4, name: "Coroa", image: "👑", xpRequired: 300, unlocked: false },
    { id: 5, name: "Mágico", image: "🪄", xpRequired: 400, unlocked: false },
  ]);

  // Selected parts
  const [selectedHead, setSelectedHead] = useState<number>(1);
  const [selectedClothes, setSelectedClothes] = useState<number>(1);
  const [selectedAccessory, setSelectedAccessory] = useState<number>(1);

  // Get the selected items
  const currentHead = heads.find((h) => h.id === selectedHead);
  const currentClothes = clothes.find((c) => c.id === selectedClothes);
  const currentAccessory = accessories.find((a) => a.id === selectedAccessory);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col items-center justify-center p-6 bg-primary/5 rounded-lg mb-6">
        <div className="text-8xl mb-4 flex flex-col items-center">
          <div>{currentHead?.image || "👤"}</div>
          <div className="mt-2">{currentClothes?.image || "👕"}</div>
          {currentAccessory?.id !== 1 && (
            <div className="mt-2">{currentAccessory?.image}</div>
          )}
        </div>
        <h2 className="text-xl font-semibold">Seu Avatar</h2>
        {moodMode && (
          <p className="text-sm text-muted-foreground mt-2">
            Modo Diário ativo: seu avatar reflete seu humor atual
          </p>
        )}
      </div>

      <Tabs defaultValue="head" className="flex-1">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="head">Rosto</TabsTrigger>
          <TabsTrigger value="clothes">Roupas</TabsTrigger>
          <TabsTrigger value="accessories">Acessórios</TabsTrigger>
        </TabsList>

        <TabsContent value="head" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {heads.map((head) => (
              <Button
                key={head.id}
                variant={selectedHead === head.id ? "default" : "outline"}
                className={`h-24 flex flex-col items-center justify-center ${!head.unlocked ? "opacity-50" : ""}`}
                onClick={() => head.unlocked && setSelectedHead(head.id)}
                disabled={!head.unlocked}
              >
                <span className="text-3xl mb-2">{head.image}</span>
                <span className="text-xs">{head.name}</span>
                {!head.unlocked && (
                  <span className="text-xs text-muted-foreground mt-1">
                    {head.xpRequired} XP necessário
                  </span>
                )}
              </Button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="clothes" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {clothes.map((item) => (
              <Button
                key={item.id}
                variant={selectedClothes === item.id ? "default" : "outline"}
                className={`h-24 flex flex-col items-center justify-center ${!item.unlocked ? "opacity-50" : ""}`}
                onClick={() => item.unlocked && setSelectedClothes(item.id)}
                disabled={!item.unlocked}
              >
                <span className="text-3xl mb-2">{item.image}</span>
                <span className="text-xs">{item.name}</span>
                {!item.unlocked && (
                  <span className="text-xs text-muted-foreground mt-1">
                    {item.xpRequired} XP necessário
                  </span>
                )}
              </Button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="accessories" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {accessories.map((item) => (
              <Button
                key={item.id}
                variant={selectedAccessory === item.id ? "default" : "outline"}
                className={`h-24 flex flex-col items-center justify-center ${!item.unlocked ? "opacity-50" : ""}`}
                onClick={() => item.unlocked && setSelectedAccessory(item.id)}
                disabled={!item.unlocked}
              >
                <span className="text-3xl mb-2">{item.image}</span>
                <span className="text-xs">{item.name}</span>
                {!item.unlocked && (
                  <span className="text-xs text-muted-foreground mt-1">
                    {item.xpRequired} XP necessário
                  </span>
                )}
              </Button>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
