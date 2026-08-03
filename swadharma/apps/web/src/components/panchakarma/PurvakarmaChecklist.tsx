import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { PurvakarmaTask } from '../../engines/panchakarma';
import { useState } from 'react';

interface PurvakarmaChecklistProps {
  tasks: PurvakarmaTask[];
}

export function PurvakarmaChecklist({ tasks }: PurvakarmaChecklistProps) {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  const toggleTask = (id: string) => {
    setCompleted(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <Card className="border-[#E8973A]/20 bg-[#FBF8F2] shadow-sm">
      <CardHeader>
        <CardTitle className="text-[#E8973A] text-xl font-semibold">
          Purvakarma (Pre-treatment) Checklist
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {tasks.map(task => (
          <div 
            key={task.id} 
            className="flex items-start space-x-3 p-3 rounded-md hover:bg-stone-50 transition-colors"
          >
            <input
              type="checkbox"
              id={task.id}
              checked={!!completed[task.id]}
              onChange={() => toggleTask(task.id)}
              className="mt-1 w-4 h-4 text-[#4A7C59] rounded border-stone-300 focus:ring-[#4A7C59]"
            />
            <label htmlFor={task.id} className="cursor-pointer flex-1">
              <span className={`block font-medium ${completed[task.id] ? 'text-stone-400 line-through' : 'text-stone-800'}`}>
                {task.task}
              </span>
              <span className={`block text-sm mt-1 ${completed[task.id] ? 'text-stone-300' : 'text-stone-600'}`}>
                {task.description}
              </span>
            </label>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
