import { Injectable, inject } from '@angular/core';
import { from, Observable, map } from 'rxjs';
import { SupabaseService } from '../supabase/supabase.service';
import { Project, CreateProject, UpdateProject } from '../../models/project.model';

type Row = {
  id: string;
  title: string;
  client: string;
  description: string;
  technologies: string[];
  categories: string[];
  github_url: string | null;
  live_url: string | null;
  is_featured: boolean;
  display_order: number;
};

function toModel(row: Row): Project {
  return {
    id: row.id,
    title: row.title,
    client: row.client,
    description: row.description,
    technologies: row.technologies ?? [],
    categories: row.categories ?? [],
    githubUrl: row.github_url,
    liveUrl: row.live_url,
    isFeatured: row.is_featured,
    displayOrder: row.display_order,
  };
}

function toRow(dto: CreateProject | UpdateProject) {
  return {
    title: dto.title,
    client: dto.client,
    description: dto.description,
    technologies: dto.technologies,
    categories: dto.categories,
    github_url: dto.githubUrl,
    live_url: dto.liveUrl,
    is_featured: dto.isFeatured,
    display_order: dto.displayOrder,
  };
}

@Injectable({ providedIn: 'root' })
export class ProjectApiService {
  private db = inject(SupabaseService).client;

  getAll(): Observable<Project[]> {
    return from(
      this.db.from('projects').select('*').order('display_order')
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data as Row[]).map(toModel);
      })
    );
  }

  getById(id: string): Observable<Project> {
    return from(
      this.db.from('projects').select('*').eq('id', id).single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return toModel(data as Row);
      })
    );
  }

  create(dto: CreateProject): Observable<Project> {
    return from(
      this.db.from('projects').insert(toRow(dto)).select().single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return toModel(data as Row);
      })
    );
  }

  update(id: string, dto: UpdateProject): Observable<Project> {
    return from(
      this.db.from('projects').update(toRow(dto)).eq('id', id).select().single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return toModel(data as Row);
      })
    );
  }

  delete(id: string): Observable<void> {
    return from(
      this.db.from('projects').delete().eq('id', id)
    ).pipe(
      map(({ error }) => {
        if (error) throw error;
      })
    );
  }
}
