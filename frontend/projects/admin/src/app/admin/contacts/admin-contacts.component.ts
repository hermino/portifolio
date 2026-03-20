import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ContactApiService } from '../../services/api/contact-api.service';
import { ContactMessage } from '../../models/contact-message.model';

@Component({
  selector: 'app-admin-contacts',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './admin-contacts.component.html',
  styleUrl: './admin-contacts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminContactsComponent implements OnInit {
  private service = inject(ContactApiService);
  messages = signal<ContactMessage[]>([]);

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getAll().subscribe(d => this.messages.set(d));
  }

  markRead(id: string) {
    this.service.markAsRead(id).subscribe(() => this.load());
  }
}
