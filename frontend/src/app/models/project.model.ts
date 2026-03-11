export interface Project {
  id: string;
  title: string;
  client: string;
  description: string;
  technologies: string[];
  categories: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  isFeatured: boolean;
  displayOrder: number;
}

export type CreateProject = Omit<Project, 'id'>;
export type UpdateProject = Omit<Project, 'id'>;
