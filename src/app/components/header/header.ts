import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, OnDestroy {
  private nav: HTMLElement | null = null;

  ngOnInit() {
    this.nav = document.querySelector('.site-nav');
    this.updateNav();
  }

  ngOnDestroy() {
    this.nav = null;
  }

  @HostListener('window:scroll', [])
  updateNav() {
    if (this.nav) {
      this.nav.classList.toggle('scrolled', window.scrollY > 60);
    }
  }
}
