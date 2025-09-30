import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsService, Skills as SkillsData } from '../../services/skills.service';
import { LanguageService, TranslationData } from '../../services/language.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss'
})
export class Skills implements OnInit {
  skills$: Observable<SkillsData | null>;
  translations$: Observable<TranslationData | null>;

  constructor(
    private skillsService: SkillsService,
    private languageService: LanguageService
  ) {
    this.skills$ = this.skillsService.getSkills();
    this.translations$ = this.languageService.translations$;
  }

  ngOnInit(): void {}
}
