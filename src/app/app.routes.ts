import { Routes } from '@angular/router';
import { About } from './components/about/about';
import { Skills } from './components/skills/skills';
import { Projects } from './components/projects/projects';
import { Contact } from './components/contact/contact';
import { Showcase } from './components/showcase/showcase';
import { Services } from './components/services/services';

export const routes: Routes = [
  { path: '', redirectTo: '/about', pathMatch: 'full' },
  { path: 'about', component: About },
  { path: 'skills', component: Skills },
  { path: 'projects', component: Projects },
  { path: 'showcase', component: Showcase },
  { path: 'services', component: Services },
  { path: 'contact', component: Contact },
  { path: '**', redirectTo: '/about' }
];
