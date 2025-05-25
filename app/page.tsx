"use client";

import { useState, useEffect } from "react";
import { TaskForm } from "@/components/task-form";
import { TaskList } from "@/components/task-list";
import { TaskStats } from "@/components/task-stats";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { X, Target, Check, Clock } from "lucide-react";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "to-do" | "in-progress" | "done";
  createdAt: Date;
  updatedAt: Date;
}

export default function TaskManagementApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [activeView, setActiveView] = useState<"tasks" | "stats">("tasks");
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("taskEasy-tasks");
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks).map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt),
        }));
        setTasks(parsedTasks);
      } catch (error) {
        console.error("Error loading tasks from localStorage:", error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("taskEasy-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTasks((prev) => [...prev, newTask]);
    setShowTaskForm(false);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, ...updates, updatedAt: new Date() } : task
      )
    );
    setEditingTask(null);
    setShowTaskForm(false);
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    if (editingTask?.id === id) {
      setEditingTask(null);
      setShowTaskForm(false);
    }
  };

  const startEditing = (task: Task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const cancelEditing = () => {
    setEditingTask(null);
    setShowTaskForm(false);
  };

  const handleNewTask = () => {
    setEditingTask(null);
    setShowTaskForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        taskCount={tasks.length}
        completedCount={tasks.filter((t) => t.status === "done").length}
      />

      {/* Main Content */}
      <div className="lg:pl-64">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          onNewTask={handleNewTask}
        />

        <main className="p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Task Form Modal */}
            {showTaskForm && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {editingTask ? "Edit Task" : "Create New Task"}
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={cancelEditing}
                      className="h-8 w-8 p-0 hover:bg-gray-100"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-6">
                    <TaskForm
                      onSubmit={
                        editingTask
                          ? (data) => updateTask(editingTask.id, data)
                          : addTask
                      }
                      initialData={editingTask}
                      onCancel={cancelEditing}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Main Content Area */}
            <div className="space-y-8">
              {activeView === "tasks" && (
                <div className="space-y-6">
                  {/* Quick Stats Bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                          <Target className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-blue-600">
                            Total Tasks
                          </div>
                          <div className="text-2xl font-bold text-blue-900">
                            {tasks.length}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4 border border-green-100 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                          <Check className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-green-600">
                            Completed
                          </div>
                          <div className="text-2xl font-bold text-green-900">
                            {tasks.filter((t) => t.status === "done").length}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                          <Clock className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-yellow-700">
                            In Progress
                          </div>
                          <div className="text-2xl font-bold text-orange-900">
                            {
                              tasks.filter((t) => t.status === "in-progress")
                                .length
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Task List */}
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm">
                    <div className="p-6 border-b border-gray-100">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          Tasks
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                          Manage your tasks - sorted by priority
                        </p>
                      </div>
                    </div>
                    <div className="p-6">
                      <TaskList
                        tasks={tasks}
                        onEdit={startEditing}
                        onDelete={deleteTask}
                        onStatusChange={(id, status) =>
                          updateTask(id, { status })
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeView === "stats" && (
                <div className="space-y-6">
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Project Analytics
                    </h2>
                    <TaskStats tasks={tasks} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
