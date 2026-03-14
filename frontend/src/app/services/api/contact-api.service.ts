import { Injectable, inject } from '@angular/core';
import { from, Observable, map } from 'rxjs';
import { SupabaseService } from '../supabase/supabase.service';
import { ContactMessage, SendContactMessage } from '../../models/contact-message.model';

type Row = {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

function toModel(row: Row): ContactMessage {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    message: row.message,
    isRead: row.is_read,
    createdAt: row.created_at,
  };
}

@Injectable({ providedIn: 'root' })
export class ContactApiService {
  private db = inject(SupabaseService).client;

  getAll(): Observable<ContactMessage[]> {
    return from(
      this.db.from('contact_messages').select('*').order('created_at', { ascending: false })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data as Row[]).map(toModel);
      })
    );
  }

  getById(id: string): Observable<ContactMessage> {
    return from(
      this.db.from('contact_messages').select('*').eq('id', id).single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return toModel(data as Row);
      })
    );
  }

  send(dto: SendContactMessage): Observable<ContactMessage> {
    return from(
      this.db.from('contact_messages').insert(dto).select().single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return toModel(data as Row);
      })
    );
  }

  markAsRead(id: string): Observable<void> {
    return from(
      this.db.from('contact_messages').update({ is_read: true }).eq('id', id)
    ).pipe(
      map(({ error }) => {
        if (error) throw error;
      })
    );
  }
}
