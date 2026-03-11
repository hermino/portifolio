import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Project, CreateProject, UpdateProject } from '../../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectApiService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/api/projects`;

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(this.url);
  }

  getById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.url}/${id}`);
  }

  create(dto: CreateProject): Observable<Project> {
    return this.http.post<Project>(this.url, dto);
  }

  update(id: string, dto: UpdateProject): Observable<Project> {
    return this.http.put<Project>(`${this.url}/${id}`, dto);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
