import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { Contacts } from './contacts';

describe('Contacts', () => {
  let fixture: ComponentFixture<Contacts>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contacts],
    }).compileComponents();

    fixture = TestBed.createComponent(Contacts);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render section with id="contact"', () => {
    expect(el.querySelector('section#contact')).toBeTruthy();
  });

  it('should render heading', () => {
    const h2 = el.querySelector('h2');
    expect(h2?.textContent?.trim()).toBe("Let's build something great");
  });

  it('should render lede paragraph', () => {
    const lede = el.querySelector('.section-header__lede');
    expect(lede?.textContent).toContain('Open to full-time roles');
  });

  it('should render contacts list', () => {
    expect(el.querySelector('.contacts__list')).toBeTruthy();
  });

  it('should render 3 contact items', () => {
    const items = el.querySelectorAll('.contacts__item');
    expect(items.length).toBe(3);
  });

  it('should render email link', () => {
    const links = Array.from(el.querySelectorAll('.contacts__link'));
    const emailLink = links.find(l => l.getAttribute('href')?.startsWith('mailto:'));
    expect(emailLink).toBeTruthy();
    expect(emailLink?.getAttribute('href')).toBe('mailto:herminojunior@gmail.com');
  });

  it('should render LinkedIn link', () => {
    const links = Array.from(el.querySelectorAll('.contacts__link'));
    const linkedinLink = links.find(l => l.getAttribute('href')?.includes('linkedin'));
    expect(linkedinLink).toBeTruthy();
    expect(linkedinLink?.getAttribute('href')).toContain('hermino');
  });

  it('should render GitHub link', () => {
    const links = Array.from(el.querySelectorAll('.contacts__link'));
    const githubLink = links.find(l => l.getAttribute('href')?.includes('github'));
    expect(githubLink).toBeTruthy();
    expect(githubLink?.getAttribute('href')).toContain('hermino');
  });

  it('should render icons in contact items', () => {
    const icons = el.querySelectorAll('.contacts__icon');
    expect(icons.length).toBe(3);
  });

  it('should open LinkedIn and GitHub links in new tab', () => {
    const externalLinks = Array.from(el.querySelectorAll('.contacts__link[target="_blank"]'));
    expect(externalLinks.length).toBe(2);
  });
});
