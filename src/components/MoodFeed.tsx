"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface MoodFeedProps {
  className?: string;
}

const moodEmojis = [
  { emoji: "😊", label: "Feliz" },
  { emoji: "😔", label: "Triste" },
  { emoji: "😡", label: "Irritado" },
  { emoji: "😌", label: "Calmo" },
  { emoji: "🥰", label: "Apaixonado" },
  { emoji: "😴", label: "Cansado" },
  { emoji: "🤔", label: "Pensativo" },
  { emoji: "😎", label: "Confiante" },
  { emoji: "😢", label: "Choroso" },
  { emoji: "🙃", label: "Confuso" },
];

export default function MoodFeed({ className = "" }: MoodFeedProps) {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [customColor, setCustomColor] = useState("#6366f1"); // Default indigo color

  const handleMoodSelect = (index: number) => {
    setSelectedMood(index);
  };

  const handleAudioRecord = () => {
    // Implement audio recording functionality
    alert("Funcionalidade de áudio será implementada em breve!");
  };

  const handleMediaUpload = () => {
    // Implement photo/video upload functionality
    alert("Funcionalidade de foto/vídeo será implementada em breve!");
  };

  const handleColorCustomize = () => {
    // Open color picker or customization options
    const newColor = prompt(
      "Escolha uma cor (formato hex, ex: #FF5733):",
      customColor,
    );
    if (newColor) {
      setCustomColor(newColor);
    }
  };

  const handlePublish = () => {
    if (selectedMood === null) {
      alert("Por favor, selecione um humor antes de publicar.");
      return;
    }

    // Here you would typically save the mood entry to a database
    alert(
      `Mood publicado com sucesso! ${moodEmojis[selectedMood].emoji} - ${description}`,
    );

    // Reset form
    setSelectedMood(null);
    setDescription("");
  };

  return (
    <div
      className={`min-h-screen p-6 flex flex-col ${className}`}
      style={{ backgroundColor: customColor + "20" }} // Light version of the custom color
    >
      <h1 className="text-2xl font-bold mb-8 text-center">
        Como você está hoje?
      </h1>

      {/* Mood Emoji Selector */}
      <div className="mb-8 overflow-x-auto pb-4">
        <div className="flex space-x-4 min-w-max">
          {moodEmojis.map((mood, index) => (
            <button
              key={index}
              onClick={() => handleMoodSelect(index)}
              className={`flex flex-col items-center p-2 rounded-lg transition-all ${selectedMood === index ? "bg-primary/20 scale-110" : "hover:bg-primary/10"}`}
            >
              <span className="text-4xl mb-2">{mood.emoji}</span>
              <span className="text-sm">{mood.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Description Text Area */}
      <div className="mb-6">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descreva seu momento..."
          className="w-full p-4 rounded-lg border border-input bg-background min-h-[120px] focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mb-8">
        <Button
          variant="outline"
          className="flex items-center space-x-2 flex-1 mr-2"
          onClick={handleAudioRecord}
        >
          <span>🎤</span>
          <span>Áudio</span>
        </Button>

        <Button
          variant="outline"
          className="flex items-center space-x-2 flex-1 mx-2"
          onClick={handleMediaUpload}
        >
          <span>📷</span>
          <span>Foto ou vídeo</span>
        </Button>

        <Button
          variant="outline"
          className="flex items-center space-x-2 flex-1 ml-2"
          onClick={handleColorCustomize}
          style={{ borderColor: customColor }}
        >
          <span>🎨</span>
          <span>Personalizar</span>
        </Button>
      </div>

      {/* Publish Button */}
      <Button
        variant="default"
        className="w-full py-6 text-base font-medium transition-all hover:scale-105 mt-auto"
        onClick={handlePublish}
      >
        Publicar meu Mood
      </Button>
    </div>
  );
}
