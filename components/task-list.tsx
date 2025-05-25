"use client";

import type { Task } from "@/app/page";
import { TaskCard } from "@/components/task-card";
import { Search, Filter, ArrowUpDown, CheckSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task["status"]) => void;
}

export function TaskList({
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | Task["status"]>(
    "all"
  );
  const [filterPriority, setFilterPriority] = useState<
    "all" | Task["priority"]
  >("all");

  // Filter and search tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || task.status === filterStatus;
    const matchesPriority =
      filterPriority === "all" || task.priority === filterPriority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Sort tasks by priority (high -> medium -> low) and then by creation date
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];

    if (priorityDiff !== 0) {
      return priorityDiff;
    }

    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  if (tasks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <CheckSquare className="w-6 h-6 text-white" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No tasks yet
        </h3>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          Start your productivity journey by creating your first task. Click the
          "New Task" button to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search tasks by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={filterStatus === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("all")}
            className={
              filterStatus === "all"
                ? "bg-blue-600 text-white  hover:bg-blue-700"
                : ""
            }
          >
            All Status
          </Button>
          <Button
            variant={filterStatus === "to-do" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("to-do")}
            className={
              filterStatus === "to-do"
                ? "bg-blue-600 text-white  hover:bg-blue-700"
                : ""
            }
          >
            To Do
          </Button>
          <Button
            variant={filterStatus === "in-progress" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("in-progress")}
            className={
              filterStatus === "in-progress"
                ? "bg-blue-600 text-white  hover:bg-blue-700"
                : ""
            }
          >
            In Progress
          </Button>
          <Button
            variant={filterStatus === "done" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("done")}
            className={
              filterStatus === "done"
                ? "bg-blue-600 text-white  hover:bg-blue-700"
                : ""
            }
          >
            Done
          </Button>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4" />
          <span>
            Showing {sortedTasks.length} of {tasks.length} task
            {tasks.length !== 1 ? "s" : ""}
            {searchTerm && ` matching "${searchTerm}"`}
          </span>
        </div>
        {sortedTasks.length > 0 && (
          <span className="text-xs text-gray-500">Sorted by priority</span>
        )}
      </div>

      {/* Task Cards */}
      {sortedTasks.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Filter className="mx-auto h-8 w-8" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No tasks match your filters
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}
