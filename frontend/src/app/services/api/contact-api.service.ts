import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ContactMessage, SendContactMessage } from '../../models/contact-message.model';

@Injectable({ providedIn: 'root' })
export class ContactApiService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/api/contacts`;

  getAll(): Observable<ContactMessage[]> {
    return this.http.get<ContactMessage[]>(this.url);
  }

  getById(id: string): Observable<ContactMessage> {
    return this.http.get<ContactMessage>(`${this.url}/${id}`);
  }

  send(dto: SendContactMessage): Observable<ContactMessage> {
    return this.http.post<ContactMessage>(this.url, dto);
  }

  markAsRead(id: string): Observable<void> {
    return this.http.patch<void>(`${this.url}/${id}/read`, {});
  }
}
