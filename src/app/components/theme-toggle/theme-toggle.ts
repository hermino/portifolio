import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  imports: [],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.css',
})
export class ThemeToggle implements OnInit {
  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    const theme = savedTheme || 'dark';
    
    document.documentElement.setAttribute('data-theme', theme);
    this.updateButtonLabel(theme);

    const themeToggle = document.getElementById('theme-toggle');
    themeToggle?.addEventListener('click', () => this.toggleTheme());
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    this.updateButtonLabel(newTheme);
  }

  updateButtonLabel(theme: string) {
    const button = document.getElementById('theme-toggle');
    if (button) {
      button.setAttribute('aria-label', 
        theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
      );
    }
  }
}
