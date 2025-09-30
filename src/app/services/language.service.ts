import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PersonalDetailsService } from './personal-details.service';

export interface Language {
  code: string;
  name: string;
  flag: string;
  direction: 'ltr' | 'rtl';
}

export interface TranslationData {
  navigation: {
    about: string;
    skills: string;
    moreInfo: string;
    projects: string;
    contact: string;
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
    hello: string;
    getInTouch: string;
    viewMyWork: string;
    stats: {
      experience: string;
      projects: string;
      clients: string;
    };
  };
  skills: {
    title: string;
    subtitle: string;
    categories: {
      frontend: string;
      backend: string;
      database: string;
      tools: string;
    };
  };
  projects: {
    title: string;
    subtitle: string;
    viewProject: string;
    viewCode: string;
    liveDemo: string;
    github: string;
  };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    message: string;
    send: string;
    resume: string;
    contactInfo: string;
    sendMessage: string;
    subject: string;
    phone: string;
    location: string;
    socialMedia: string;
  };
  showcase: {
    achievements: string;
    technicalSkills: string;
    featuredProjects: string;
    readyToWork: string;
    createSomething: string;
    alwaysExcited: string;
    fullStackDev: string;
    problemSolver: string;
    teamPlayer: string;
    continuousLearner: string;
    yearsExperience: string;
    projectsCompleted: string;
    happyClients: string;
    developer: string;
    getInTouch: string;
    viewProjects: string;
    downloadResume: string;
    viewSkills: string;
  };
  footer: {
    description: string;
    quickLinks: string;
    services: string;
    contactInfo: string;
    webDevelopment: string;
    mobileApps: string;
    uiUx: string;
    consulting: string;
    allRightsReserved: string;
    privacyPolicy: string;
    termsOfService: string;
    cookiePolicy: string;
  };
  common: {
    download: string;
    resume: string;
    language: string;
    scrollToTop: string;
    backToTop: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<string>('en');
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  private translationsSubject = new BehaviorSubject<TranslationData | null>(null);
  public translations$ = this.translationsSubject.asObservable();

  public readonly languages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸', direction: 'ltr' },
    { code: 'fr', name: 'Français', flag: '🇫🇷', direction: 'ltr' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪', direction: 'ltr' },
    { code: 'ja', name: '日本語', flag: '🇯🇵', direction: 'ltr' },
    { code: 'sv', name: 'Svenska', flag: '🇸🇪', direction: 'ltr' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦', direction: 'rtl' }
  ];

  constructor(private personalDetailsService: PersonalDetailsService) {
    this.loadLanguage('en');
  }

  public getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  public getCurrentLanguageData(): Language {
    return this.languages.find(lang => lang.code === this.getCurrentLanguage()) || this.languages[0];
  }

  public changeLanguage(languageCode: string): void {
    this.loadLanguage(languageCode);
    this.currentLanguageSubject.next(languageCode);
    this.updateDocumentDirection();
    // Load personal details for the new language
    this.personalDetailsService.loadPersonalDetails(languageCode).subscribe();
  }

  private updateDocumentDirection(): void {
    const currentLang = this.getCurrentLanguageData();
    document.documentElement.setAttribute('dir', currentLang.direction);
    document.documentElement.setAttribute('lang', currentLang.code);
  }

  private loadLanguage(languageCode: string): void {
    const translations = this.getTranslations(languageCode);
    this.translationsSubject.next(translations);
    // Load personal details for the language
    this.personalDetailsService.loadPersonalDetails(languageCode).subscribe();
  }

  private getTranslations(languageCode: string): TranslationData {
    const translations: { [key: string]: TranslationData } = {
      en: {
        navigation: {
          about: 'About',
          skills: 'Skills',
          moreInfo: 'More Info',
          projects: 'Projects',
          contact: 'Contact'
        },
        about: {
          title: 'About Me',
          subtitle: 'Full Stack Developer',
          description: 'Passionate developer with expertise in modern web technologies and cloud solutions.',
          hello: 'Hello, I\'m',
          getInTouch: 'Get In Touch',
          viewMyWork: 'View My Work',
          stats: {
            experience: 'Years Experience',
            projects: 'Projects Completed',
            clients: 'Happy Clients'
          }
        },
        skills: {
          title: 'My Skills',
          subtitle: 'Technologies and tools I work with',
          categories: {
            frontend: 'Frontend',
            backend: 'Backend',
            database: 'Database',
            tools: 'Tools & Others'
          }
        },
        projects: {
          title: 'My Projects',
          subtitle: 'Some of my recent work',
          viewProject: 'View Project',
          viewCode: 'View Code',
          liveDemo: 'Live Demo',
          github: 'GitHub'
        },
        contact: {
          title: 'Get In Touch',
          subtitle: 'Let\'s work together',
          name: 'Your Name',
          email: 'Your Email',
          message: 'Your Message',
          send: 'Send Message',
          resume: 'Download Resume',
          contactInfo: 'Contact Information',
          sendMessage: 'Send Message',
          subject: 'Subject',
          phone: 'Phone',
          location: 'Location',
          socialMedia: 'Social Media'
        },
        showcase: {
          achievements: 'My Achievements',
          technicalSkills: 'Technical Skills',
          featuredProjects: 'Featured Projects',
          readyToWork: 'Ready to Work Together?',
          createSomething: 'Let\'s create something amazing together. I\'m always excited to work on new projects and challenges.',
          alwaysExcited: 'I\'m always excited to work on new projects and challenges.',
          fullStackDev: 'Full Stack Development',
          problemSolver: 'Problem Solver',
          teamPlayer: 'Team Player',
          continuousLearner: 'Continuous Learner',
          yearsExperience: 'Years Experience',
          projectsCompleted: 'Projects Completed',
          happyClients: 'Happy Clients',
          developer: 'Developer',
          getInTouch: 'Get In Touch',
          viewProjects: 'View Projects',
          downloadResume: 'Download Resume',
          viewSkills: 'View Skills'
        },
        footer: {
          description: 'A passionate developer creating beautiful, functional, and user-friendly applications that solve real-world problems.',
          quickLinks: 'Quick Links',
          services: 'Services',
          contactInfo: 'Contact Info',
          webDevelopment: 'Web Development',
          mobileApps: 'Mobile Apps',
          uiUx: 'UI/UX Design',
          consulting: 'Consulting',
          allRightsReserved: 'All rights reserved.',
          privacyPolicy: 'Privacy Policy',
          termsOfService: 'Terms of Service',
          cookiePolicy: 'Cookie Policy'
        },
        common: {
          download: 'Download',
          resume: 'Resume',
          language: 'Language',
          scrollToTop: 'Scroll to Top',
          backToTop: 'Back to Top'
        }
      },
      fr: {
        navigation: {
          about: 'À propos',
          skills: 'Compétences',
          moreInfo: 'Plus d\'infos',
          projects: 'Projets',
          contact: 'Contact'
        },
        about: {
          title: 'À propos de moi',
          subtitle: 'Développeur Full Stack',
          description: 'Développeur passionné avec une expertise dans les technologies web modernes et les solutions cloud.',
          hello: 'Bonjour, je suis',
          getInTouch: 'Contactez-moi',
          viewMyWork: 'Voir mon travail',
          stats: {
            experience: 'Années d\'expérience',
            projects: 'Projets terminés',
            clients: 'Clients satisfaits'
          }
        },
        skills: {
          title: 'Mes compétences',
          subtitle: 'Technologies et outils que j\'utilise',
          categories: {
            frontend: 'Frontend',
            backend: 'Backend',
            database: 'Base de données',
            tools: 'Outils et autres'
          }
        },
        projects: {
          title: 'Mes projets',
          subtitle: 'Quelques-uns de mes travaux récents',
          viewProject: 'Voir le projet',
          viewCode: 'Voir le code',
          liveDemo: 'Démo en direct',
          github: 'GitHub'
        },
        contact: {
          title: 'Contactez-moi',
          subtitle: 'Travaillons ensemble',
          name: 'Votre nom',
          email: 'Votre email',
          message: 'Votre message',
          send: 'Envoyer le message',
          resume: 'Télécharger le CV',
          contactInfo: 'Informations de contact',
          sendMessage: 'Envoyer le message',
          subject: 'Sujet',
          phone: 'Téléphone',
          location: 'Localisation',
          socialMedia: 'Réseaux sociaux'
        },
        showcase: {
          achievements: 'Mes réalisations',
          technicalSkills: 'Compétences techniques',
          featuredProjects: 'Projets en vedette',
          readyToWork: 'Prêt à travailler ensemble ?',
          createSomething: 'Créons quelque chose d\'incroyable ensemble. Je suis toujours excité de travailler sur de nouveaux projets et défis.',
          alwaysExcited: 'Je suis toujours excité de travailler sur de nouveaux projets et défis.',
          fullStackDev: 'Développement Full Stack',
          problemSolver: 'Résolveur de problèmes',
          teamPlayer: 'Joueur d\'équipe',
          continuousLearner: 'Apprenant continu',
          yearsExperience: 'Années d\'expérience',
          projectsCompleted: 'Projets terminés',
          happyClients: 'Clients satisfaits',
          developer: 'Développeur',
          getInTouch: 'Entrer en contact',
          viewProjects: 'Voir les projets',
          downloadResume: 'Télécharger le CV',
          viewSkills: 'Voir les compétences'
        },
        footer: {
          description: 'Un développeur passionné créant des applications belles, fonctionnelles et conviviales qui résolvent des problèmes réels.',
          quickLinks: 'Liens rapides',
          services: 'Services',
          contactInfo: 'Informations de contact',
          webDevelopment: 'Développement web',
          mobileApps: 'Applications mobiles',
          uiUx: 'Conception UI/UX',
          consulting: 'Conseil',
          allRightsReserved: 'Tous droits réservés.',
          privacyPolicy: 'Politique de confidentialité',
          termsOfService: 'Conditions d\'utilisation',
          cookiePolicy: 'Politique des cookies'
        },
        common: {
          download: 'Télécharger',
          resume: 'CV',
          language: 'Langue',
          scrollToTop: 'Retour en haut',
          backToTop: 'Retour en haut'
        }
      },
      de: {
        navigation: {
          about: 'Über mich',
          skills: 'Fähigkeiten',
          moreInfo: 'Mehr Infos',
          projects: 'Projekte',
          contact: 'Kontakt'
        },
        about: {
          title: 'Über mich',
          subtitle: 'Full Stack Entwickler',
          description: 'Leidenschaftlicher Entwickler mit Expertise in modernen Web-Technologien und Cloud-Lösungen.',
          hello: 'Hallo, ich bin',
          getInTouch: 'Kontakt aufnehmen',
          viewMyWork: 'Meine Arbeit ansehen',
          stats: {
            experience: 'Jahre Erfahrung',
            projects: 'Abgeschlossene Projekte',
            clients: 'Zufriedene Kunden'
          }
        },
        skills: {
          title: 'Meine Fähigkeiten',
          subtitle: 'Technologien und Tools, mit denen ich arbeite',
          categories: {
            frontend: 'Frontend',
            backend: 'Backend',
            database: 'Datenbank',
            tools: 'Tools & Andere'
          }
        },
        projects: {
          title: 'Meine Projekte',
          subtitle: 'Einige meiner neuesten Arbeiten',
          viewProject: 'Projekt ansehen',
          viewCode: 'Code ansehen',
          liveDemo: 'Live Demo',
          github: 'GitHub'
        },
        contact: {
          title: 'Kontakt aufnehmen',
          subtitle: 'Lassen Sie uns zusammenarbeiten',
          name: 'Ihr Name',
          email: 'Ihre E-Mail',
          message: 'Ihre Nachricht',
          send: 'Nachricht senden',
          resume: 'Lebenslauf herunterladen',
          contactInfo: 'Kontaktinformationen',
          sendMessage: 'Nachricht senden',
          subject: 'Betreff',
          phone: 'Telefon',
          location: 'Standort',
          socialMedia: 'Soziale Medien'
        },
        showcase: {
          achievements: 'Meine Erfolge',
          technicalSkills: 'Technische Fähigkeiten',
          featuredProjects: 'Ausgewählte Projekte',
          readyToWork: 'Bereit zusammenzuarbeiten?',
          createSomething: 'Lassen Sie uns etwas Erstaunliches zusammen schaffen. Ich bin immer begeistert, an neuen Projekten und Herausforderungen zu arbeiten.',
          alwaysExcited: 'Ich bin immer begeistert, an neuen Projekten und Herausforderungen zu arbeiten.',
          fullStackDev: 'Full Stack Entwicklung',
          problemSolver: 'Problemlöser',
          teamPlayer: 'Teamplayer',
          continuousLearner: 'Kontinuierlicher Lerner',
          yearsExperience: 'Jahre Erfahrung',
          projectsCompleted: 'Abgeschlossene Projekte',
          happyClients: 'Zufriedene Kunden',
          developer: 'Entwickler',
          getInTouch: 'Kontakt aufnehmen',
          viewProjects: 'Projekte ansehen',
          downloadResume: 'Lebenslauf herunterladen',
          viewSkills: 'Fähigkeiten ansehen'
        },
        footer: {
          description: 'Ein leidenschaftlicher Entwickler, der schöne, funktionale und benutzerfreundliche Anwendungen erstellt, die reale Probleme lösen.',
          quickLinks: 'Schnelle Links',
          services: 'Dienstleistungen',
          contactInfo: 'Kontaktinformationen',
          webDevelopment: 'Webentwicklung',
          mobileApps: 'Mobile Apps',
          uiUx: 'UI/UX Design',
          consulting: 'Beratung',
          allRightsReserved: 'Alle Rechte vorbehalten.',
          privacyPolicy: 'Datenschutzrichtlinie',
          termsOfService: 'Nutzungsbedingungen',
          cookiePolicy: 'Cookie-Richtlinie'
        },
        common: {
          download: 'Herunterladen',
          resume: 'Lebenslauf',
          language: 'Sprache',
          scrollToTop: 'Nach oben scrollen',
          backToTop: 'Zurück nach oben'
        }
      },
      ja: {
        navigation: {
          about: '私について',
          skills: 'スキル',
          moreInfo: '詳細情報',
          projects: 'プロジェクト',
          contact: 'お問い合わせ'
        },
        about: {
          title: '私について',
          subtitle: 'フルスタック開発者',
          description: 'モダンなWeb技術とクラウドソリューションに精通した情熱的な開発者です。',
          hello: 'こんにちは、私は',
          getInTouch: 'お問い合わせ',
          viewMyWork: '私の作品を見る',
          stats: {
            experience: '年の経験',
            projects: '完了プロジェクト',
            clients: '満足したクライアント'
          }
        },
        skills: {
          title: '私のスキル',
          subtitle: '私が使用する技術とツール',
          categories: {
            frontend: 'フロントエンド',
            backend: 'バックエンド',
            database: 'データベース',
            tools: 'ツールとその他'
          }
        },
        projects: {
          title: '私のプロジェクト',
          subtitle: '最近の作品の一部',
          viewProject: 'プロジェクトを見る',
          viewCode: 'コードを見る',
          liveDemo: 'ライブデモ',
          github: 'GitHub'
        },
        contact: {
          title: 'お問い合わせ',
          subtitle: '一緒に働きましょう',
          name: 'お名前',
          email: 'メールアドレス',
          message: 'メッセージ',
          send: 'メッセージを送信',
          resume: '履歴書をダウンロード',
          contactInfo: '連絡先情報',
          sendMessage: 'メッセージを送信',
          subject: '件名',
          phone: '電話',
          location: '所在地',
          socialMedia: 'ソーシャルメディア'
        },
        showcase: {
          achievements: '私の実績',
          technicalSkills: '技術スキル',
          featuredProjects: '注目プロジェクト',
          readyToWork: '一緒に働く準備はできていますか？',
          createSomething: '一緒に素晴らしいものを作りましょう。新しいプロジェクトや挑戦に取り組むことに常に興奮しています。',
          alwaysExcited: '新しいプロジェクトや挑戦に取り組むことに常に興奮しています。',
          fullStackDev: 'フルスタック開発',
          problemSolver: '問題解決者',
          teamPlayer: 'チームプレイヤー',
          continuousLearner: '継続学習者',
          yearsExperience: '年の経験',
          projectsCompleted: '完了プロジェクト',
          happyClients: '満足したクライアント',
          developer: '開発者',
          getInTouch: 'お問い合わせ',
          viewProjects: 'プロジェクトを見る',
          downloadResume: '履歴書をダウンロード',
          viewSkills: 'スキルを見る'
        },
        footer: {
          description: '実際の問題を解決する美しく、機能的で使いやすいアプリケーションを作成する情熱的な開発者。',
          quickLinks: 'クイックリンク',
          services: 'サービス',
          contactInfo: '連絡先情報',
          webDevelopment: 'Web開発',
          mobileApps: 'モバイルアプリ',
          uiUx: 'UI/UXデザイン',
          consulting: 'コンサルティング',
          allRightsReserved: '全著作権所有。',
          privacyPolicy: 'プライバシーポリシー',
          termsOfService: '利用規約',
          cookiePolicy: 'クッキーポリシー'
        },
        common: {
          download: 'ダウンロード',
          resume: '履歴書',
          language: '言語',
          scrollToTop: 'トップにスクロール',
          backToTop: 'トップに戻る'
        }
      },
      sv: {
        navigation: {
          about: 'Om mig',
          skills: 'Färdigheter',
          moreInfo: 'Mer info',
          projects: 'Projekt',
          contact: 'Kontakt'
        },
        about: {
          title: 'Om mig',
          subtitle: 'Fullstack-utvecklare',
          description: 'Passionerad utvecklare med expertis inom moderna webbteknologier och molnlösningar.',
          hello: 'Hej, jag är',
          getInTouch: 'Kontakta mig',
          viewMyWork: 'Se mitt arbete',
          stats: {
            experience: 'Års erfarenhet',
            projects: 'Slutförda projekt',
            clients: 'Nöjda klienter'
          }
        },
        skills: {
          title: 'Mina färdigheter',
          subtitle: 'Teknologier och verktyg jag arbetar med',
          categories: {
            frontend: 'Frontend',
            backend: 'Backend',
            database: 'Databas',
            tools: 'Verktyg & Andra'
          }
        },
        projects: {
          title: 'Mina projekt',
          subtitle: 'Några av mina senaste arbeten',
          viewProject: 'Visa projekt',
          viewCode: 'Visa kod',
          liveDemo: 'Live Demo',
          github: 'GitHub'
        },
        contact: {
          title: 'Kontakta mig',
          subtitle: 'Låt oss arbeta tillsammans',
          name: 'Ditt namn',
          email: 'Din e-post',
          message: 'Ditt meddelande',
          send: 'Skicka meddelande',
          resume: 'Ladda ner CV',
          contactInfo: 'Kontaktinformation',
          sendMessage: 'Skicka meddelande',
          subject: 'Ämne',
          phone: 'Telefon',
          location: 'Plats',
          socialMedia: 'Sociala medier'
        },
        showcase: {
          achievements: 'Mina prestationer',
          technicalSkills: 'Tekniska färdigheter',
          featuredProjects: 'Utvalda projekt',
          readyToWork: 'Redo att arbeta tillsammans?',
          createSomething: 'Låt oss skapa något fantastiskt tillsammans. Jag är alltid entusiastisk över att arbeta med nya projekt och utmaningar.',
          alwaysExcited: 'Jag är alltid entusiastisk över att arbeta med nya projekt och utmaningar.',
          fullStackDev: 'Fullstack-utveckling',
          problemSolver: 'Problemlösare',
          teamPlayer: 'Lagspelare',
          continuousLearner: 'Kontinuerlig inlärning',
          yearsExperience: 'Års erfarenhet',
          projectsCompleted: 'Slutförda projekt',
          happyClients: 'Nöjda klienter',
          developer: 'Utvecklare',
          getInTouch: 'Kontakta mig',
          viewProjects: 'Visa projekt',
          downloadResume: 'Ladda ner CV',
          viewSkills: 'Visa färdigheter'
        },
        footer: {
          description: 'En passionerad utvecklare som skapar vackra, funktionella och användarvänliga applikationer som löser verkliga problem.',
          quickLinks: 'Snabblänkar',
          services: 'Tjänster',
          contactInfo: 'Kontaktinformation',
          webDevelopment: 'Webbutveckling',
          mobileApps: 'Mobilappar',
          uiUx: 'UI/UX Design',
          consulting: 'Konsultation',
          allRightsReserved: 'Alla rättigheter förbehållna.',
          privacyPolicy: 'Integritetspolicy',
          termsOfService: 'Användarvillkor',
          cookiePolicy: 'Cookie-policy'
        },
        common: {
          download: 'Ladda ner',
          resume: 'CV',
          language: 'Språk',
          scrollToTop: 'Scrolla till toppen',
          backToTop: 'Tillbaka till toppen'
        }
      },
      ar: {
        navigation: {
          about: 'نبذة عني',
          skills: 'المهارات',
          moreInfo: 'معلومات إضافية',
          projects: 'المشاريع',
          contact: 'اتصل بي'
        },
        about: {
          title: 'نبذة عني',
          subtitle: 'مطور Full Stack',
          description: 'مطور شغوف بخبرة في تقنيات الويب الحديثة والحلول السحابية.',
          hello: 'مرحباً، أنا',
          getInTouch: 'تواصل معي',
          viewMyWork: 'شاهد أعمالي',
          stats: {
            experience: 'سنوات من الخبرة',
            projects: 'مشاريع مكتملة',
            clients: 'عملاء راضون'
          }
        },
        skills: {
          title: 'مهاراتي',
          subtitle: 'التقنيات والأدوات التي أستخدمها',
          categories: {
            frontend: 'الواجهة الأمامية',
            backend: 'الخادم',
            database: 'قاعدة البيانات',
            tools: 'الأدوات وغيرها'
          }
        },
        projects: {
          title: 'مشاريعي',
          subtitle: 'بعض من أعمالي الأخيرة',
          viewProject: 'عرض المشروع',
          viewCode: 'عرض الكود',
          liveDemo: 'عرض مباشر',
          github: 'GitHub'
        },
        contact: {
          title: 'تواصل معي',
          subtitle: 'دعنا نعمل معاً',
          name: 'اسمك',
          email: 'بريدك الإلكتروني',
          message: 'رسالتك',
          send: 'إرسال الرسالة',
          resume: 'تحميل السيرة الذاتية',
          contactInfo: 'معلومات الاتصال',
          sendMessage: 'إرسال الرسالة',
          subject: 'الموضوع',
          phone: 'الهاتف',
          location: 'الموقع',
          socialMedia: 'وسائل التواصل الاجتماعي'
        },
        showcase: {
          achievements: 'إنجازاتي',
          technicalSkills: 'المهارات التقنية',
          featuredProjects: 'المشاريع المميزة',
          readyToWork: 'مستعد للعمل معاً؟',
          createSomething: 'دعنا ننشئ شيئاً مذهلاً معاً. أنا متحمس دائماً للعمل على مشاريع وتحديات جديدة.',
          alwaysExcited: 'أنا متحمس دائماً للعمل على مشاريع وتحديات جديدة.',
          fullStackDev: 'تطوير Full Stack',
          problemSolver: 'حل المشاكل',
          teamPlayer: 'لاعب فريق',
          continuousLearner: 'متعلم مستمر',
          yearsExperience: 'سنوات من الخبرة',
          projectsCompleted: 'مشاريع مكتملة',
          happyClients: 'عملاء راضون',
          developer: 'مطور',
          getInTouch: 'تواصل معي',
          viewProjects: 'عرض المشاريع',
          downloadResume: 'تحميل السيرة الذاتية',
          viewSkills: 'عرض المهارات'
        },
        footer: {
          description: 'مطور شغوف ينشئ تطبيقات جميلة ووظيفية وسهلة الاستخدام تحل مشاكل حقيقية.',
          quickLinks: 'روابط سريعة',
          services: 'الخدمات',
          contactInfo: 'معلومات الاتصال',
          webDevelopment: 'تطوير الويب',
          mobileApps: 'التطبيقات المحمولة',
          uiUx: 'تصميم UI/UX',
          consulting: 'الاستشارات',
          allRightsReserved: 'جميع الحقوق محفوظة.',
          privacyPolicy: 'سياسة الخصوصية',
          termsOfService: 'شروط الخدمة',
          cookiePolicy: 'سياسة ملفات تعريف الارتباط'
        },
        common: {
          download: 'تحميل',
          resume: 'السيرة الذاتية',
          language: 'اللغة',
          scrollToTop: 'التمرير إلى الأعلى',
          backToTop: 'العودة إلى الأعلى'
        }
      }
    };

    return translations[languageCode] || translations['en'];
  }
}
