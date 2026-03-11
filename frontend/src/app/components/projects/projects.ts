import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ScrollReveal } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-projects',
  imports: [ScrollReveal],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {}
