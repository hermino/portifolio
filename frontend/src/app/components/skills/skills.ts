import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ScrollReveal } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-skills',
  imports: [ScrollReveal],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Skills {}
