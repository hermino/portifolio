import { Injectable, inject } from '@angular/core';
import { from, Observable, map } from 'rxjs';
import { SupabaseService } from '../supabase/supabase.service';
import { Skill, SkillGroup, CreateSkill, UpdateSkill } from '../../models/skill.model';

type Row = {
  id: string;
  name: string;
  category: string;
  display_order: number;
};

function toModel(row: Row): Skill {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    displayOrder: row.display_order,
  };
}

function toRow(dto: CreateSkill | UpdateSkill) {
  return {
    name: dto.name,
    category: dto.category,
    display_order: dto.displayOrder,
  };
}

@Injectable({ providedIn: 'root' })
export class SkillApiService {
  private db = inject(SupabaseService).client;

  getAll(): Observable<Skill[]> {
    return from(
      this.db.from('skills').select('*').order('display_order')
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data as Row[]).map(toModel);
      })
    );
  }

  getGrouped(): Observable<SkillGroup[]> {
    return this.getAll().pipe(
      map((skills) => {
        const groups = new Map<string, Skill[]>();
        for (const skill of skills) {
          if (!groups.has(skill.category)) groups.set(skill.category, []);
          groups.get(skill.category)!.push(skill);
        }
        return Array.from(groups.entries()).map(([category, skills]) => ({ category, skills }));
      })
    );
  }

  getById(id: string): Observable<Skill> {
    return from(
      this.db.from('skills').select('*').eq('id', id).single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return toModel(data as Row);
      })
    );
  }

  create(dto: CreateSkill): Observable<Skill> {
    return from(
      this.db.from('skills').insert(toRow(dto)).select().single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return toModel(data as Row);
      })
    );
  }

  update(id: string, dto: UpdateSkill): Observable<Skill> {
    return from(
      this.db.from('skills').update(toRow(dto)).eq('id', id).select().single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return toModel(data as Row);
      })
    );
  }

  delete(id: string): Observable<void> {
    return from(
      this.db.from('skills').delete().eq('id', id)
    ).pipe(
      map(({ error }) => {
        if (error) throw error;
      })
    );
  }
}
