import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { Skills } from './skills';

describe('Skills', () => {
  let fixture: ComponentFixture<Skills>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Skills],
    }).compileComponents();

    fixture = TestBed.createComponent(Skills);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render section with id="skills"', () => {
    expect(el.querySelector('section#skills')).toBeTruthy();
  });

  it('should render "Skills & technologies" heading', () => {
    const h2 = el.querySelector('h2');
    expect(h2?.textContent?.trim()).toBe('Skills & technologies');
  });

  it('should render skills-grid container', () => {
    expect(el.querySelector('.skills-grid')).toBeTruthy();
  });

  it('should render 2 skill groups', () => {
    const groups = el.querySelectorAll('.skills-grid__group');
    expect(groups.length).toBe(2);
  });

  it('should render Soft skills group', () => {
    const titles = Array.from(el.querySelectorAll('.skills-grid__title'))
      .map(t => t.textContent?.trim());
    expect(titles).toContain('Soft skills');
  });

  it('should render Hard skills group', () => {
    const titles = Array.from(el.querySelectorAll('.skills-grid__title'))
      .map(t => t.textContent?.trim());
    expect(titles).toContain('Hard skills');
  });

  it('should render tech badges inside skill groups', () => {
    const tags = el.querySelectorAll('.skills-grid__tags .tech-badge');
    expect(tags.length).toBeGreaterThan(0);
  });

  it('should include key hard skills', () => {
    const badges = Array.from(el.querySelectorAll('.skills-grid__tags .tech-badge'))
      .map(b => b.textContent?.trim());
    expect(badges).toContain('React');
    expect(badges).toContain('Angular');
    expect(badges).toContain('TypeScript');
  });

  it('should include soft skills', () => {
    const badges = Array.from(el.querySelectorAll('.skills-grid__tags .tech-badge'))
      .map(b => b.textContent?.trim());
    expect(badges.some(b => b?.includes('Adaptability'))).toBe(true);
  });
});
