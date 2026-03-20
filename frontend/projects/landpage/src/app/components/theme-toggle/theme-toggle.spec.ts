import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { vi } from 'vitest';
import { ThemeToggle } from './theme-toggle';
import { ThemeService } from '@shared/services/theme.service';

describe('ThemeToggle', () => {
  let fixture: ComponentFixture<ThemeToggle>;
  let themeService: ThemeService;
  let el: HTMLElement;

  beforeEach(async () => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');

    await TestBed.configureTestingModule({
      imports: [ThemeToggle],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeToggle);
    themeService = TestBed.inject(ThemeService);
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the toggle button', () => {
    expect(el.querySelector('.theme-toggle')).toBeTruthy();
  });

  it('should render sun icon when theme is dark', () => {
    themeService.theme.set('dark');
    fixture.detectChanges();
    expect(el.querySelector('.sun-icon')).toBeTruthy();
    expect(el.querySelector('.moon-icon')).toBeNull();
  });

  it('should render moon icon when theme is light', () => {
    themeService.theme.set('light');
    fixture.detectChanges();
    expect(el.querySelector('.moon-icon')).toBeTruthy();
    expect(el.querySelector('.sun-icon')).toBeNull();
  });

  it('should have aria-label for dark theme', () => {
    themeService.theme.set('dark');
    fixture.detectChanges();
    const btn = el.querySelector('.theme-toggle');
    expect(btn?.getAttribute('aria-label')).toBe('Switch to light theme');
  });

  it('should have aria-label for light theme', () => {
    themeService.theme.set('light');
    fixture.detectChanges();
    const btn = el.querySelector('.theme-toggle');
    expect(btn?.getAttribute('aria-label')).toBe('Switch to dark theme');
  });

  it('should call themeService.toggle() on button click', () => {
    themeService.theme.set('dark');
    const toggleSpy = vi.spyOn(themeService, 'toggle');
    const btn = el.querySelector('.theme-toggle') as HTMLButtonElement;
    btn.click();
    expect(toggleSpy).toHaveBeenCalled();
  });

  it('should reflect theme changes from service', () => {
    themeService.theme.set('dark');
    fixture.detectChanges();
    expect(el.querySelector('.theme-toggle')?.getAttribute('aria-label'))
      .toBe('Switch to light theme');

    themeService.toggle();
    fixture.detectChanges();
    expect(el.querySelector('.theme-toggle')?.getAttribute('aria-label'))
      .toBe('Switch to dark theme');
  });
});
