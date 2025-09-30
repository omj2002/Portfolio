import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  address: string;
  workingHours: string;
  timezone: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface ContactData {
  contactInfo: ContactInfo;
  socialLinks: SocialLink[];
  languages: Language[];
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private dataSubject = new BehaviorSubject<ContactData | null>(null);
  public data$ = this.dataSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadData();
  }

  private loadData(): void {
    this.http.get<ContactData>('data/contact.json').subscribe({
      next: (data) => {
        console.log('✅ Contact data loaded from JSON:', data);
        this.dataSubject.next(data);
      },
      error: (error) => {
        console.error('❌ Error loading contact data:', error);
        console.error('❌ No fallback data available');
      }
    });
  }


  getContactInfo(): Observable<ContactInfo> {
    return this.data$.pipe(
      map(data => data?.contactInfo || {
        email: "om.jadhav.dev@gmail.com",
        phone: "+916266836548",
        location: "Hyderabad, Telangana, India",
        address: "Hyderabad, Telangana",
        workingHours: "Mon - Fri: 9:00 AM - 6:00 PM",
        timezone: "IST (UTC+5:30)"
      })
    );
  }

  getSocialLinks(): Observable<SocialLink[]> {
    return this.data$.pipe(
      map(data => data?.socialLinks || [])
    );
  }

  getLanguages(): Observable<Language[]> {
    return this.data$.pipe(
      map(data => data?.languages || [])
    );
  }

  reloadData(): void {
    this.loadData();
  }
}
