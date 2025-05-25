"use client";

import { Button } from "@/components/ui/button";
import { Menu, Plus, CheckSquare } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
  onNewTask: () => void;
}

export function Header({ onMenuClick, onNewTask }: HeaderProps) {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-30">
      <div className="flex items-center justify-between h-16 px-4 lg:px-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <Button
          onClick={onNewTask}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">New Task</span>
        </Button>
      </div>
    </header>
  );
}
