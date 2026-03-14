import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss',
})
export class AdminLoginComponent {
  private auth = inject(AuthService);

  email = '';
  password = '';
  loading = signal(false);
  error = signal('');

  async onSubmit(): Promise<void> {
    this.loading.set(true);
    this.error.set('');
    try {
      await this.auth.signIn(this.email, this.password);
    } catch (err: any) {
      this.error.set(err?.message ?? 'Erro ao fazer login.');
    } finally {
      this.loading.set(false);
    }
  }
}
