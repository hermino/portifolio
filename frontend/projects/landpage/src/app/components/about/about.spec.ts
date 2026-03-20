import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { About } from './about';

describe('About', () => {
  let fixture: ComponentFixture<About>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [About],
    }).compileComponents();

    fixture = TestBed.createComponent(About);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render section with id="about"', () => {
    expect(el.querySelector('section#about')).toBeTruthy();
  });

  it('should render "About me" heading', () => {
    const h2 = el.querySelector('h2');
    expect(h2?.textContent?.trim()).toBe('About me');
  });

  it('should render eyebrow label', () => {
    const eyebrow = el.querySelector('.section-header__eyebrow');
    expect(eyebrow?.textContent?.trim()).toBe('About');
  });

  it('should render the about lede paragraph', () => {
    const lede = el.querySelector('.section-header__lede');
    expect(lede?.textContent).toContain('Frontend Developer');
    expect(lede?.textContent).toContain('5+ years');
  });

  it('should render the timeline', () => {
    expect(el.querySelector('.timeline')).toBeTruthy();
  });

  it('should render 4 timeline items', () => {
    const items = el.querySelectorAll('.timeline__item');
    expect(items.length).toBe(4);
  });

  it('should render timeline dates', () => {
    const dates = Array.from(el.querySelectorAll('.timeline__date'))
      .map(d => d.textContent?.trim());
    expect(dates.some(d => d?.includes('2022'))).toBe(true);
    expect(dates.some(d => d?.includes('2020'))).toBe(true);
  });

  it('should render key career events in timeline', () => {
    const texts = Array.from(el.querySelectorAll('.timeline__item p'))
      .map(p => p.textContent);
    expect(texts.some(t => t?.includes('INDT'))).toBe(true);
    expect(texts.some(t => t?.includes('Computer Science'))).toBe(true);
  });
});
