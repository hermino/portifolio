import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Experience, CreateExperience, UpdateExperience } from '../../models/experience.model';

@Injectable({ providedIn: 'root' })
export class ExperienceApiService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/api/experiences`;

  getAll(): Observable<Experience[]> {
    return this.http.get<Experience[]>(this.url);
  }

  getById(id: string): Observable<Experience> {
    return this.http.get<Experience>(`${this.url}/${id}`);
  }

  create(dto: CreateExperience): Observable<Experience> {
    return this.http.post<Experience>(this.url, dto);
  }

  update(id: string, dto: UpdateExperience): Observable<Experience> {
    return this.http.put<Experience>(`${this.url}/${id}`, dto);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
