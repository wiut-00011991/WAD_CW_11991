import { ProjectItem } from "./ProjectItem";

export interface TaskItem {
  id: number;
  name: string;
  description?: string | null;
  dueDate: Date;
  contributionComment: string;
  createdAt: Date;
  updatedAt: Date;
  projectId?: number | null;
  project?: ProjectItem | null;
}