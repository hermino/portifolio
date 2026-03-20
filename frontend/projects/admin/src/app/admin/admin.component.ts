import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '@shared/services/toast.service';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  toast = inject(ToastService);
  private auth = inject(AuthService);

  logout(): void {
    this.auth.signOut();
  }
}
