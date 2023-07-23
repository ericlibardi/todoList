export interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: Date;
    priority: 'low' | 'medium' | 'high';
    completed: boolean;
    address?: string;
    phone?: string;
    extras?: string;
  }
  