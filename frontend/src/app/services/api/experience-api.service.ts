import { Injectable, inject } from '@angular/core';
import { from, Observable, map } from 'rxjs';
import { SupabaseService } from '../supabase/supabase.service';
import { Experience, CreateExperience, UpdateExperience } from '../../models/experience.model';

type Row = {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  technologies: string[];
  activities: string[];
  display_order: number;
};

function toModel(row: Row): Experience {
  return {
    id: row.id,
    company: row.company,
    role: row.role,
    period: row.period,
    description: row.description,
    technologies: row.technologies ?? [],
    activities: row.activities ?? [],
    displayOrder: row.display_order,
  };
}

function toRow(dto: CreateExperience | UpdateExperience) {
  return {
    company: dto.company,
    role: dto.role,
    period: dto.period,
    description: dto.description,
    technologies: dto.technologies,
    activities: dto.activities,
    display_order: dto.displayOrder,
  };
}

@Injectable({ providedIn: 'root' })
export class ExperienceApiService {
  private db = inject(SupabaseService).client;

  getAll(): Observable<Experience[]> {
    return from(
      this.db.from('experiences').select('*').order('display_order')
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data as Row[]).map(toModel);
      })
    );
  }

  getById(id: string): Observable<Experience> {
    return from(
      this.db.from('experiences').select('*').eq('id', id).single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return toModel(data as Row);
      })
    );
  }

  create(dto: CreateExperience): Observable<Experience> {
    return from(
      this.db.from('experiences').insert(toRow(dto)).select().single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return toModel(data as Row);
      })
    );
  }

  update(id: string, dto: UpdateExperience): Observable<Experience> {
    return from(
      this.db.from('experiences').update(toRow(dto)).eq('id', id).select().single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return toModel(data as Row);
      })
    );
  }

  delete(id: string): Observable<void> {
    return from(
      this.db.from('experiences').delete().eq('id', id)
    ).pipe(
      map(({ error }) => {
        if (error) throw error;
      })
    );
  }
}
