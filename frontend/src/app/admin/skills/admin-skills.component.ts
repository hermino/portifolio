import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { SkillApiService } from '../../services/api/skill-api.service';
import { Skill } from '../../models/skill.model';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-admin-skills',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-skills.component.html',
  styleUrl: './admin-skills.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminSkillsComponent implements OnInit {
  private service = inject(SkillApiService);
  private fb = inject(FormBuilder);
  private toast = inject(ToastService);

  skills = signal<Skill[]>([]);
  editing = signal<Skill | null>(null);
  showForm = signal(false);

  readonly categories = ['Soft skills', 'Hard skills'];

  form = this.fb.group({
    name: ['', Validators.required],
    category: ['Hard skills', Validators.required],
    displayOrder: [0],
  });

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getAll().subscribe({
      next: data => this.skills.set(data),
      error: () => this.toast.error('Failed to load skills.'),
    });
  }

  openCreate() {
    this.editing.set(null);
    this.form.reset({ category: 'Hard skills', displayOrder: 0 });
    this.showForm.set(true);
    this.toast.info('Fill in the fields to create a new skill.');
  }

  openEdit(skill: Skill) {
    this.editing.set(skill);
    this.form.patchValue({
      name: skill.name,
      category: skill.category,
      displayOrder: skill.displayOrder,
    });
    this.showForm.set(true);
    this.toast.info(`Editing: ${skill.name}`);
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toast.warning('Please fill in all required fields.');
      return;
    }
    const v = this.form.value;
    const dto = {
      name: v.name!,
      category: v.category!,
      displayOrder: v.displayOrder ?? 0,
    };
    const current = this.editing();
    const obs = current ? this.service.update(current.id, dto) : this.service.create(dto);
    const action = current ? 'updated' : 'created';
    obs.subscribe({
      next: () => {
        this.load();
        this.showForm.set(false);
        this.toast.success(`Skill ${action} successfully.`);
      },
      error: () => this.toast.error(`Failed to ${current ? 'update' : 'create'} skill.`),
    });
  }

  delete(id: string) {
    if (!confirm('Delete this skill?')) return;
    this.service.delete(id).subscribe({
      next: () => {
        this.load();
        this.toast.success('Skill deleted.');
      },
      error: () => this.toast.error('Failed to delete skill.'),
    });
  }

  cancel() {
    this.showForm.set(false);
  }
}
