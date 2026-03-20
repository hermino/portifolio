import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceApiService } from '../../services/api/experience-api.service';
import { Experience } from '../../models/experience.model';
import { ScrollReveal } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-experiences',
  imports: [ScrollReveal, CommonModule],
  templateUrl: './experiences.html',
  styleUrl: './experiences.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Experiences implements OnInit {
  private service = inject(ExperienceApiService);
  experiences = signal<Experience[]>([]);

  ngOnInit() {
    this.service.getAll().subscribe(data => this.experiences.set(data));
  }
}
