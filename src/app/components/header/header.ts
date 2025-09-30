import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService, NavigationItem } from '../../services/menu.service';
import { ContactService, Language } from '../../services/contact.service';
import { ProfileService, PersonalInfo } from '../../services/profile.service';
import { LanguageService, Language as LanguageData, TranslationData } from '../../services/language.service';
import { ThemeService, ThemeMode, ThemeConfig } from '../../services/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',            
  styleUrl: './header.scss'
})
export class Header implements OnInit {
  isMenuOpen = false;
  isLanguageMenuOpen = false;
  isThemeMenuOpen = false;
  currentLanguage = 'EN';
  
  navigation$: Observable<NavigationItem[]>;
  languages$: Observable<Language[]>;
  personalInfo$: Observable<PersonalInfo | null>;
  translations$: Observable<TranslationData | null>;
  availableLanguages$: Observable<LanguageData[]>;
  currentTheme$: Observable<ThemeMode>;
  currentThemeConfig$: Observable<ThemeConfig>;
  themes$: Observable<ThemeConfig[]>;

  constructor(
    private menuService: MenuService,
    private contactService: ContactService,
    private profileService: ProfileService,
    private languageService: LanguageService,
    private themeService: ThemeService
  ) {
    this.navigation$ = this.menuService.getNavigation();
    this.languages$ = this.contactService.getLanguages();
    this.personalInfo$ = this.profileService.getPersonalInfo();
    this.translations$ = this.languageService.translations$;
    this.availableLanguages$ = new Observable(observer => {
      observer.next(this.languageService.languages);
    });
    this.currentTheme$ = this.themeService.currentTheme$;
    this.currentThemeConfig$ = this.themeService.currentThemeConfig$;
    this.themes$ = new Observable(observer => {
      observer.next(this.themeService.themes);
    });
  }

  ngOnInit(): void {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.isLanguageMenuOpen = false;
    this.isThemeMenuOpen = false;
    console.log('Menu toggled:', this.isMenuOpen);
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.isLanguageMenuOpen = false;
    this.isThemeMenuOpen = false;
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      // Scroll to the section immediately
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    } else {
      console.warn(`Section with id '${sectionId}' not found`);
    }
  }

  toggleLanguageMenu() {
    this.isLanguageMenuOpen = !this.isLanguageMenuOpen;
    this.isThemeMenuOpen = false;
  }

  toggleThemeMenu() {
    this.isThemeMenuOpen = !this.isThemeMenuOpen;
    this.isLanguageMenuOpen = false;
  }

  changeLanguage(lang: string) {
    this.currentLanguage = lang;
    this.isLanguageMenuOpen = false;
    this.languageService.changeLanguage(lang);
    console.log('Language changed to:', lang);
  }

  changeTheme(theme: ThemeMode) {
    this.themeService.setTheme(theme);
    this.isThemeMenuOpen = false;
    console.log('Theme changed to:', theme);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    console.log('Theme toggled to:', this.themeService.getCurrentTheme());
  }

  downloadResume() {
    // Create a link to download the PDF from assets
    const link = document.createElement('a');
    link.href = 'assets/data/Resume/Om-Jadav-Resume.pdf';
    link.download = 'Om-Jadav-Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.language-selector') && 
        !target.closest('.theme-selector') && 
        !target.closest('.nav-actions') &&
        !target.closest('.nav-toggle') &&
        !target.closest('.nav-menu')) {
      this.isLanguageMenuOpen = false;
      this.isThemeMenuOpen = false;
      this.isMenuOpen = false;
    }
  }
}
