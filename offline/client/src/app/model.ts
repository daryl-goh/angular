export interface Task {
    id: string;
    taskId?: string
    task: string;
    priority: number;
    dueDate: number;
}

export interface SyncResult {
    insertCount: number
  }
  