import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ScrollReveal } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-experiences',
  imports: [ScrollReveal],
  templateUrl: './experiences.html',
  styleUrl: './experiences.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Experiences {}
