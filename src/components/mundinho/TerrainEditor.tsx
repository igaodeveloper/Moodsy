"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface TerrainEditorProps {
  moodMode?: boolean;
}

type TerrainTile = {
  id: number;
  type: string;
  emoji: string;
  xpRequired: number;
  unlocked: boolean;
};

type TerrainGrid = Array<Array<number>>; // Grid of tile IDs

export default function TerrainEditor({
  moodMode = false,
}: TerrainEditorProps) {
  // Available terrain tiles
  const [availableTiles, setAvailableTiles] = useState<TerrainTile[]>([
    { id: 0, type: "Grama", emoji: "🟩", xpRequired: 0, unlocked: true },
    { id: 1, type: "Água", emoji: "🟦", xpRequired: 0, unlocked: true },
    { id: 2, type: "Areia", emoji: "🟨", xpRequired: 50, unlocked: true },
    { id: 3, type: "Pedra", emoji: "⬜", xpRequired: 100, unlocked: true },
    { id: 4, type: "Floresta", emoji: "🌲", xpRequired: 150, unlocked: true },
    { id: 5, type: "Montanha", emoji: "⛰️", xpRequired: 200, unlocked: false },
    { id: 6, type: "Neve", emoji: "❄️", xpRequired: 250, unlocked: false },
    { id: 7, type: "Vulcão", emoji: "🌋", xpRequired: 300, unlocked: false },
  ]);

  // Create a 8x8 grid with default grass (id 0)
  const createEmptyGrid = (): TerrainGrid => {
    return Array(8)
      .fill(0)
      .map(() => Array(8).fill(0));
  };

  // Terrain grid state
  const [terrainGrid, setTerrainGrid] =
    useState<TerrainGrid>(createEmptyGrid());
  const [selectedTile, setSelectedTile] = useState<number>(0);

  // Handle tile placement
  const placeTile = (rowIndex: number, colIndex: number) => {
    const newGrid = [...terrainGrid];
    newGrid[rowIndex][colIndex] = selectedTile;
    setTerrainGrid(newGrid);
  };

  // Reset the terrain
  const resetTerrain = () => {
    setTerrainGrid(createEmptyGrid());
  };

  // Apply mood-based terrain if mood mode is active
  const applyMoodTerrain = () => {
    // This would normally use the user's current mood data
    // For demo purposes, we'll create a sample mood terrain
    const moodGrid: TerrainGrid = [
      [0, 0, 1, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 0, 4, 0],
      [0, 2, 2, 1, 0, 0, 4, 4],
      [2, 2, 2, 0, 0, 0, 0, 4],
      [2, 2, 0, 0, 3, 3, 0, 0],
      [0, 0, 0, 3, 3, 3, 0, 0],
      [0, 4, 0, 0, 3, 0, 0, 0],
      [4, 4, 4, 0, 0, 0, 0, 0],
    ];
    setTerrainGrid(moodGrid);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Editor de Terreno</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetTerrain} size="sm">
            Reiniciar
          </Button>
          {moodMode && (
            <Button variant="default" onClick={applyMoodTerrain} size="sm">
              Aplicar Humor
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 h-full">
        {/* Terrain Grid */}
        <div className="flex-1 bg-primary/5 rounded-lg p-4 flex items-center justify-center">
          <div className="grid grid-cols-8 gap-1 max-w-md w-full">
            {terrainGrid.map((row, rowIndex) =>
              row.map((tileId, colIndex) => {
                const tile = availableTiles.find((t) => t.id === tileId);
                return (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    className="aspect-square flex items-center justify-center text-2xl border border-primary/20 hover:bg-primary/10 transition-colors"
                    onClick={() => placeTile(rowIndex, colIndex)}
                  >
                    {tile?.emoji || "🟩"}
                  </button>
                );
              }),
            )}
          </div>
        </div>

        {/* Tile Selector */}
        <div className="w-full md:w-48 bg-primary/5 rounded-lg p-4">
          <h3 className="text-sm font-medium mb-3">Elementos</h3>
          <div className="grid grid-cols-2 gap-2">
            {availableTiles.map((tile) => (
              <Button
                key={tile.id}
                variant={selectedTile === tile.id ? "default" : "outline"}
                className={`h-16 flex flex-col items-center justify-center p-1 ${!tile.unlocked ? "opacity-50" : ""}`}
                onClick={() => tile.unlocked && setSelectedTile(tile.id)}
                disabled={!tile.unlocked}
              >
                <span className="text-xl">{tile.emoji}</span>
                <span className="text-xs truncate w-full text-center">
                  {tile.type}
                </span>
                {!tile.unlocked && (
                  <span className="text-[10px] text-muted-foreground">
                    {tile.xpRequired} XP
                  </span>
                )}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
