"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type AICharacter = {
  id: string;
  name: string;
  avatar: string;
  description: string;
  greeting: string;
};

type Message = {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
  character?: string;
};

const aiCharacters: AICharacter[] = [
  {
    id: "therapist",
    name: "Terapeuta",
    avatar: "🧠",
    description: "Ajuda você a refletir sobre seus sentimentos e pensamentos.",
    greeting:
      "Olá! Como você está se sentindo hoje? Estou aqui para ajudar você a refletir sobre suas emoções.",
  },
  {
    id: "coach",
    name: "Coach",
    avatar: "💪",
    description: "Motiva você a alcançar seus objetivos e superar desafios.",
    greeting:
      "Vamos lá! Quais são seus objetivos hoje? Estou aqui para te ajudar a conquistá-los!",
  },
  {
    id: "bff",
    name: "Melhor Amigo",
    avatar: "🤗",
    description: "Conversa descontraída e apoio emocional sempre que precisar.",
    greeting:
      "E aí! Tudo bem? Me conta as novidades! Estou aqui pra te ouvir e apoiar.",
  },
  {
    id: "pet",
    name: "Animal Fofo",
    avatar: "🐶",
    description: "Companhia adorável que sempre te faz sorrir.",
    greeting: "*Abanar de cauda* Oi! Que bom te ver! Vamos conversar?",
  },
];

// Sugestões de humor e atividades por personagem
const suggestions = {
  therapist: [
    "Como você tem lidado com o estresse ultimamente?",
    "Que tal fazer uma pausa para respirar profundamente?",
    "Você consegue identificar o que desencadeou essa emoção?",
    "Vamos praticar um exercício de atenção plena juntos?",
  ],
  coach: [
    "Que tal estabelecer uma meta pequena para hoje?",
    "Vamos criar um plano de ação para essa semana?",
    "Qual hábito saudável você poderia incorporar na sua rotina?",
    "Lembre-se de celebrar suas pequenas vitórias!",
  ],
  bff: [
    "Já assistiu aquele novo filme que comentamos?",
    "Que tal sairmos para tomar um café essa semana?",
    "Como foi seu dia? Aconteceu algo legal?",
    "Estou com saudades! Vamos marcar algo divertido?",
  ],
  pet: [
    "*Olhar curioso* Quer brincar um pouco?",
    "*Deita de barriga para cima* Carinho?",
    "*Pula animadamente* Vamos dar um passeio?",
    "*Se aconchega* Às vezes só precisamos de um momento de descanso.",
  ],
};

export default function AIChat() {
  const [selectedCharacter, setSelectedCharacter] = useState<string>("bff");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Inicializa a conversa com a mensagem de saudação do personagem selecionado
  useEffect(() => {
    const character = aiCharacters.find(
      (char) => char.id === selectedCharacter,
    );
    if (character) {
      setMessages([
        {
          id: Date.now().toString(),
          sender: "ai",
          text: character.greeting,
          timestamp: new Date(),
          character: selectedCharacter,
        },
      ]);
    }
  }, [selectedCharacter]);

  // Rola para o final da conversa quando novas mensagens são adicionadas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Adiciona a mensagem do usuário
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");

    // Simula resposta do AI após um pequeno delay
    setTimeout(() => {
      const characterSuggestions =
        suggestions[selectedCharacter as keyof typeof suggestions];
      const randomResponse =
        characterSuggestions[
          Math.floor(Math.random() * characterSuggestions.length)
        ];

      const aiResponse: Message = {
        id: Date.now().toString(),
        sender: "ai",
        text: randomResponse,
        timestamp: new Date(),
        character: selectedCharacter,
      };

      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleCharacterChange = (characterId: string) => {
    setSelectedCharacter(characterId);
  };

  const currentCharacter = aiCharacters.find(
    (char) => char.id === selectedCharacter,
  );

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold text-center">IA de Bolso</h1>
        <p className="text-center text-muted-foreground">
          Seu amigo virtual para qualquer momento
        </p>
      </div>

      {/* Character Selection */}
      <div className="p-4 border-b">
        <Tabs
          defaultValue={selectedCharacter}
          onValueChange={handleCharacterChange}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 w-full">
            {aiCharacters.map((character) => (
              <TabsTrigger
                key={character.id}
                value={character.id}
                className="flex flex-col items-center py-2"
              >
                <span className="text-2xl mb-1">{character.avatar}</span>
                <span className="text-xs">{character.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {aiCharacters.map((character) => (
            <TabsContent
              key={character.id}
              value={character.id}
              className="mt-2 text-center text-sm text-muted-foreground"
            >
              {character.description}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                {message.sender === "ai" && (
                  <div className="flex items-center mb-1">
                    <span className="mr-2 text-lg">
                      {
                        aiCharacters.find(
                          (char) => char.id === message.character,
                        )?.avatar
                      }
                    </span>
                    <span className="font-medium">
                      {
                        aiCharacters.find(
                          (char) => char.id === message.character,
                        )?.name
                      }
                    </span>
                  </div>
                )}
                <p>{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggestion Chips */}
      <div className="p-2 overflow-x-auto whitespace-nowrap">
        <div className="flex space-x-2">
          {suggestions[selectedCharacter as keyof typeof suggestions].map(
            (suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                className="text-sm py-1 px-3 rounded-full flex-shrink-0"
                onClick={() => {
                  setInputMessage(suggestion);
                }}
              >
                {suggestion.length > 30
                  ? `${suggestion.substring(0, 30)}...`
                  : suggestion}
              </Button>
            ),
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t flex items-center">
        <Input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Digite sua mensagem..."
          className="flex-1 mr-2"
        />
        <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
          Enviar
        </Button>
      </div>
    </div>
  );
}
