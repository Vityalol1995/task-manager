export interface Task {
    id: string;
    name: string;
    description: string;
    assignee: string;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
    priority: 'low' | 'medium' | 'high';
}

export interface User {
    id: number;
    name: string;
}
