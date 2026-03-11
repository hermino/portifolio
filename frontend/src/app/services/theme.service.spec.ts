import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { ThemeService } from './theme.service';

function mockMatchMedia(matches: boolean): void {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockReturnValue({ matches }),
  });
}

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    mockMatchMedia(true);
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    vi.restoreAllMocks();
  });

  it('should be created', () => {
    TestBed.configureTestingModule({});
    const service = TestBed.inject(ThemeService);
    expect(service).toBeTruthy();
  });

  it('should default to dark when no saved preference and system prefers dark', () => {
    mockMatchMedia(true);
    TestBed.configureTestingModule({});
    const service = TestBed.inject(ThemeService);
    expect(service.theme()).toBe('dark');
  });

  it('should default to light when no saved preference and system prefers light', () => {
    mockMatchMedia(false);
    TestBed.configureTestingModule({});
    const service = TestBed.inject(ThemeService);
    expect(service.theme()).toBe('light');
  });

  it('should restore saved dark theme from localStorage', () => {
    localStorage.setItem('theme', 'dark');
    TestBed.configureTestingModule({});
    const service = TestBed.inject(ThemeService);
    expect(service.theme()).toBe('dark');
  });

  it('should restore saved light theme from localStorage', () => {
    localStorage.setItem('theme', 'light');
    TestBed.configureTestingModule({});
    const service = TestBed.inject(ThemeService);
    expect(service.theme()).toBe('light');
  });

  it('should toggle from dark to light', () => {
    localStorage.setItem('theme', 'dark');
    TestBed.configureTestingModule({});
    const service = TestBed.inject(ThemeService);
    service.toggle();
    expect(service.theme()).toBe('light');
  });

  it('should toggle from light to dark', () => {
    localStorage.setItem('theme', 'light');
    TestBed.configureTestingModule({});
    const service = TestBed.inject(ThemeService);
    service.toggle();
    expect(service.theme()).toBe('dark');
  });

  it('should persist theme to localStorage on toggle', () => {
    localStorage.setItem('theme', 'dark');
    TestBed.configureTestingModule({});
    const service = TestBed.inject(ThemeService);
    service.toggle();
    TestBed.flushEffects();
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('should set data-theme attribute on documentElement', () => {
    localStorage.setItem('theme', 'dark');
    TestBed.configureTestingModule({});
    const service = TestBed.inject(ThemeService);
    service.theme.set('light');
    TestBed.flushEffects();
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });
});
