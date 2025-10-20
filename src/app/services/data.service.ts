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

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
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

export interface NavigationItem {
  path: string;
  label: string;
  icon: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  stats: Stat[];
  skills: Skills;
  projects: Project[];
  socialLinks: SocialLink[];
  languages: Language[];
  navigation: NavigationItem[];
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSubject = new BehaviorSubject<PortfolioData | null>(null);
  public data$ = this.dataSubject.asObservable();

  constructor(private http: HttpClient) {
    // console.log('🔍 DataService: Initializing data service...');
    // console.log('🔍 DataService: HttpClient available:', !!this.http);
    this.loadData();
  }

  private loadData(): void {
    console.log('🔍 DataService: Attempting to load data from JSON file...');
    console.log('🔍 DataService: Requesting URL: assets/data/portfolio-data.json');
    
    this.http.get<PortfolioData>('assets/data/portfolio-data.json').subscribe({
      next: (data) => {
        console.log('✅ Successfully loaded data from JSON file:', data);
        console.log('✅ Data includes:', {
          personalInfo: data?.personalInfo?.name,
          statsCount: data?.stats?.length,
          skillsCount: Object.keys(data?.skills || {}).length,
          projectsCount: data?.projects?.length
        });
        this.dataSubject.next(data);
      },
      error: (error) => {
        console.error('❌ Error loading portfolio data from JSON:', error);
        console.error('❌ Error details:', {
          status: error.status,
          statusText: error.statusText,
          url: error.url,
          message: error.message
        });
        console.log('🔄 Using fallback data...');
        // Only use fallback data as last resort
        this.loadFallbackData();
      }
    });
  }

  // Method to manually reload data from JSON
  public reloadData(): void {
    console.log('DataService: Manually reloading data from JSON...');
    this.loadData();
  }

  private loadFallbackData(): void {
    const fallbackData: PortfolioData = {
      personalInfo: {
        name: "Om Jadhav",
        title: "Full Stack Developer",
        subtitle: "Passionate Developer & Problem Solver",
        description: "I'm a passionate developer with expertise in modern web technologies. I love creating beautiful, functional, and user-friendly applications that solve real-world problems.",
        email: "om.jadhav.dev@gmail.com",
        phone: "+1 (555) 123-4567",
        location: "Hyderabad, Telangana",
        profileImage: "assets/images/profilephoto.jpg",
        resumeUrl: "assets/Resume/Om-jadav-Resume.pdf"
      },
      stats: [
        { number: "1+", label: "Years Experience" },
        { number: "20+", label: "Projects Completed" },
        { number: "15+", label: "Happy Clients" }
      ],
      skills: {
        frontend: [
          { name: "Angular", icon: "fab fa-angular", level: 90 },
          { name: "React", icon: "fab fa-react", level: 85 },
          { name: "Vue.js", icon: "fab fa-vue", level: 80 },
          { name: "JavaScript", icon: "fab fa-js-square", level: 95 },
          { name: "TypeScript", icon: "fas fa-code", level: 90 },
          { name: "HTML5", icon: "fab fa-html5", level: 95 },
          { name: "CSS3", icon: "fab fa-css3-alt", level: 90 },
          { name: "Sass/SCSS", icon: "fab fa-sass", level: 85 }
        ],
        backend: [
          { name: "Node.js", icon: "fab fa-node-js", level: 90 },
          { name: "Python", icon: "fab fa-python", level: 85 },
          { name: "Java", icon: "fab fa-java", level: 80 },
          { name: "Express.js", icon: "fas fa-server", level: 85 },
          { name: "Django", icon: "fab fa-python", level: 75 },
          { name: "Spring Boot", icon: "fab fa-java", level: 70 }
        ],
        database: [
          { name: "MongoDB", icon: "fas fa-database", level: 85 },
          { name: "PostgreSQL", icon: "fas fa-database", level: 80 },
          { name: "MySQL", icon: "fas fa-database", level: 75 },
          { name: "Redis", icon: "fas fa-database", level: 70 }
        ],
        tools: [
          { name: "Git", icon: "fab fa-git-alt", level: 90 },
          { name: "Docker", icon: "fab fa-docker", level: 80 },
          { name: "AWS", icon: "fab fa-aws", level: 75 },
          { name: "Figma", icon: "fab fa-figma", level: 85 },
          { name: "VS Code", icon: "fas fa-code", level: 95 },
          { name: "Responsive Design", icon: "fas fa-mobile-alt", level: 90 }
        ]
      },
      projects: [
        {
          id: 1,
          title: "E-Commerce Platform",
          description: "A full-stack e-commerce solution built with Angular, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.",
          image: "assets/images/projects/ecommerce.jpg",
          technologies: ["Angular", "Node.js", "MongoDB", "Stripe", "Express.js"],
          liveUrl: "https://ecommerce-demo.com",
          githubUrl: "https://github.com/johndoe/ecommerce-platform",
          featured: true
        },
        {
          id: 2,
          title: "Task Management App",
          description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
          image: "assets/images/projects/taskmanager.jpg",
          technologies: ["React", "Socket.io", "Express", "PostgreSQL", "Redux"],
          liveUrl: "https://taskmanager-demo.com",
          githubUrl: "https://github.com/johndoe/task-manager",
          featured: true
        }
      ],
      socialLinks: [
        { name: "GitHub", url: "https://github.com/omj2002", icon: "fab fa-github" },
        { name: "LinkedIn", url: "https://linkedin.com/in/om-jadhav-245230239", icon: "fab fa-linkedin" },
        { name: "Twitter", url: "https://twitter.com/Omop14321432", icon: "fab fa-twitter" },
        { name: "Instagram", url: "https://instagram.com/omj002", icon: "fab fa-instagram" }
      ],
      languages: [
        { code: "EN", name: "English", flag: "fas fa-flag-usa" },
        { code: "ES", name: "Español", flag: "fas fa-flag" },
        { code: "FR", name: "Français", flag: "fas fa-flag" }
      ],
      navigation: [
        { path: "/about", label: "About", icon: "fas fa-user" },
        { path: "/skills", label: "Skills", icon: "fas fa-cogs" },
        { path: "/projects", label: "Projects", icon: "fas fa-briefcase" },
        { path: "/showcase", label: "3D Showcase", icon: "fas fa-cube" },
        { path: "/contact", label: "Contact", icon: "fas fa-envelope" }
      ]
    };
    this.dataSubject.next(fallbackData);
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

  getSkills(): Observable<Skills | null> {
    return this.data$.pipe(
      map(data => data?.skills || null)
    );
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

  getNavigation(): Observable<NavigationItem[]> {
    return this.data$.pipe(
      map(data => data?.navigation || [])
    );
  }

  getProjectById(id: number): Observable<Project | null> {
    return this.data$.pipe(
      map(data => data?.projects?.find(project => project.id === id) || null)
    );
  }

  // Method to check if data is loaded from JSON or fallback
  public isDataFromJSON(): Observable<boolean> {
    return this.data$.pipe(
      map(data => {
        if (!data) return false;
        // Check if it's fallback data by looking for specific fallback indicators
        return data.personalInfo?.name !== "John Doe" || data.personalInfo?.email !== "john.doe@example.com";
      })
    );
  }

  // Method to get current data source info
  public getDataSourceInfo(): Observable<string> {
    return this.data$.pipe(
      map(data => {
        if (!data) return 'No data loaded';
        if (data.personalInfo?.name === "John Doe" && data.personalInfo?.email === "john.doe@example.com") {
          return 'Using fallback data';
        }
        return 'Using JSON data';
      })
    );
  }
}
