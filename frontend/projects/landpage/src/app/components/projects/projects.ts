import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectApiService } from '../../services/api/project-api.service';
import { Project } from '../../models/project.model';
import { ScrollReveal } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-projects',
  imports: [ScrollReveal, CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects implements OnInit {
  private service = inject(ProjectApiService);
  projects = signal<Project[]>([]);

  ngOnInit() {
    this.service.getAll().subscribe(data => this.projects.set(data));
  }
}
