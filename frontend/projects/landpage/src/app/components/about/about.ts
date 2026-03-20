import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ScrollReveal } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-about',
  imports: [ScrollReveal],
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {}
