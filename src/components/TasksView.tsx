import React, { useState } from 'react';
import { Task } from '../types';
import { Calendar as CalendarIcon, Flag, Plus, Trash2, CheckCircle2, Circle, Clock } from 'lucide-react';

interface TasksViewProps {
  tasks: Task[];
  onAddTask: (task: Omit<Task, 'id'>) => void;
  onToggleTaskComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export default function TasksView({ tasks, onAddTask, onToggleTaskComplete, onDeleteTask }: TasksViewProps) {
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Mathematics');
  const [newDueDate, setNewDueDate] = useState('2026-07-25');
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = ['all', 'Mathematics', 'History', 'English', 'Chemistry', 'Extra-Curricular'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddTask({
      title: newTitle.trim(),
      category: newCategory,
      dueDate: newDueDate,
      priority: newPriority,
      completed: false
    });

    setNewTitle('');
  };

  const filteredTasks = filterCategory === 'all' 
    ? tasks 
    : tasks.filter(task => task.category === filterCategory);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  return (
    <div id="tasks-view" className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
      {/* Add Task and Filters Column (Left 1 column) */}
      <div className="space-y-6">
        {/* Create Task Card */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 space-y-4 shadow-sm">
          <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
            <Plus size={18} className="text-primary" />
            <span>Create New Task</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-label-md font-semibold text-on-surface-variant block">Task Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Read deep work chapter 3..."
                className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-full text-body-md placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-label-md font-semibold text-on-surface-variant block">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-full text-body-md focus:outline-none focus:border-primary"
                >
                  <option value="Mathematics">Math</option>
                  <option value="History">History</option>
                  <option value="English">English</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Extra-Curricular">Extracurricular</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-label-md font-semibold text-on-surface-variant block">Priority</label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as any)}
                  className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-full text-body-md focus:outline-none focus:border-primary"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-label-md font-semibold text-on-surface-variant block">Due Date</label>
              <input
                type="date"
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
                className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-full text-body-md focus:outline-none focus:border-primary"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-primary text-on-primary rounded-full font-semibold text-label-md hover:bg-primary-container active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <Plus size={16} />
              <span>Add to Study Board</span>
            </button>
          </form>
        </div>

        {/* Category Filter Card */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 space-y-3 shadow-sm">
          <h4 className="text-label-sm font-bold text-outline uppercase tracking-wider">Filter by Course</h4>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                  filterCategory === cat
                    ? 'bg-secondary-container border-outline text-on-surface shadow-sm'
                    : 'bg-surface border-outline-variant text-on-surface-variant hover:bg-surface-container-low'
                }`}
              >
                {cat === 'all' ? 'All Subjects' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Board & Task List Column (Right 2 columns) */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex justify-between items-center pb-2 border-b border-outline-variant">
          <h2 className="font-headline-md text-headline-md text-on-surface">Weekly Study Board</h2>
          <span className="text-xs text-outline font-semibold">
            {filteredTasks.filter(t => t.completed).length} of {filteredTasks.length} Completed
          </span>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-12 text-center text-outline">
            No study tasks found for the selected filter. Create one to stay productive!
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                id={`task-item-${task.id}`}
                className={`p-4 bg-surface-container-lowest border border-outline-variant rounded-xl flex items-center justify-between gap-4 transition-all hover:shadow-sm ${
                  task.completed ? 'opacity-70 bg-surface-container-low/30' : ''
                }`}
              >
                {/* Left: Complete checkbox & Details */}
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  <button
                    onClick={() => onToggleTaskComplete(task.id)}
                    className="p-1 hover:bg-surface-container-low rounded-full transition-colors cursor-pointer shrink-0"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="text-green-600" size={20} />
                    ) : (
                      <Circle className="text-outline hover:text-primary" size={20} />
                    )}
                  </button>

                  <div className="space-y-1 min-w-0">
                    <p className={`font-semibold text-body-lg text-on-surface truncate ${
                      task.completed ? 'line-through text-outline font-normal' : ''
                    }`}>
                      {task.title}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        task.category === 'Mathematics' ? 'bg-orange-100 text-orange-800' :
                        task.category === 'History' ? 'bg-indigo-100 text-indigo-800' :
                        task.category === 'English' ? 'bg-blue-100 text-blue-800' :
                        task.category === 'Chemistry' ? 'bg-teal-100 text-teal-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {task.category}
                      </span>
                      
                      <span className={`flex items-center gap-1 font-semibold border px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wide ${getPriorityColor(task.priority)}`}>
                        <Flag size={10} />
                        {task.priority} Priority
                      </span>

                      <span className="flex items-center gap-1.5 text-outline font-medium">
                        <Clock size={11} />
                        {task.dueDate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="p-2 hover:bg-red-50 hover:text-red-600 text-outline rounded-full transition-colors cursor-pointer shrink-0"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
