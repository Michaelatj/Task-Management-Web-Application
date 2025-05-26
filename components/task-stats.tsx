"use client";

import type { Task } from "@/app/page";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart3, Check, Loader2, Target, Calendar } from "lucide-react";

interface TaskStatsProps {
  tasks: Task[];
}

export function TaskStats({ tasks }: TaskStatsProps) {
  const totalTasks = tasks.length;

  const statusCounts = {
    "to-do": tasks.filter((t) => t.status === "to-do").length,
    "in-progress": tasks.filter((t) => t.status === "in-progress").length,
    done: tasks.filter((t) => t.status === "done").length,
  };

  const priorityCounts = {
    high: tasks.filter((t) => t.priority === "high").length,
    medium: tasks.filter((t) => t.priority === "medium").length,
    low: tasks.filter((t) => t.priority === "low").length,
  };

  const completionRate =
    totalTasks > 0 ? (statusCounts.done / totalTasks) * 100 : 0;
  const progressRate =
    totalTasks > 0 ? (statusCounts["in-progress"] / totalTasks) * 100 : 0;

  // Calculate recent activity (tasks created in last 7 days)
  const recentTasks = tasks.filter((task) => {
    const daysDiff =
      (Date.now() - task.createdAt.getTime()) / (1000 * 60 * 60 * 24);
    return daysDiff <= 7;
  }).length;

  if (totalTasks === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
          <BarChart3 className="w-12 h-12 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No analytics available
        </h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Create some tasks to see detailed analytics and insights about your
          project progress.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500 rounded-xl shadow-lg">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-700">Total Tasks</p>
                <p className="text-3xl font-bold text-blue-900">{totalTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-500 rounded-xl shadow-lg">
                <Loader2 className="h-6 w-6 text-white animate-spin" />
              </div>
              <div>
                <p className="text-sm font-medium text-yellow-700">
                  In Progress
                </p>
                <p className="text-3xl font-bold text-yellow-900">
                  {statusCounts["in-progress"]}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500 rounded-xl shadow-lg">
                <Check className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-700">Completed</p>
                <p className="text-3xl font-bold text-green-900">
                  {statusCounts.done}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500 rounded-xl shadow-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-purple-700">This Week</p>
                <p className="text-3xl font-bold text-purple-900">
                  {recentTasks}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Completion Progress */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Project Progress
            </CardTitle>
            <CardDescription className=" text-gray-500">
              Overall completion and progress tracking
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">
                    Completion Rate
                  </span>
                  <span className="font-bold text-green-600">
                    {completionRate.toFixed(1)}%
                  </span>
                </div>
                <Progress value={completionRate} className="h-3 bg-gray-100">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-500"
                    style={{ width: `${completionRate}%` }}
                  />
                </Progress>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">In Progress</span>
                  <span className="font-bold text-yellow-600">
                    {progressRate.toFixed(1)}%
                  </span>
                </div>
                <Progress value={progressRate} className="h-3 bg-gray-100">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${progressRate}%` }}
                  />
                </Progress>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">
                  {statusCounts["to-do"]}
                </div>
                <div className="text-xs text-gray-500 font-medium">To Do</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {statusCounts["in-progress"]}
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  In Progress
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {statusCounts.done}
                </div>
                <div className="text-xs text-gray-500 font-medium">Done</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Priority Distribution */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Priority Distribution
            </CardTitle>
            <CardDescription className=" text-gray-500">
              Breakdown of tasks by priority level
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-red-700">
                    High Priority
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-red-700">
                    {priorityCounts.high}
                  </div>
                  <div className="text-xs text-red-600">
                    {totalTasks > 0
                      ? ((priorityCounts.high / totalTasks) * 100).toFixed(0)
                      : 0}
                    %
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-yellow-700">
                    Medium Priority
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-yellow-700">
                    {priorityCounts.medium}
                  </div>
                  <div className="text-xs text-yellow-600">
                    {totalTasks > 0
                      ? ((priorityCounts.medium / totalTasks) * 100).toFixed(0)
                      : 0}
                    %
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-green-700">
                    Low Priority
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-green-700">
                    {priorityCounts.low}
                  </div>
                  <div className="text-xs text-green-600">
                    {totalTasks > 0
                      ? ((priorityCounts.low / totalTasks) * 100).toFixed(0)
                      : 0}
                    %
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 text-center">
              <div className="text-3xl font-bold text-gray-900">
                {totalTasks}
              </div>
              <div className="text-sm text-gray-500 font-medium">
                Total Tasks
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Performance Insights
          </CardTitle>
          <CardDescription className=" text-gray-500">
            Key metrics and recommendations for your project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-white/60 rounded-xl">
              <div className="text-2xl font-bold text-indigo-600 mb-2">
                {completionRate >= 80
                  ? "🎉"
                  : completionRate >= 50
                    ? "👍"
                    : "💪"}
              </div>
              <div className="text-sm font-medium text-gray-700">
                {completionRate >= 80
                  ? "Excellent Progress!"
                  : completionRate >= 50
                    ? "Good Progress"
                    : "Keep Going!"}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {completionRate.toFixed(0)}% completion rate
              </div>
            </div>

            <div className="text-center p-4 bg-white/60 rounded-xl">
              <div className="text-2xl font-bold text-indigo-600 mb-2">
                {priorityCounts.high === 0
                  ? "✅"
                  : priorityCounts.high <= 3
                    ? "⚠️"
                    : "🚨"}
              </div>
              <div className="text-sm font-medium text-gray-700">
                {priorityCounts.high === 0
                  ? "No High Priority Tasks"
                  : priorityCounts.high <= 3
                    ? "Manageable Workload"
                    : "High Priority Focus Needed"}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {priorityCounts.high} high priority tasks
              </div>
            </div>

            <div className="text-center p-4 bg-white/60 rounded-xl">
              <div className="text-2xl font-bold text-indigo-600 mb-2">
                {recentTasks >= 5 ? "🔥" : recentTasks >= 2 ? "📈" : "🐌"}
              </div>
              <div className="text-sm font-medium text-gray-700">
                {recentTasks >= 5
                  ? "Very Active"
                  : recentTasks >= 2
                    ? "Good Activity"
                    : "Low Activity"}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {recentTasks} tasks this week
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
