import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { Footer } from './footer';

describe('Footer', () => {
  let fixture: ComponentFixture<Footer>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer],
    }).compileComponents();

    fixture = TestBed.createComponent(Footer);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render a footer element', () => {
    expect(el.querySelector('footer')).toBeTruthy();
  });

  it('should render copyright text', () => {
    const footer = el.querySelector('footer');
    expect(footer?.textContent).toContain('Hermino Barbosa de Freitas');
  });

  it('should render copyright symbol', () => {
    const footer = el.querySelector('footer');
    expect(footer?.textContent).toContain('©');
  });
});
