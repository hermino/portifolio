export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  technologies: string[];
  activities: string[];
  displayOrder: number;
}

export type CreateExperience = Omit<Experience, 'id'>;
export type UpdateExperience = Omit<Experience, 'id'>;
