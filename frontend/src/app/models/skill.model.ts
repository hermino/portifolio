export interface Skill {
  id: string;
  name: string;
  category: string;
  displayOrder: number;
}

export interface SkillGroup {
  category: string;
  skills: Skill[];
}

export type CreateSkill = Omit<Skill, 'id'>;
export type UpdateSkill = Omit<Skill, 'id'>;
