import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  category: string;
}

export interface ProjectsData {
  projects: Project[];
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private dataSubject = new BehaviorSubject<ProjectsData | null>(null);
  public data$ = this.dataSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadData();
  }

  private loadData(): void {
    this.http.get<ProjectsData>('data/projects.json').subscribe({
      next: (data) => {
        console.log('✅ Projects data loaded from JSON:', data);
        this.dataSubject.next(data);
      },
      error: (error) => {
        console.error('❌ Error loading projects data:', error);
        console.error('❌ No fallback data available');
      }
    });
  }


  getProjects(): Observable<Project[]> {
    return this.data$.pipe(
      map(data => data?.projects || [])
    );
  }

  getFeaturedProjects(): Observable<Project[]> {
    return this.data$.pipe(
      map(data => data?.projects?.filter(project => project.featured) || [])
    );
  }

  getProjectById(id: number): Observable<Project | null> {
    return this.data$.pipe(
      map(data => data?.projects?.find(project => project.id === id) || null)
    );
  }

  getProjectsByCategory(category: string): Observable<Project[]> {
    return this.data$.pipe(
      map(data => data?.projects?.filter(project => project.category === category) || [])
    );
  }

  reloadData(): void {
    this.loadData();
  }
}
