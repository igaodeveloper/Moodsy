"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

export default function BottomNavigation() {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { path: "/moodfeed", label: "MoodFeed", icon: "📝" },
    { path: "/dailymissions", label: "Missões", icon: "🧩" },
    { path: "/mundinho", label: "Mundinho", icon: "🌍" },
    { path: "/radar", label: "Radar", icon: "🌐" },
    { path: "/ai", label: "IA de Bolso", icon: "💬" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center justify-center w-full h-full transition-all ${isActive ? "text-primary scale-110" : "text-muted-foreground hover:text-foreground"}`}
            >
              <span className="text-xl mb-1">{item.icon}</span>
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
