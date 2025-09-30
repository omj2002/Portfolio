import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type ThemeMode = 'dark' | 'light' | 'eye-protection';

export interface ThemeConfig {
  mode: ThemeMode;
  name: string;
  icon: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _currentTheme = new BehaviorSubject<ThemeMode>('dark');
  public readonly currentTheme$: Observable<ThemeMode> = this._currentTheme.asObservable();
  
  // Add reactive observable for current theme config
  public readonly currentThemeConfig$: Observable<ThemeConfig> = this._currentTheme.pipe(
    map(theme => this.themes.find(t => t.mode === theme) || this.themes[0])
  );

  public readonly themes: ThemeConfig[] = [
    {
      mode: 'dark',
      name: 'Dark Mode',
      icon: 'fas fa-moon',
      description: 'Easy on the eyes in low light'
    },
    {
      mode: 'light',
      name: 'Light Mode',
      icon: 'fas fa-sun',
      description: 'Clean and bright interface'
    },
    {
      mode: 'eye-protection',
      name: 'Eye Protection',
      icon: 'fas fa-eye',
      description: 'Reduces blue light for comfort'
    }
  ];

  constructor() {
    this.initializeTheme();
  }

  private initializeTheme(): void {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('portfolio-theme') as ThemeMode;
    if (savedTheme && this.isValidTheme(savedTheme)) {
      this.setTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setTheme(prefersDark ? 'dark' : 'light');
    }
  }

  private isValidTheme(theme: string): theme is ThemeMode {
    return ['dark', 'light', 'eye-protection'].includes(theme);
  }

  setTheme(theme: ThemeMode): void {
    this._currentTheme.next(theme);
    this.applyTheme(theme);
    localStorage.setItem('portfolio-theme', theme);
  }

  getCurrentTheme(): ThemeMode {
    return this._currentTheme.value;
  }

  private applyTheme(theme: ThemeMode): void {
    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('theme-dark', 'theme-light', 'theme-eye-protection');
    
    // Add new theme class
    root.classList.add(`theme-${theme}`);
    
    // Apply theme-specific styles
    this.applyThemeStyles(theme);
    
    // Update meta theme-color for mobile browsers
    this.updateMetaThemeColor(theme);
  }

  private applyThemeStyles(theme: ThemeMode): void {
    const root = document.documentElement;
    
    switch (theme) {
      case 'light':
        this.applyLightTheme(root);
        break;
      case 'eye-protection':
        this.applyEyeProtectionTheme(root);
        break;
      case 'dark':
      default:
        this.applyDarkTheme(root);
        break;
    }
  }

  private applyDarkTheme(root: HTMLElement): void {
    root.style.setProperty('--bg-primary', '#0a0a0a');
    root.style.setProperty('--bg-secondary', '#1a1a1a');
    root.style.setProperty('--bg-tertiary', '#2a2a2a');
    root.style.setProperty('--text-primary', '#ffffff');
    root.style.setProperty('--text-secondary', '#b0b0b0');
    root.style.setProperty('--text-muted', '#808080');
    root.style.setProperty('--accent-primary', '#4a90e2');
    root.style.setProperty('--accent-secondary', '#7b68ee');
    root.style.setProperty('--accent-tertiary', '#6c5ce7');
    root.style.setProperty('--border-color', '#333333');
    root.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.5)');
    root.style.setProperty('--gradient-primary', 'linear-gradient(135deg, #4a90e2 0%, #7b68ee 50%, #6c5ce7 100%)');
    root.style.setProperty('--gradient-secondary', 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)');
  }

  private applyLightTheme(root: HTMLElement): void {
    root.style.setProperty('--bg-primary', '#ffffff');
    root.style.setProperty('--bg-secondary', '#f8f9fa');
    root.style.setProperty('--bg-tertiary', '#e9ecef');
    root.style.setProperty('--text-primary', '#212529');
    root.style.setProperty('--text-secondary', '#6c757d');
    root.style.setProperty('--text-muted', '#adb5bd');
    root.style.setProperty('--accent-primary', '#4a90e2');
    root.style.setProperty('--accent-secondary', '#7b68ee');
    root.style.setProperty('--accent-tertiary', '#6c5ce7');
    root.style.setProperty('--border-color', '#dee2e6');
    root.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.1)');
    root.style.setProperty('--gradient-primary', 'linear-gradient(135deg, #4a90e2 0%, #7b68ee 50%, #6c5ce7 100%)');
    root.style.setProperty('--gradient-secondary', 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)');
  }

  private applyEyeProtectionTheme(root: HTMLElement): void {
    root.style.setProperty('--bg-primary', '#1a1a0a');
    root.style.setProperty('--bg-secondary', '#2a2a1a');
    root.style.setProperty('--bg-tertiary', '#3a3a2a');
    root.style.setProperty('--text-primary', '#f0f0d0');
    root.style.setProperty('--text-secondary', '#d0d0a0');
    root.style.setProperty('--text-muted', '#a0a080');
    root.style.setProperty('--accent-primary', '#8b7355');
    root.style.setProperty('--accent-secondary', '#a68b5b');
    root.style.setProperty('--accent-tertiary', '#8b7355');
    root.style.setProperty('--border-color', '#4a4a3a');
    root.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.3)');
    root.style.setProperty('--gradient-primary', 'linear-gradient(135deg, #8b7355 0%, #a68b5b 50%, #8b7355 100%)');
    root.style.setProperty('--gradient-secondary', 'linear-gradient(135deg, #2a2a1a 0%, #3a3a2a 100%)');
    
    // Add blue light filter effect
    this.applyBlueLightFilter();
  }

  private applyBlueLightFilter(): void {
    let filter = document.getElementById('blue-light-filter');
    if (!filter) {
      filter = document.createElement('div');
      filter.id = 'blue-light-filter';
      filter.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        background: rgba(255, 200, 0, 0.1);
        mix-blend-mode: multiply;
      `;
      document.body.appendChild(filter);
    }
  }

  private removeBlueLightFilter(): void {
    const filter = document.getElementById('blue-light-filter');
    if (filter) {
      filter.remove();
    }
  }

  private updateMetaThemeColor(theme: ThemeMode): void {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(metaThemeColor);
    }

    switch (theme) {
      case 'light':
        metaThemeColor.setAttribute('content', '#ffffff');
        break;
      case 'eye-protection':
        metaThemeColor.setAttribute('content', '#1a1a0a');
        break;
      case 'dark':
      default:
        metaThemeColor.setAttribute('content', '#0a0a0a');
        break;
    }
  }

  toggleTheme(): void {
    const current = this.getCurrentTheme();
    const themes = this.themes.map(t => t.mode);
    const currentIndex = themes.indexOf(current);
    const nextIndex = (currentIndex + 1) % themes.length;
    this.setTheme(themes[nextIndex]);
  }

  getNextTheme(): ThemeMode {
    const current = this.getCurrentTheme();
    const themes = this.themes.map(t => t.mode);
    const currentIndex = themes.indexOf(current);
    const nextIndex = (currentIndex + 1) % themes.length;
    return themes[nextIndex];
  }

  getCurrentThemeConfig(): ThemeConfig {
    return this.themes.find(t => t.mode === this.getCurrentTheme()) || this.themes[0];
  }
}
