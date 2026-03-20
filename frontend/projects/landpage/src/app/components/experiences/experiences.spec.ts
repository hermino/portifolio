import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { Experiences } from './experiences';

describe('Experiences', () => {
  let fixture: ComponentFixture<Experiences>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Experiences],
    }).compileComponents();

    fixture = TestBed.createComponent(Experiences);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render section with id="experience"', () => {
    expect(el.querySelector('section#experience')).toBeTruthy();
  });

  it('should render "Professional highlights" heading', () => {
    const h2 = el.querySelector('h2');
    expect(h2?.textContent?.trim()).toBe('Professional highlights');
  });

  it('should render 2 experience entries', () => {
    const entries = el.querySelectorAll('.experience');
    expect(entries.length).toBe(2);
  });

  it('should render first job title', () => {
    const titles = el.querySelectorAll('.experience__title');
    expect(titles[0].textContent?.trim()).toBe('Developer II');
  });

  it('should render second job title', () => {
    const titles = el.querySelectorAll('.experience__title');
    expect(titles[1].textContent?.trim()).toBe('Junior Systems Development Analyst');
  });

  it('should render company names', () => {
    const companies = Array.from(el.querySelectorAll('.experience__company'))
      .map(c => c.textContent?.trim());
    expect(companies.some(c => c?.includes('INDT'))).toBe(true);
    expect(companies.some(c => c?.includes('ITN'))).toBe(true);
  });

  it('should render period badges', () => {
    const periods = Array.from(el.querySelectorAll('.experience__period'))
      .map(p => p.textContent?.trim());
    expect(periods).toContain('02/2022 – Present');
    expect(periods).toContain('08/2020 - 02/2022');
  });

  it('should render activity items for first experience', () => {
    const firstExp = el.querySelectorAll('.experience')[0];
    const activities = firstExp.querySelectorAll('.experience__activity');
    expect(activities.length).toBeGreaterThan(0);
  });

  it('should render Motorola collaboration activity', () => {
    const activities = Array.from(el.querySelectorAll('.experience__activity'))
      .map(a => a.textContent);
    expect(activities.some(a => a?.includes('Motorola'))).toBe(true);
  });

  it('should render tech badges for each experience', () => {
    const entries = el.querySelectorAll('.experience');
    entries.forEach(entry => {
      const badges = entry.querySelectorAll('.experience__techs .tech-badge');
      expect(badges.length).toBeGreaterThan(0);
    });
  });
});
