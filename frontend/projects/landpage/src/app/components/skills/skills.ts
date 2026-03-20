import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillApiService } from '../../services/api/skill-api.service';
import { SkillGroup } from '../../models/skill.model';
import { ScrollReveal } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-skills',
  imports: [ScrollReveal, CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Skills implements OnInit {
  private service = inject(SkillApiService);
  skillGroups = signal<SkillGroup[]>([]);

  ngOnInit() {
    this.service.getGrouped().subscribe(data => this.skillGroups.set(data));
  }
}
