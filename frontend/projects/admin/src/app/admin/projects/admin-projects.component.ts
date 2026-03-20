import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ProjectApiService } from '@shared/services/api/project-api.service';
import { Project } from '@shared/models/project.model';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'app-admin-projects',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-projects.component.html',
  styleUrl: './admin-projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminProjectsComponent implements OnInit {
  private service = inject(ProjectApiService);
  private fb = inject(FormBuilder);
  private toast = inject(ToastService);

  projects = signal<Project[]>([]);
  editing = signal<Project | null>(null);
  showForm = signal(false);

  form = this.fb.group({
    title: ['', Validators.required],
    client: ['', Validators.required],
    description: ['', Validators.required],
    technologies: [''],
    categories: [''],
    githubUrl: [''],
    liveUrl: [''],
    isFeatured: [false],
    displayOrder: [0],
  });

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getAll().subscribe({
      next: data => this.projects.set(data),
      error: () => this.toast.error('Failed to load projects.'),
    });
  }

  openCreate() {
    this.editing.set(null);
    this.form.reset({ isFeatured: false, displayOrder: 0 });
    this.showForm.set(true);
    this.toast.info('Fill in the fields to create a new project.');
  }

  openEdit(proj: Project) {
    this.editing.set(proj);
    this.form.patchValue({
      title: proj.title,
      client: proj.client,
      description: proj.description,
      technologies: proj.technologies.join(', '),
      categories: proj.categories.join(', '),
      githubUrl: proj.githubUrl ?? '',
      liveUrl: proj.liveUrl ?? '',
      isFeatured: proj.isFeatured,
      displayOrder: proj.displayOrder,
    });
    this.showForm.set(true);
    this.toast.info(`Editing: ${proj.title}`);
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toast.warning('Please fill in all required fields.');
      return;
    }
    const v = this.form.value;
    const dto = {
      title: v.title!,
      client: v.client!,
      description: v.description!,
      technologies: v.technologies ? v.technologies.split(',').map(s => s.trim()).filter(Boolean) : [],
      categories: v.categories ? v.categories.split(',').map(s => s.trim()).filter(Boolean) : [],
      githubUrl: v.githubUrl?.trim() || null,
      liveUrl: v.liveUrl?.trim() || null,
      isFeatured: v.isFeatured ?? false,
      displayOrder: v.displayOrder ?? 0,
    };
    const current = this.editing();
    const obs = current ? this.service.update(current.id, dto) : this.service.create(dto);
    const action = current ? 'updated' : 'created';
    obs.subscribe({
      next: () => {
        this.load();
        this.showForm.set(false);
        this.toast.success(`Project ${action} successfully.`);
      },
      error: () => this.toast.error(`Failed to ${current ? 'update' : 'create'} project.`),
    });
  }

  delete(id: string) {
    if (!confirm('Delete this project?')) return;
    this.service.delete(id).subscribe({
      next: () => {
        this.load();
        this.toast.success('Project deleted.');
      },
      error: () => this.toast.error('Failed to delete project.'),
    });
  }

  cancel() {
    this.showForm.set(false);
  }
}
