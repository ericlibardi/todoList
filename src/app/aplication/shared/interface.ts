export interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    priority: 'low' | 'medium' | 'high';
    completed: boolean;
    address?: string;
    phone?: string;
    extras?: string;
  }
  