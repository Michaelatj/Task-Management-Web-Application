"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckSquare,
  BarChart3,
  List,
  X,
  Target,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeView: "tasks" | "stats";
  onViewChange: (view: "tasks" | "stats") => void;
  isOpen: boolean;
  onClose: () => void;
  taskCount: number;
  completedCount: number;
}

export function Sidebar({
  activeView,
  onViewChange,
  isOpen,
  onClose,
  taskCount,
  completedCount,
}: SidebarProps) {
  const completionRate =
    taskCount > 0 ? Math.round((completedCount / taskCount) * 100) : 0;

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white/90 backdrop-blur-xl border-r border-white/20 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
              <CheckSquare className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                To-Do Jama
              </h1>
              <p className="text-xs text-gray-500">Agile Management</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="lg:hidden h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <Button
            variant={activeView === "tasks" ? "default" : "ghost"}
            onClick={() => {
              onViewChange("tasks");
              onClose();
            }}
            className={cn(
              "w-full justify-start gap-3 h-12 text-left",
              activeView === "tasks"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                : "hover:bg-gray-50"
            )}
          >
            <List className="h-5 w-5" />
            <span className="font-medium">Tasks</span>
            <Badge variant="secondary" className="ml-auto">
              {taskCount}
            </Badge>
          </Button>

          <Button
            variant={activeView === "stats" ? "default" : "ghost"}
            onClick={() => {
              onViewChange("stats");
              onClose();
            }}
            className={cn(
              "w-full justify-start gap-3 h-12 text-left",
              activeView === "stats"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                : "hover:bg-gray-50"
            )}
          >
            <BarChart3 className="h-5 w-5" />
            <span className="font-medium">Analytics</span>
          </Button>
        </nav>

        {/* Project Overview */}
        <div className="p-4 border-t border-gray-100">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-900">
                Project Overview
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium text-gray-900">
                  {completionRate}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-600">
              <TrendingUp className="h-3 w-3" />
              <span>
                {completedCount} of {taskCount} tasks completed
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
