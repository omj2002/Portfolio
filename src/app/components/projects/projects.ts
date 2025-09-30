import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService, Project } from '../../services/projects.service';
import { LanguageService, TranslationData } from '../../services/language.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects implements OnInit {
  projects$: Observable<Project[]>;
  translations$: Observable<TranslationData | null>;

  constructor(
    private projectsService: ProjectsService,
    private languageService: LanguageService
  ) {
    this.projects$ = this.projectsService.getProjects();
    this.translations$ = this.languageService.translations$;
  }

  ngOnInit(): void {}
}
