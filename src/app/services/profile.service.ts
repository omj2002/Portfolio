import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  profileImage: string;
  resumeUrl: string;
}

export interface Stat {
  number: string;
  label: string;
}

export interface Achievement {
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface ProfileData {
  personalInfo: PersonalInfo;
  stats: Stat[];
  achievements: Achievement[];
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private dataSubject = new BehaviorSubject<ProfileData | null>(null);
  public data$ = this.dataSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadData();
  }

  private loadData(): void {
    this.http.get<ProfileData>('data/profile.json').subscribe({
      next: (data) => {
        console.log('✅ Profile data loaded from JSON:', data);
        this.dataSubject.next(data);
      },
      error: (error) => {
        console.error('❌ Error loading profile data:', error);
        console.error('❌ No fallback data available');
      }
    });
  }


  getPersonalInfo(): Observable<PersonalInfo | null> {
    return this.data$.pipe(
      map(data => data?.personalInfo || null)
    );
  }

  getStats(): Observable<Stat[]> {
    return this.data$.pipe(
      map(data => data?.stats || [])
    );
  }

  getAchievements(): Observable<Achievement[]> {
    return this.data$.pipe(
      map(data => data?.achievements || [])
    );
  }

  reloadData(): void {
    this.loadData();
  }
}
