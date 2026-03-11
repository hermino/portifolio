import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { Header } from './header';

describe('Header', () => {
  let fixture: ComponentFixture<Header>;
  let component: Header;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render site-hero with correct id', () => {
    expect(el.querySelector('.site-hero#top')).toBeTruthy();
  });

  it('should render site-nav', () => {
    expect(el.querySelector('.site-nav')).toBeTruthy();
  });

  it('should render logo with text HF', () => {
    const logo = el.querySelector('.site-nav__logo');
    expect(logo?.textContent?.trim()).toBe('HF');
  });

  it('should render all desktop nav links', () => {
    const links = el.querySelectorAll('.site-nav__links a');
    const texts = Array.from(links).map(a => a.textContent?.trim());
    expect(texts).toContain('About');
    expect(texts).toContain('Projects');
    expect(texts).toContain('Experience');
    expect(texts).toContain('Skills');
    expect(texts).toContain('Contact');
  });

  it('should render hamburger button', () => {
    expect(el.querySelector('.site-nav__hamburger')).toBeTruthy();
  });

  it('should start with mobile menu closed', () => {
    expect(component.menuOpen()).toBe(false);
    expect(el.querySelector('.mobile-menu--open')).toBeNull();
  });

  it('should open mobile menu on toggleMenu()', () => {
    component.toggleMenu();
    fixture.detectChanges();
    expect(component.menuOpen()).toBe(true);
    expect(el.querySelector('.mobile-menu--open')).toBeTruthy();
  });

  it('should close mobile menu on closeMenu()', () => {
    component.toggleMenu();
    fixture.detectChanges();
    component.closeMenu();
    fixture.detectChanges();
    expect(component.menuOpen()).toBe(false);
  });

  it('should render mobile menu with all links', () => {
    const links = el.querySelectorAll('.mobile-menu a');
    const texts = Array.from(links).map(a => a.textContent?.trim());
    expect(texts).toContain('About');
    expect(texts).toContain('Projects');
    expect(texts).toContain('Experience');
    expect(texts).toContain('Skills');
    expect(texts).toContain('Contact');
  });

  it('should render h1 with developer name', () => {
    const h1 = el.querySelector('h1');
    expect(h1?.textContent?.trim()).toBe('Hermino Freitas');
  });

  it('should render hero eyebrow with role info', () => {
    expect(el.querySelector('.site-hero__eyebrow')?.textContent).toContain('Frontend Developer');
  });

  it('should render primary download CV button', () => {
    const btn = el.querySelector('.btn.btn--primary');
    expect(btn).toBeTruthy();
    expect(btn?.textContent).toContain('Download CV');
  });

  it('should render 3 metrics', () => {
    expect(el.querySelectorAll('.site-hero__metric').length).toBe(3);
  });

  it('should render metric values', () => {
    const values = Array.from(el.querySelectorAll('.site-hero__metric-value'))
      .map(v => v.textContent?.trim());
    expect(values).toContain('5+ years');
    expect(values).toContain('12+ products');
    expect(values).toContain('Design-first');
  });

  it('should add site-nav--scrolled when scrollY > 60', () => {
    const nav = el.querySelector('.site-nav') as HTMLElement;
    Object.defineProperty(window, 'scrollY', { value: 61, configurable: true });
    component.updateNav();
    expect(nav.classList.contains('site-nav--scrolled')).toBe(true);
  });

  it('should remove site-nav--scrolled when scrollY <= 60', () => {
    const nav = el.querySelector('.site-nav') as HTMLElement;
    nav.classList.add('site-nav--scrolled');
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
    component.updateNav();
    expect(nav.classList.contains('site-nav--scrolled')).toBe(false);
  });
});
