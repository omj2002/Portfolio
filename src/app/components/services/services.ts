import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesService, Service } from '../../services/services.service';
import { LanguageService, TranslationData } from '../../services/language.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-services',
  imports: [CommonModule],
  templateUrl: './services.html',
  styleUrl: './services.scss'
})
export class Services implements OnInit {
  services: Service[] = [];
  translations$: Observable<TranslationData | null>;

  constructor(
    private servicesService: ServicesService,
    private languageService: LanguageService
  ) {
    this.translations$ = this.languageService.translations$;
  }

  ngOnInit(): void {
    // Load services synchronously to avoid loading behavior
    this.servicesService.getServices().subscribe(services => {
      this.services = services;
    });
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

  contactForService(serviceName: string): void {
    // Scroll to contact section and pre-fill subject
    this.scrollToSection('contact');
    
    // Pre-fill the contact form with the service name immediately
    const subjectInput = document.querySelector('input[formControlName="subject"]') as HTMLInputElement;
    if (subjectInput) {
      subjectInput.value = `Inquiry about ${serviceName} services`;
      subjectInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  learnMore(service: Service): void {
    // You can implement a modal or detailed view here
    console.log('Learn more about:', service);
    // For now, we'll just scroll to contact
    this.contactForService(service.title);
  }

  downloadPortfolio(): void {
    // Create and download a portfolio PDF or document
    const portfolioContent = `
# OM Jadhav - Portfolio

## Services Offered

### Web Development
- Custom web applications using modern frameworks
- Responsive Design, Performance Optimization, SEO Friendly

### Mobile Apps  
- Cross-platform mobile applications
- React Native, Flutter, Native Development

### UI/UX Design
- Beautiful and intuitive user interfaces
- User Research, Wireframing, Prototyping

### Consulting
- Technical consulting and architecture
- System Architecture, Code Review, Best Practices

## Contact Information
- Email: om.jadhav.dev@gmail.com
- Phone: +916266836548
- Location: Hyderabad, Telangana

---
Generated from portfolio website
    `;
    
    const blob = new Blob([portfolioContent], { type: 'text/markdown' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'OM_Jadhav_Services_Portfolio.md';
    link.click();
    window.URL.revokeObjectURL(url);
  }
}
