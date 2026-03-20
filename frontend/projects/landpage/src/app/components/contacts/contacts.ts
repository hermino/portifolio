import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ScrollReveal } from '@shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-contacts',
  imports: [ScrollReveal],
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contacts {}
