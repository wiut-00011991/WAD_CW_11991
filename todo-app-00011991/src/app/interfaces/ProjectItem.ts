import { TaskItem } from "./TaskItem";

export interface ProjectItem {
    id: number;
    name: string;
    description?: string | null;
    startDate: Date;
    endDate?: Date | null;
    createdAt: Date;
    updatedAt: Date;
    tasks: TaskItem[];
  }