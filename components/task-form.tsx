"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertCircle,
  CheckCircle2,
  Circle,
  RotateCw,
  CheckCircle,
} from "lucide-react";
import type { Task } from "@/app/page";

interface TaskFormProps {
  onSubmit: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void;
  initialData?: Task | null;
  onCancel?: () => void;
}

export function TaskForm({ onSubmit, initialData, onCancel }: TaskFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium" as "low" | "medium" | "high",
    status: "to-do" as "to-do" | "in-progress" | "done",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        priority: initialData.priority,
        status: initialData.status,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        status: "to-do",
      });
    }
    setErrors({});
  }, [initialData]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length > 100) {
      newErrors.title = "Title must be less than 100 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length > 500) {
      newErrors.description = "Description must be less than 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 300));

    onSubmit(formData);

    // Reset form if not editing
    if (!initialData) {
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        status: "to-do",
      });
    }

    setIsSubmitting(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200";
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "done":
        return "text-green-600 bg-green-50 border-green-200";
      case "in-progress":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "to-do":
        return "text-gray-600 bg-gray-50 border-gray-200";
      default:
        return "";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium text-gray-900">
          Task Title *
        </Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Enter a clear, concise task title..."
          className={`h-12 ${errors.title ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"}`}
          maxLength={100}
        />
        {errors.title && (
          <div className="flex items-center gap-2 text-sm text-red-600">
            <AlertCircle className="h-4 w-4" />
            {errors.title}
          </div>
        )}
        <div className="text-xs text-gray-500 text-right">
          {formData.title.length}/100 characters
        </div>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="description"
          className="text-sm font-medium text-gray-900"
        >
          Description *
        </Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="Describe the task in detail, including any requirements or acceptance criteria..."
          rows={4}
          className={`resize-none ${errors.description ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"}`}
          maxLength={500}
        />
        {errors.description && (
          <div className="flex items-center gap-2 text-sm text-red-600">
            <AlertCircle className="h-4 w-4" />
            {errors.description}
          </div>
        )}
        <div className="text-xs text-gray-500 text-right">
          {formData.description.length}/500 characters
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label
            htmlFor="priority"
            className="text-sm font-medium text-gray-900"
          >
            Priority Level
          </Label>
          <Select
            value={formData.priority}
            onValueChange={(value: "low" | "medium" | "high") =>
              setFormData((prev) => ({ ...prev, priority: value }))
            }
          >
            <SelectTrigger
              className={`h-12 ${getPriorityColor(formData.priority)}`}
            >
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="high" className="text-red-600">
                High Priority
              </SelectItem>
              <SelectItem value="medium" className="text-yellow-600">
                Medium Priority
              </SelectItem>
              <SelectItem value="low" className="text-green-600">
                Low Priority
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status" className="text-sm font-medium text-gray-900">
            Current Status
          </Label>
          <Select
            value={formData.status}
            onValueChange={(value: "to-do" | "in-progress" | "done") =>
              setFormData((prev) => ({ ...prev, status: value }))
            }
          >
            <SelectTrigger
              className={`h-12 ${getStatusColor(formData.status)}`}
            >
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="to-do" className="text-gray-600">
                <div className="flex items-center gap-2">To Do</div>
              </SelectItem>
              <SelectItem value="in-progress" className="text-blue-600">
                <div className="flex items-center gap-2">In Progress</div>
              </SelectItem>
              <SelectItem value="done" className="text-green-600">
                <div className="flex items-center gap-2">Done</div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-3 pt-6 border-t border-gray-100">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {initialData ? "Updating..." : "Creating..."}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {initialData ? "Update Task" : "Create Task"}
            </div>
          )}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="h-12 px-6 border-gray-200 hover:bg-gray-50"
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
