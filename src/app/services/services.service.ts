import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Service {
  title: string;
  description: string;
  icon: string;
  features: string[];
  pricing: string;
  delivery: string;
  technologies: string[];
}

export interface ServicesData {
  services: Service[];
  testimonials: any[];
  blogPosts: any[];
}

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private servicesSubject = new BehaviorSubject<Service[]>([]);
  public services$ = this.servicesSubject.asObservable();

  constructor(private http: HttpClient) {
    // Load services immediately with fallback
    this.servicesSubject.next(this.getDefaultServices());
    this.loadServices();
  }

  private loadServices(): void {
    this.http.get<ServicesData>('assets/data/services.json').subscribe({
      next: (data) => {
        console.log('✅ Services data loaded:', data);
        this.servicesSubject.next(data.services);
      },
      error: (error) => {
        console.error('❌ Error loading services data:', error);
        // Keep default services if loading fails
      }
    });
  }

  getServices(): Observable<Service[]> {
    return this.services$;
  }

  private getDefaultServices(): Service[] {
    return [
      {
        title: "Web Development",
        description: "Custom web applications using modern frameworks like Angular, React, and .NET Core",
        icon: "fas fa-laptop-code",
        features: ["Responsive Design", "Performance Optimization", "SEO Friendly", "Cross-browser Compatibility"],
        pricing: "Starting from ₹25,000",
        delivery: "2-4 weeks",
        technologies: ["Angular", "React", ".NET Core", "Node.js"]
      },
      // {
      //   title: "Mobile Apps",
      //   description: "Cross-platform mobile applications for iOS and Android using React Native and Flutter",
      //   icon: "fas fa-mobile-alt",
      //   features: ["React Native", "Flutter", "Native Development", "App Store Deployment"],
      //   pricing: "Starting from ₹35,000",
      //   delivery: "3-6 weeks",
      //   technologies: ["React Native", "Flutter", "Swift", "Kotlin"]
      // },
      {
        title: "UI/UX Design",
        description: "Beautiful and intuitive user interfaces that provide exceptional user experiences",
        icon: "fas fa-palette",
        features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
        pricing: "Starting from ₹15,000",
        delivery: "1-3 weeks",
        technologies: ["Figma", "Adobe XD", "Sketch"]
      }
      // {
      //   title: "Technical Consulting",
      //   description: "Expert technical consulting and architecture guidance for your development projects",
      //   icon: "fas fa-lightbulb",
      //   features: ["System Architecture", "Code Review", "Best Practices", "Technology Selection"],
      //   pricing: "₹2,000/hour",
      //   delivery: "Flexible",
      //   technologies: ["Architecture", "Code Review", "Performance", "Security"]
      // }
    ];
  }

  reloadServices(): void {
    this.loadServices();
  }
}