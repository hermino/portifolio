import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { Projects } from './projects';

describe('Projects', () => {
  let fixture: ComponentFixture<Projects>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Projects],
    }).compileComponents();

    fixture = TestBed.createComponent(Projects);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render section with id="projects"', () => {
    expect(el.querySelector('section#projects')).toBeTruthy();
  });

  it('should render "Featured projects" heading', () => {
    const h2 = el.querySelector('h2');
    expect(h2?.textContent?.trim()).toBe('Featured projects');
  });

  it('should render eyebrow label', () => {
    const eyebrow = el.querySelector('.section-header__eyebrow');
    expect(eyebrow?.textContent?.trim()).toBe('Work');
  });

  it('should render project-grid container', () => {
    expect(el.querySelector('.project-grid')).toBeTruthy();
  });

  it('should render 5 projects', () => {
    const projects = el.querySelectorAll('.project');
    expect(projects.length).toBe(5);
  });

  it('should render project titles', () => {
    const titles = Array.from(el.querySelectorAll('.project__title'))
      .map(t => t.textContent?.trim());
    expect(titles.some(t => t?.includes('Automatic identification of fruits'))).toBe(true);
    expect(titles.some(t => t?.includes('Performance Evaluation System'))).toBe(true);
    expect(titles.some(t => t?.includes('Service Order Management'))).toBe(true);
    expect(titles.some(t => t?.includes('Responsible Business Alliance'))).toBe(true);
    expect(titles.some(t => t?.includes('license plate'))).toBe(true);
  });

  it('should render ITN business badge on every project', () => {
    const badges = el.querySelectorAll('.tech-badge--business');
    expect(badges.length).toBe(5);
    badges.forEach(b => expect(b.textContent?.trim()).toBe('ITN'));
  });

  it('should render tech badges in projects', () => {
    const badges = el.querySelectorAll('.project__techs .tech-badge');
    expect(badges.length).toBeGreaterThan(0);
  });

  it('should render Angular tech badge in projects', () => {
    const badges = Array.from(el.querySelectorAll('.project__techs .tech-badge'))
      .map(b => b.textContent?.trim());
    expect(badges).toContain('Angular');
  });
});
