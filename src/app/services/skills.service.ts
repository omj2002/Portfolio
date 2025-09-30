import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Skill {
  name: string;
  icon: string;
  level: number;
}

export interface Skills {
  frontend: Skill[];
  backend: Skill[];
  database: Skill[];
  tools: Skill[];
}

export interface SkillsData {
  skills: Skills;
  showcaseSkills: string[];
}

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private dataSubject = new BehaviorSubject<SkillsData | null>(null);
  public data$ = this.dataSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadData();
  }

  private loadData(): void {
    this.http.get<SkillsData>('data/skills.json').subscribe({
      next: (data) => {
        console.log('✅ Skills data loaded from JSON:', data);
        this.dataSubject.next(data);
      },
      error: (error) => {
        console.error('❌ Error loading skills data:', error);
        console.error('❌ No fallback data available');
      }
    });
  }


  getSkills(): Observable<Skills | null> {
    return this.data$.pipe(
      map(data => data?.skills || null)
    );
  }

  getShowcaseSkills(): Observable<string[]> {
    return this.data$.pipe(
      map(data => data?.showcaseSkills || [])
    );
  }

  reloadData(): void {
    this.loadData();
  }
}
