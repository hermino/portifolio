import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Skill, SkillGroup, CreateSkill, UpdateSkill } from '../../models/skill.model';

@Injectable({ providedIn: 'root' })
export class SkillApiService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/api/skills`;

  getAll(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.url);
  }

  getGrouped(): Observable<SkillGroup[]> {
    return this.http.get<SkillGroup[]>(`${this.url}/grouped`);
  }

  getById(id: string): Observable<Skill> {
    return this.http.get<Skill>(`${this.url}/${id}`);
  }

  create(dto: CreateSkill): Observable<Skill> {
    return this.http.post<Skill>(this.url, dto);
  }

  update(id: string, dto: UpdateSkill): Observable<Skill> {
    return this.http.put<Skill>(`${this.url}/${id}`, dto);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
