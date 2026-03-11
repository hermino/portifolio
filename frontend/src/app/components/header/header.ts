import {
  Component,
  ChangeDetectionStrategy,
  HostListener,
  ViewChild,
  ElementRef,
  signal,
  OnInit,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header implements OnInit, OnDestroy {
  @ViewChild('siteNav') private navRef!: ElementRef<HTMLElement>;
  @ViewChild('hamburgerRef') private hamburgerRef!: ElementRef<HTMLButtonElement>;
  @ViewChild('mobileMenuRef') private mobileMenuRef!: ElementRef<HTMLElement>;

  readonly menuOpen = signal(false);
  readonly activeSection = signal('');

  private sectionObserver!: IntersectionObserver;
  private readonly sectionIds = ['about', 'projects', 'experience', 'skills', 'contact'];

  ngOnInit(): void {
    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        }
      },
      { threshold: 0.3 }
    );

    for (const id of this.sectionIds) {
      const el = document.getElementById(id);
      if (el) this.sectionObserver.observe(el);
    }
  }

  ngOnDestroy(): void {
    this.sectionObserver?.disconnect();
  }

  @HostListener('window:scroll')
  updateNav(): void {
    this.navRef?.nativeElement.classList.toggle('site-nav--scrolled', window.scrollY > 60);
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.menuOpen()) return;

    if (event.key === 'Escape') {
      this.closeMenu();
      this.hamburgerRef?.nativeElement.focus();
      return;
    }

    if (event.key === 'Tab') {
      this.trapFocus(event);
    }
  }

  toggleMenu(): void {
    this.menuOpen.update(open => !open);
    if (this.menuOpen()) {
      setTimeout(() => {
        const first = this.mobileMenuRef?.nativeElement.querySelector<HTMLElement>('a');
        first?.focus();
      }, 50);
    } else {
      this.hamburgerRef?.nativeElement.focus();
    }
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  private trapFocus(event: KeyboardEvent): void {
    const menu = this.mobileMenuRef?.nativeElement;
    if (!menu) return;

    const focusable = Array.from(
      menu.querySelectorAll<HTMLElement>('a, button, [tabindex]:not([tabindex="-1"])')
    ).filter(el => !el.hasAttribute('disabled'));

    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
}
