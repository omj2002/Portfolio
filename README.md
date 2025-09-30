# Dynamic Angular Portfolio

A fully dynamic, professional portfolio website built with Angular that loads all content from a JSON data file.

## 🚀 Features

- **Fully Dynamic**: All content loaded from JSON data file
- **Professional Design**: Modern, responsive design with animations
- **Multi-language Support**: Language selector with multiple options
- **Resume Download**: Dynamic resume generation and download
- **Responsive**: Works perfectly on all devices
- **TypeScript**: Fully typed with interfaces
- **Modern Angular**: Built with Angular 19 and latest features

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── header/          # Navigation header
│   │   │   ├── about/           # About section
│   │   │   ├── skills/          # Skills showcase
│   │   │   ├── projects/        # Projects portfolio
│   │   │   └── contact/         # Contact form
│   │   ├── services/
│   │   │   └── data.service.ts  # Data management service
│   │   └── app.routes.ts        # Routing configuration
│   └── assets/
│       ├── data/
│       │   └── portfolio-data.json  # All portfolio data
│       ├── images/              # Project images
│       └── files/               # Resume files
```

## 🎯 How to Customize

### 1. Update Personal Information

Edit `src/assets/data/portfolio-data.json`:

```json
{
  "personalInfo": {
    "name": "Your Name",
    "title": "Your Title",
    "subtitle": "Your Subtitle",
    "description": "Your description...",
    "email": "your.email@example.com",
    "phone": "+1 (555) 123-4567",
    "location": "Your City, Country",
    "profileImage": "assets/images/profile.jpg",
    "resumeUrl": "assets/files/Your_Resume.pdf"
  }
}
```

### 2. Update Skills

Modify the skills section in the JSON file:

```json
{
  "skills": {
    "frontend": [
      {
        "name": "Angular",
        "icon": "fab fa-angular",
        "level": 90
      }
    ],
    "backend": [...],
    "database": [...],
    "tools": [...]
  }
}
```

### 3. Add Your Projects

Update the projects array:

```json
{
  "projects": [
    {
      "id": 1,
      "title": "Your Project",
      "description": "Project description...",
      "image": "assets/images/projects/project1.jpg",
      "technologies": ["Angular", "Node.js"],
      "liveUrl": "https://your-project.com",
      "githubUrl": "https://github.com/yourusername/project",
      "featured": true
    }
  ]
}
```

### 4. Update Social Links

```json
{
  "socialLinks": [
    {
      "name": "GitHub",
      "url": "https://github.com/yourusername",
      "icon": "fab fa-github"
    }
  ]
}
```

### 5. Add Your Images

- Place your profile photo in `src/assets/images/`
- Add project images in `src/assets/images/projects/`
- Add your resume PDF in `src/assets/files/`

## 🛠️ Development

### Prerequisites

- Node.js (v18 or higher)
- Angular CLI (v19 or higher)

### Installation

```bash
# Install dependencies
npm install

# Start development server
ng serve

# Build for production
ng build --configuration production
```

### Available Scripts

- `ng serve` - Start development server
- `ng build` - Build for production
- `ng test` - Run unit tests
- `ng lint` - Run linting

## 🎨 Customization Options

### Colors and Styling

All styling is in SCSS files:
- `src/styles.scss` - Global styles
- `src/app/components/*/component.scss` - Component-specific styles

### Adding New Sections

1. Create a new component: `ng generate component components/new-section`
2. Add route in `app.routes.ts`
3. Update navigation in JSON data
4. Add component to app imports

### Language Support

Add new languages in the JSON file:

```json
{
  "languages": [
    {
      "code": "DE",
      "name": "Deutsch",
      "flag": "fas fa-flag"
    }
  ]
}
```

## 📱 Responsive Design

The portfolio is fully responsive with:
- Mobile-first design approach
- Flexible grid layouts
- Touch-friendly navigation
- Optimized images and assets

## 🚀 Deployment

### Build for Production

```bash
ng build --configuration production
```

### Deploy to GitHub Pages

```bash
ng build --configuration production --base-href "https://yourusername.github.io/portfolio/"
npx angular-cli-ghpages --dir=dist/portfolio
```

### Deploy to Netlify/Vercel

1. Build the project
2. Upload the `dist/portfolio` folder
3. Configure redirects for Angular routing

## 🔧 Technical Features

- **TypeScript**: Full type safety
- **RxJS**: Reactive programming with Observables
- **SCSS**: Advanced styling with variables and mixins
- **Angular Router**: Client-side routing
- **HTTP Client**: Data fetching from JSON
- **Responsive Design**: Mobile-first approach
- **Accessibility**: ARIA labels and keyboard navigation

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

If you have any questions or need help customizing the portfolio, please open an issue on GitHub.

---

**Happy coding! 🎉**