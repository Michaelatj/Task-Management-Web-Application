"use client";

import type { Task } from "@/app/page";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Edit,
  Trash2,
  Clock,
  Calendar,
  Check,
  Loader2,
  FileText,
} from "lucide-react";
import { useState } from "react";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task["status"]) => void;
}

export function TaskCard({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskCardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const getTaskIcon = () => {
    // Status takes priority over priority for icon selection
    switch (task.status) {
      case "done":
        return <Check className="h-5 w-5 text-green-600" />;
      case "in-progress":
        return <Loader2 className="h-5 w-5 text-yellow-500 animate-spin" />;
      case "to-do":
        return <FileText className="h-5 w-5 text-blue-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-50 text-red-700 border-red-200";
      case "medium":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-green-50 text-green-700 border-green-200";
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const handleDelete = () => {
    if (showDeleteConfirm) {
      onDelete(task.id);
    } else {
      setShowDeleteConfirm(true);
      setTimeout(() => setShowDeleteConfirm(false), 3000);
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 border-gray-200 bg-white/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Task Icon */}
          <div className="flex-shrink-0 mt-1">{getTaskIcon()}</div>

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3
                  className={`font-semibold text-lg leading-tight ${
                    task.status === "done"
                      ? "text-gray-500 line-through"
                      : "text-gray-900"
                  }`}
                >
                  {task.title}
                </h3>
                <p
                  className={`mt-1 text-sm leading-relaxed ${
                    task.status === "done" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {task.description}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(task)}
                  className="h-8 w-8 p-0 hover:bg-blue-50 hover:border-blue-200"
                >
                  <Edit className="h-4 w-4 text-blue-600" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDelete}
                  className={`h-8 w-8 p-0 transition-colors ${
                    showDeleteConfirm
                      ? "bg-red-500 border-red-500 text-white hover:bg-red-600"
                      : "hover:bg-red-50 hover:border-red-200"
                  }`}
                >
                  <Trash2
                    className={`h-4 w-4 ${showDeleteConfirm ? "text-white" : "text-red-600"}`}
                  />
                </Button>
              </div>
            </div>

            {/* Priority and Status */}
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                className={`${getPriorityColor(task.priority)} font-medium`}
              >
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}{" "}
                Priority
              </Badge>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Status:</span>
                <Select
                  value={task.status}
                  onValueChange={(value: Task["status"]) =>
                    onStatusChange(task.id, value)
                  }
                >
                  <SelectTrigger className="w-auto h-8 text-sm border-gray-200 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-gray-200 bg-white">
                    <SelectItem value="to-do">To Do</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Timestamps */}
            <div className="flex items-center gap-4 text-xs text-gray-500 pt-2 border-t border-gray-100">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>Created {formatDate(task.createdAt)}</span>
              </div>
              {task.updatedAt.getTime() !== task.createdAt.getTime() && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>Updated {formatDate(task.updatedAt)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Delete Confirmation */}
        {showDeleteConfirm && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">
              Click delete again to confirm removal of this task.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
