import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService, PersonalInfo } from '../../services/profile.service';
import { ProjectsService, Project } from '../../services/projects.service';
import { SkillsService } from '../../services/skills.service';
import { LanguageService, TranslationData } from '../../services/language.service';
import { PersonalDetailsService, PersonalDetails } from '../../services/personal-details.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-showcase',
  imports: [CommonModule],
  templateUrl: './showcase.html',
  styleUrl: './showcase.scss'
})
export class Showcase implements OnInit {
  
  
  personalInfo$: Observable<PersonalInfo | null>;
  featuredProjects$: Observable<Project[]>;
  achievements$: Observable<any[]>;
  showcaseSkills$: Observable<string[]>;
  translations$: Observable<TranslationData | null>;
  personalDetails$: Observable<PersonalDetails | null>;
  

  achievements = [
    {
      title: "Full Stack Development",
      description: "Expert in modern web technologies with 1+ years of experience",
      icon: "fas fa-code",
      color: "var(--accent-primary)"
    },
    {
      title: "Problem Solver",
      description: "Passionate about creating efficient and scalable solutions",
      icon: "fas fa-lightbulb",
      color: "var(--accent-secondary)"
    },
    {
      title: "Continuous Learner",
      description: "Always exploring new technologies and best practices",
      icon: "fas fa-graduation-cap",
      color: "var(--accent-tertiary)"
    },
    {
      title: "Team Player",
      description: "Collaborative approach with excellent communication skills",
      icon: "fas fa-users",
      color: "var(--accent-primary)"
    }
  ];

  skills = [
    { name: "Frontend Development", level: 90, color: "var(--accent-primary)" },
    { name: "Backend Development", level: 85, color: "var(--accent-secondary)" },
    { name: "Database Design", level: 80, color: "var(--accent-tertiary)" },
    { name: "UI/UX Design", level: 75, color: "var(--accent-primary)" }
  ];

  constructor(
    private profileService: ProfileService,
    private projectsService: ProjectsService,
    private skillsService: SkillsService,
    private languageService: LanguageService,
    private personalDetailsService: PersonalDetailsService
  ) {
    this.personalInfo$ = this.profileService.getPersonalInfo();
    this.featuredProjects$ = this.projectsService.getFeaturedProjects();
    this.achievements$ = this.profileService.getAchievements();
    this.showcaseSkills$ = this.skillsService.getShowcaseSkills();
    this.translations$ = this.languageService.translations$;
    this.personalDetails$ = this.personalDetailsService.personalDetails$;
  }

  ngOnInit(): void {
    this.personalInfo$ = this.profileService.getPersonalInfo();
    this.featuredProjects$ = this.projectsService.getFeaturedProjects();
    this.achievements$ = this.profileService.getAchievements();
    this.showcaseSkills$ = this.skillsService.getShowcaseSkills();
    this.translations$ = this.languageService.translations$;
    this.personalDetails$ = this.personalDetailsService.personalDetails$;
    
  }
  
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    } else {
      console.warn(`Section with id '${sectionId}' not found`);
    }
  }
  
  getTranslation(translations: any, key: string): string {
    return translations?.showcase?.[key] || '';
  }

  downloadResume(): void {
    this.personalInfo$.subscribe(personalInfo => {
      if (personalInfo) {
        const resumeContent = `
# ${personalInfo.name} - ${personalInfo.title}

## Contact Information
- Email: ${personalInfo.email}
- Phone: ${personalInfo.phone}
- Location: ${personalInfo.location}

## About
${personalInfo.description}

## Skills
${this.showcaseSkills$.subscribe(skills => skills.join(', '))}

## Experience
Full Stack Developer with expertise in modern web technologies.

## Education
Computer Science background with focus on web development.

---
Generated from portfolio website
        `;
        
        const blob = new Blob([resumeContent], { type: 'text/markdown' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${personalInfo.name}_Resume.md`;
        link.click();
        window.URL.revokeObjectURL(url);
      }
    });
  }

}