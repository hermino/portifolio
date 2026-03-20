import { Injectable, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '@supabase/supabase-js';
import { SupabaseService } from './supabase/supabase.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private supabase = inject(SupabaseService).client;
  private router = inject(Router);

  private session = signal<Session | null>(null);
  isAuthenticated = computed(() => !!this.session());
  private initPromise: Promise<void>;

  constructor() {
    this.initPromise = this.supabase.auth.getSession().then(({ data }) => {
      this.session.set(data.session);
    });

    this.supabase.auth.onAuthStateChange((_, session) => {
      this.session.set(session);
    });
  }

  waitForInit(): Promise<void> {
    return this.initPromise;
  }

  async signIn(email: string, password: string): Promise<void> {
    const { error } = await this.supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    await this.router.navigate(['/']);
  }

  async signOut(): Promise<void> {
    await this.supabase.auth.signOut();
    await this.router.navigate(['/login']);
  }
}
