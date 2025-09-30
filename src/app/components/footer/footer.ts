import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService, PersonalInfo, SocialLink } from '../../services/data.service';
import { LanguageService, TranslationData } from '../../services/language.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer implements OnInit {
  currentYear = new Date().getFullYear();
  personalInfo$: Observable<PersonalInfo | null>;
  socialLinks$: Observable<SocialLink[]>;
  translations$: Observable<TranslationData | null>;

  constructor(
    private dataService: DataService,
    private languageService: LanguageService
  ) {
    this.personalInfo$ = this.dataService.getPersonalInfo();
    this.socialLinks$ = this.dataService.getSocialLinks();
    this.translations$ = this.languageService.translations$;
  }

  ngOnInit(): void {}

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
}