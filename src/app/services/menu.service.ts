import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface NavigationItem {
  path: string;
  label: string;
  icon: string;
  order: number;
}

export interface SiteSettings {
  title: string;
  description: string;
  keywords: string;
  author: string;
  theme: string;
  language: string;
  currency: string;
  timezone: string;
}

export interface MenuData {
  navigation: NavigationItem[];
  siteSettings: SiteSettings;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private dataSubject = new BehaviorSubject<MenuData | null>(null);
  public data$ = this.dataSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadData();
  }

  private loadData(): void {
    // Add timestamp to prevent caching
    const timestamp = new Date().getTime();
    this.http.get<MenuData>(`data/menu.json?t=${timestamp}`).subscribe({
      next: (data) => {
        console.log('✅ Menu data loaded from JSON:', data);
        this.dataSubject.next(data);
      },
      error: (error) => {
        console.error('❌ Error loading menu data:', error);
        console.error('❌ No fallback data available');
      }
    });
  }


  getNavigation(): Observable<NavigationItem[]> {
    return this.data$.pipe(
      map(data => {
        const navigation = data?.navigation || [];
        return navigation.sort((a, b) => a.order - b.order);
      })
    );
  }

  getSiteSettings(): Observable<SiteSettings> {
    return this.data$.pipe(
      map(data => data?.siteSettings || {
        title: "OM Jadhav - Full Stack Developer",
        description: "Portfolio of OM Jadhav, a passionate Full Stack Developer",
        keywords: "OM Jadhav, Full Stack Developer, Angular, React, Node.js",
        author: "OM Jadhav",
        theme: "dark",
        language: "en",
        currency: "INR",
        timezone: "Asia/Kolkata"
      })
    );
  }

  reloadData(): void {
    this.loadData();
  }

  forceReload(): void {
    console.log('🔄 Force reloading menu data...');
    this.loadData();
  }
}
