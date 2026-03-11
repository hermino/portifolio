import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ExperienceApiService } from '../../services/api/experience-api.service';
import { Experience } from '../../models/experience.model';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-admin-experiences',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-experiences.component.html',
  styleUrl: './admin-experiences.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminExperiencesComponent implements OnInit {
  private service = inject(ExperienceApiService);
  private fb = inject(FormBuilder);
  private toast = inject(ToastService);

  experiences = signal<Experience[]>([]);
  editing = signal<Experience | null>(null);
  showForm = signal(false);

  form = this.fb.group({
    company: ['', Validators.required],
    role: ['', Validators.required],
    period: ['', Validators.required],
    description: ['', Validators.required],
    technologies: [''],
    activities: [''],
    displayOrder: [0],
  });

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getAll().subscribe({
      next: data => this.experiences.set(data),
      error: () => this.toast.error('Failed to load experiences.'),
    });
  }

  openCreate() {
    this.editing.set(null);
    this.form.reset({ displayOrder: 0 });
    this.showForm.set(true);
    this.toast.info('Fill in the fields to create a new experience.');
  }

  openEdit(exp: Experience) {
    this.editing.set(exp);
    this.form.patchValue({
      company: exp.company,
      role: exp.role,
      period: exp.period,
      description: exp.description,
      technologies: exp.technologies.join(', '),
      activities: exp.activities.join('\n'),
      displayOrder: exp.displayOrder,
    });
    this.showForm.set(true);
    this.toast.info(`Editing: ${exp.role} at ${exp.company}`);
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toast.warning('Please fill in all required fields.');
      return;
    }
    const v = this.form.value;
    const dto = {
      company: v.company!,
      role: v.role!,
      period: v.period!,
      description: v.description!,
      technologies: v.technologies ? v.technologies.split(',').map(s => s.trim()).filter(Boolean) : [],
      activities: v.activities ? v.activities.split('\n').map(s => s.trim()).filter(Boolean) : [],
      displayOrder: v.displayOrder ?? 0,
    };
    const current = this.editing();
    const obs = current ? this.service.update(current.id, dto) : this.service.create(dto);
    const action = current ? 'updated' : 'created';
    obs.subscribe({
      next: () => {
        this.load();
        this.showForm.set(false);
        this.toast.success(`Experience ${action} successfully.`);
      },
      error: () => this.toast.error(`Failed to ${current ? 'update' : 'create'} experience.`),
    });
  }

  delete(id: string) {
    if (!confirm('Delete this experience?')) return;
    this.service.delete(id).subscribe({
      next: () => {
        this.load();
        this.toast.success('Experience deleted.');
      },
      error: () => this.toast.error('Failed to delete experience.'),
    });
  }

  cancel() {
    this.showForm.set(false);
  }
}
