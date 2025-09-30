import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { About } from './components/about/about';
import { Skills } from './components/skills/skills';
import { Projects } from './components/projects/projects';
import { Showcase } from './components/showcase/showcase';
import { Services } from './components/services/services';
import { Contact } from './components/contact/contact';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  imports: [Header, Footer, About, Skills, Projects, Showcase, Services, Contact],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('portfolio');
  
  constructor(private languageService: LanguageService) {
    // Initialize language service
    this.languageService.changeLanguage('en');
  }
}
