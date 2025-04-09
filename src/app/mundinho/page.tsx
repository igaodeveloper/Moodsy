"use client";

import { useState } from "react";
import AvatarCustomization from "@/components/mundinho/AvatarCustomization";
import TerrainEditor from "@/components/mundinho/TerrainEditor";
import MoodElements from "@/components/mundinho/MoodElements";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MundinhoPage() {
  const [moodMode, setMoodMode] = useState(false);
  const [currentXP, setCurrentXP] = useState(250); // Example XP value

  return (
    <div className="bg-background min-h-screen p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Seu Mundinho</h1>
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 px-4 py-2 rounded-full">
            <span className="font-bold">{currentXP} XP</span>
          </div>
          <Button
            variant={moodMode ? "default" : "outline"}
            onClick={() => setMoodMode(!moodMode)}
            className="flex items-center gap-2"
          >
            {moodMode ? "✨ Modo Diário Ativo" : "🌙 Modo Diário"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="terrain" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="terrain">🏝️ Terreno</TabsTrigger>
          <TabsTrigger value="avatar">👤 Avatar</TabsTrigger>
          <TabsTrigger value="elements">🎨 Elementos</TabsTrigger>
        </TabsList>
        <TabsContent value="terrain" className="h-[calc(100vh-200px)]">
          <TerrainEditor moodMode={moodMode} />
        </TabsContent>
        <TabsContent value="avatar" className="h-[calc(100vh-200px)]">
          <AvatarCustomization moodMode={moodMode} />
        </TabsContent>
        <TabsContent value="elements" className="h-[calc(100vh-200px)]">
          <MoodElements moodMode={moodMode} currentXP={currentXP} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
