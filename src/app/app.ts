import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeToggle } from './components/theme-toggle/theme-toggle';
import { Header } from './components/header/header';
import { About } from './components/about/about';
import { Projects } from './components/projects/projects';
import { Experiences } from './components/experiences/experiences';
import { Skills } from './components/skills/skills';
import { Contacts } from './components/contacts/contacts';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ThemeToggle,
    Header,
    About,
    Projects,
    Experiences,
    Skills,
    Contacts,
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Hermino Freitas Portfolio';
}
